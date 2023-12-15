import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {VictoryChart, VictoryBar} from 'victory-native';
import styles from './ChartStyles';

const CurrentMarketCap = ({cryptos}) => {
  return (
    <View style={styles.chartContainer}>
      <VictoryChart>
        <VictoryBar
          style={styles.chart}
          alignment={'middle'}
          domain={{x: [0, 5], y: [0, 260]}}
          domainPadding={{x: 1, y: 20}}
          data={cryptos.map(crypto => ({
            x: crypto.symbol,
            y: crypto.marketCap,
          }))}
          labels={cryptos.map(crypto => `$${crypto.marketCap}b`)}
        />
      </VictoryChart>
    </View>
  );
};

export default CurrentMarketCap;
