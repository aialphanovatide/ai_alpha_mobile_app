import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Pie from 'react-native-pie';
import styles from '../GeneralTokenAllocation/GTAStyles';

const CircleChart = ({data}) => {
  return (
    <View style={styles.rowContainer}>
      <Pie
        radius={80}
        innerRadius={60}
        sections={data.map(sector => {
          return {percentage: sector.percentage, color: sector.color};
        })}
        backgroundColor="#ffffff"
        dividerSize={10}
      />

      <View style={styles.circleDataContainer}>
        {data.map((sector, index) => (
          <TouchableOpacity key={index}>
            <Text style={{color: sector.color}}>
              <Text style={styles.strong}>{sector.title}:</Text>{' '}
              {sector.percentage}%
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CircleChart;
