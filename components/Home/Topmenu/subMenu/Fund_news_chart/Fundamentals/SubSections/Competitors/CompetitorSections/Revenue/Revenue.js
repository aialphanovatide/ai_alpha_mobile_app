import {Text, View} from 'react-native';
import React from 'react';
import {VictoryAxis, VictoryBar, VictoryChart} from 'victory-native';
import styles from './RevenueStyles';

const RevenueGraphReferences = ({cryptos}) => {
  return (
    <View style={styles.selectorContainer}>
      {cryptos.map((item, index) => (
        <View
          key={index}
          style={[styles.selectorItem, {backgroundColor: item.color}]}>
          <Text style={styles.itemText}>{item.crypto}</Text>
        </View>
      ))}
    </View>
  );
};

const Revenue = ({cryptos}) => {
  return (
    <View>
      <View style={styles.chartContainer}>
        <VictoryChart>
          <VictoryBar
            style={{
              data: {
                fill: ({datum}) => datum.color || '#FB6822',
              },
            }}
            alignment={'end'}
            domain={{x: [0, 5], y: [0, 2.5]}}
            data={cryptos.map(crypto => ({
              x: crypto.symbol,
              y: crypto.revenue,
              color: crypto.color,
            }))}
            labels={cryptos.map(crypto => `$${crypto.revenue}b`)}
          />
          <VictoryAxis
            style={{
              axis: {stroke: 'none'},
              ticks: {stroke: 'none'},
              tickLabels: {fill: 'none'},
              grid: {stroke: 'none'},
            }}
          />
        </VictoryChart>
      </View>
      <RevenueGraphReferences cryptos={cryptos} />
    </View>
  );
};

export default Revenue;
