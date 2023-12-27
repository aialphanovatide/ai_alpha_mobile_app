import {SafeAreaView} from 'react-native';
import React from 'react';
import Timeline from '../Hacks/Timeline/Timeline';

const Upgrades = ({events}) => {
  return (
    <SafeAreaView style={{flex: 1, maxHeight: 500}}>
      <Timeline events={events} />
    </SafeAreaView>
  );
};

export default Upgrades;
