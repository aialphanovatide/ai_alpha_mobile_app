import React from 'react';
import {View} from 'react-native';
import Pie from 'react-native-pie';
import styles from '../GeneralTokenAllocation/GTAStyles';

const CircleChart = ({data, dividerSize}) => {
  return (
    <View style={styles.circleChartContainer}>
      <Pie
        radius={80}
        innerRadius={60}
        sections={data.map(sector => {
          return {
            percentage: sector.percentage,
            color: sector.color,
          };
        })}
        backgroundColor="#ffffff"
        dividerSize={dividerSize}
      />
    </View>
  );
};

export default CircleChart;
