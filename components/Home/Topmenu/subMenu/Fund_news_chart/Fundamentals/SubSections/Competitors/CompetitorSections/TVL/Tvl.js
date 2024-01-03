import {View} from 'react-native';
import React from 'react';
import {VictoryChart, VictoryBar, VictoryTooltip} from 'victory-native';
import useChartStyles from '../CurrentMarketCap/ChartStyles';

const TotalValueLocked = ({cryptos}) => {
  const styles = useChartStyles();
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
          domain={{x: [0, 5], y: [0, 30]}}
          domainPadding={{x: 1, y: 3}}
          data={cryptos.map(crypto => ({
            x: crypto.symbol,
            y: crypto.tvl,
            label: ` $${crypto.tvl}b `,
            color: crypto.color,
          }))}
          labels={({datum}) => datum.label}
          labelComponent={<VictoryTooltip renderInPortal={false} />}
        />
      </VictoryChart>
    </View>
  );
};

export default TotalValueLocked;
