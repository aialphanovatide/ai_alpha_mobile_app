import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import BackButton from '../BackButton/BackButton';

const EthBtcChart = ({handleReturn}) => {
  return (
    <SafeAreaView>
      <BackButton handleReturn={handleReturn} />
      <Text>EthBtcChart</Text>
    </SafeAreaView>
  );
};

export default EthBtcChart;
