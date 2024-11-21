import {SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Timeline from '../Hacks/Timeline/Timeline';
import NoContentMessage from '../../NoContentMessage/NoContentMessage';
import SkeletonLoader from '../../../../../../../Loader/SkeletonLoader';

// Component that renders the Upgrades section in the Fundamentals tab. It displays a timeline with the most relevant upgrades in the history of the coin. It also shows a loader when requesting the data and a message in case there is no content to display.

const Upgrades = ({
  coin,
  handleSectionContent,
  globalData,
  loading,
}) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchUpgradesData = () => {
        if (!globalData || globalData.upgrades.status !== 200) {
          setEvents([]);
        } else {
          const mapped_events = globalData.upgrades.message.map(event => {
            return {
              id: event.upgrade.id,
              upgrade_name: event.upgrade.event,
              upgrade_overview: event.upgrade.event_overview,
              upgrade_impact: event.upgrade.impact,
              date: event.upgrade.date,
            };
          });
          setEvents(mapped_events.sort((a, b) => compareDates(a.date, b.date)));
        }
    };

    fetchUpgradesData();
  }, [globalData, coin]);

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
    <SafeAreaView style={{flex: 1,}}>
      {loading ? (
        <SkeletonLoader type="timeline" quantity={4} />
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
