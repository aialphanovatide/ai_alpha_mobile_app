import React from 'react';
import {StyleSheet, View} from 'react-native';
import Pie from 'react-native-pie';

const CircleChart = ({data, dividerSize, backgroundColor, colors}) => {
  return (
    <View style={styles.circleChartContainer}>
      <Pie
        radius={80}
        innerRadius={60}
        sections={data.map((sector, index) => {
          return {
            percentage: sector.percentage,
            color: colors[index > 5 ? index % 5 : index],
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
    marginVertical: 15,
  },
});

export default CircleChart;
