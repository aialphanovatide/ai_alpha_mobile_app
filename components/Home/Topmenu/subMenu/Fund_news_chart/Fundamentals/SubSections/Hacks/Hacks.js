import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Timeline from './Timeline/Timeline';
import {fundamentalsMock} from '../../fundamentalsMock';

const Hacks = ({getSectionData, coin}) => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchHacksData = async () => {
      try {
        const response = await getSectionData(
          `/api/hacks?coin_bot_name=${coin}`,
        );

        if (response.status !== 200) {
          setEvents([]);
        } else {
          setEvents(response.message);
        }
      } catch (error) {
        console.log('Error trying to get hacks data: ', error);
      }
    };
    fetchHacksData();
  }, [coin]);

  if (events.length === 0 || !events) {
    return null;
  }

  return (
    <View style={{flex: 1, minHeight: 500}}>
      <Timeline
        events={events}
        textPoints={[
          {label: 'What was the incident?', propName: 'incident_description'},
          {label: 'What were the consequences?', propName: 'consequences'},
          {
            label: 'What risk mitigation measures have been taken?',
            propName: 'mitigation_measure',
          },
        ]}
      />
    </View>
  );
};

export default Hacks;
