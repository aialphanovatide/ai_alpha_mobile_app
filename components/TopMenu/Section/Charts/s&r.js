import React from 'react';
import { View } from 'react-native';
import { VictoryChart, VictoryLine } from 'victory-native';

const SupportResistanceLines = ({ chartData, supportLevels, resistanceLevels }) => {
  return (
    <View style={{ flex: 1 }}>
        {/* Render support levels */}
        {supportLevels.map((level, index) => (
          <VictoryLine
          domain={{
            x: [chartData.length, chartData.length],
            }}
            key={`support-${index}`}
            data={[{ x: 0, y: level }, { x: chartData.length, y: level }]}
            style={{ data: { stroke: 'green', strokeWidth: 1, strokeDasharray: [4, 4] } }}
          />
        ))}

        {/* Render resistance levels */}
        {resistanceLevels.map((level, index) => (
          <VictoryLine
          domain={{
            x: [chartData.length, chartData.length],
            }}
            key={`resistance-${index}`}
            data={[{ x: 0, y: level }, { x: chartData.length, y: level }]}
            style={{ data: { stroke: 'red', strokeWidth: 1, strokeDasharray: [4, 4] } }}
          />
        ))}
    </View>
  );
};

export default SupportResistanceLines;
