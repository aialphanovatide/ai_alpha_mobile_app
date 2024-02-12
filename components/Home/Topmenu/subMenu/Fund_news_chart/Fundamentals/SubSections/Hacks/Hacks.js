import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Timeline from './Timeline/Timeline';
import Loader from '../../../../../../../Loader/Loader';

const Hacks = ({getHacksData, coin}) => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const getHacks = async () => {
      const hacks = await getHacksData(coin);
      if (hacks && hacks !== undefined) {
        setEvents(hacks);
      } else {
        setEvents([]);
      }
    };
    getHacks();
  }, [coin]);
  return (
    <SafeAreaView style={{flex: 1, maxHeight: 500}}>
      {events && events !== undefined ? (
        <Timeline events={events} />
      ) : (
        <Loader />
      )}
    </SafeAreaView>
  );
};

export default Hacks;
