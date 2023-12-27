import {Text, View} from 'react-native';
import React from 'react';
import {VictoryChart, VictoryBar, VictoryTooltip} from 'victory-native';
import styles from './ChartStyles';

const CurrentMarketCap = ({cryptos}) => {
  return (
    <View style={styles.chartContainer}>
      <VictoryChart>
        <VictoryBar
          style={{
            data: {
              fill: ({datum}) => datum.color,
            },
          }}
          alignment={'middle'}
          domain={{x: [0, 5], y: [0, 260]}}
          domainPadding={{x: 1, y: 20}}
          data={cryptos.map(crypto => ({
            x: crypto.symbol,
            y: crypto.marketCap[0],
            label: ` $${crypto.marketCap[1]} `,
            color: crypto.color,
          }))}
          labels={({datum}) => datum.label}
          labelComponent={<VictoryTooltip renderInPortal={false} />}
        />
      </VictoryChart>
    </View>
  );
};

export default CurrentMarketCap;
