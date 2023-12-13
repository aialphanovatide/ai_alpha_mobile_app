import {Text, View} from 'react-native';
import React from 'react';
import styles from './GTAStyles';
import CircleChart from '../CircleChart/CircleChart';

const GeneralTokenAllocation = () => {
  const chartData = [
    {title: 'Exchanges', percentage: 26, color: '#FC0404'},
    {title: 'Institutions', percentage: 22, color: '#FC5404'},
    {title: 'Miners', percentage: 21, color: '#F98404'},
    {title: 'ETH Foundation', percentage: 17, color: '#F9B208'},
    {title: 'Retail Investors', percentage: 6, color: '#F8E405'},
  ];
  return (
    <View style={styles.container}>
      <CircleChart data={chartData} />
    </View>
  );
};

export default GeneralTokenAllocation;
