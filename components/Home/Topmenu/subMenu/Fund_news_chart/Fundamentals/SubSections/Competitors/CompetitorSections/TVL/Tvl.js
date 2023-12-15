import {Image, View} from 'react-native';
import React from 'react';
import styles from '../CurrentMarketCap/ChartStyles';
import {VictoryChart, VictoryBar} from 'victory-native';

const TotalValueLocked = ({cryptos}) => {
  return (
    <View style={styles.chartContainer}>
      <VictoryChart>
        <VictoryBar
          style={styles.chart}
          alignment={'middle'}
          domain={{x: [0, 5], y: [0, 30]}}
          domainPadding={{x: 1, y: 3}}
          data={cryptos.map(crypto => ({
            x: crypto.symbol,
            y: crypto.tvl,
          }))}
          labels={cryptos.map(crypto => `$${crypto.tvl}b`)}
        />
      </VictoryChart>
    </View>
  );
};

export default TotalValueLocked;
