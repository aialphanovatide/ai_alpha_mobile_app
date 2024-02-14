import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Timeline from './Timeline/Timeline';
import Loader from '../../../../../../../Loader/Loader';
import { fundamentalsMock } from '../../fundamentalsMock';

const Hacks = ({getHacksData, coin}) => {
  const [events, setEvents] = useState(fundamentalsMock.hacks.events);
  // useEffect(() => {
  //   const getHacks = async () => {
  //     const hacks = await getHacksData(coin);
  //     if (hacks && hacks !== undefined) {
  //       setEvents(hacks);
  //       console.log('Hacks data:', hacks);
  //     } else {
  //       setEvents([]);
  //     }
  //   };
  //   getHacks();
  // }, [coin]);
  return (
    <SafeAreaView style={{flex: 1, maxHeight: 500}}>
      {events && events !== undefined ? (
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
      ) : (
        <Loader />
      )}
    </SafeAreaView>
  );
};

export default Hacks;
