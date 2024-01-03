import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import React from 'react';
import Timeline from './Timeline/Timeline';

const Hacks = ({events}) => {
  return (
    <SafeAreaView style={{flex: 1, maxHeight: 500}}>
      <Timeline events={events} />
    </SafeAreaView>
  );
};

export default Hacks;
