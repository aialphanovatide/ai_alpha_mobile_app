import React from 'react';
import {StyleSheet, View} from 'react-native';
import Pie from 'react-native-pie';

const CircleChart = ({data, dividerSize, backgroundColor}) => {
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
        backgroundColor={backgroundColor}
        dividerSize={dividerSize}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  circleChartContainer: {
    marginVertical: 30,
  },
});

export default CircleChart;
