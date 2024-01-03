import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import BackButton from '../BackButton/BackButton';

const BtcDominance = ({handleReturn}) => {
  return (
    <SafeAreaView>
      <BackButton handleReturn={handleReturn} />
      <Text>BtcDominance</Text>
    </SafeAreaView>
  );
};

export default BtcDominance;
