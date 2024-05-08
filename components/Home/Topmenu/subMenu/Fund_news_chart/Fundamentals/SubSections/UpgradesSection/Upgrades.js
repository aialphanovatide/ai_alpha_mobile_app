import {SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Timeline from '../Hacks/Timeline/Timeline';
import Loader from '../../../../../../../Loader/Loader';
import NoContentMessage from '../../NoContentMessage/NoContentMessage';

const Upgrades = ({getSectionData, coin, handleSectionContent}) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setEvents([]);

    const fetchUpgradesData = async () => {
      try {
        const response = await getSectionData(
          `/api/get_upgrades?coin_name=${coin}`,
        );

        if (response.status !== 200) {
          setEvents([]);
        } else {
          // console.log('Upgrade response: ', response.message);
          const mapped_events = response.message.map(event => {
            return {
              id: event.upgrade.id,
              upgrade_name: event.upgrade.event,
              upgrade_overview: event.upgrade.event_overview,
              upgrade_impact: event.upgrade.impact,
              date: event.upgrade.date,
            };
          });
          setEvents(mapped_events.sort((a,b) => compareDates(a.date, b.date)));
        }
      } catch (error) {
        console.error('Error trying to get upgrades data: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUpgradesData();
  }, [coin]);

  const compareDates = (dateA, dateB) => {
    const monthOrder = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
      Early: 3, 
      Mid: 6, 
      Late: 12, 
    };

    const parseDate = dateStr => {
      const parts = dateStr.split(/[\s-]+/); 
      if (parts.length === 1) {
        // "Long-term" or any other word, goes to the end of the array
        return Infinity;
      } else if (parts.length === 2) {
        // First case: Month-Year format
        const month = monthOrder[parts[0]];
        const year = parseInt(parts[1]);
        return new Date(year, month - 1);
      } else {
        // Early-Mid-Late format
        const month = monthOrder[parts[0]];
        const year = parseInt(parts[1]);
        return new Date(year, month - 1);
      }
    };

    const dateAParsed = parseDate(dateA);
    const dateBParsed = parseDate(dateB);

    return dateAParsed - dateBParsed;
  };

  useEffect(() => {
    if (!loading && events?.length === 0) {
      handleSectionContent('upgrades', true);
    }
  }, [events, loading, handleSectionContent]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <Loader />
      ) : events?.length === 0 ? (
        <NoContentMessage />
      ) : (
        <Timeline
          events={events}
          textPoints={[
            {
              label: 'Event Overview',
              propName: 'upgrade_overview',
            },
            {
              label: 'What is its Impact?',
              propName: 'upgrade_impact',
            },
          ]}
        />
      )}
    </SafeAreaView>
  );
};

export default Upgrades;
