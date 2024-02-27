import {SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Timeline from '../Hacks/Timeline/Timeline';
import Loader from '../../../../../../../Loader/Loader';

const Upgrades = ({getSectionData, coin}) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
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
          setEvents(mapped_events);
        }
      } catch (error) {
        console.log('Error trying to get upgrades data: ', error);
      }
    };
    fetchUpgradesData();
  }, [coin]);

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {events && events !== undefined ? (
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
      ) : (
        <Loader />
      )}
    </SafeAreaView>
  );
};

export default Upgrades;
