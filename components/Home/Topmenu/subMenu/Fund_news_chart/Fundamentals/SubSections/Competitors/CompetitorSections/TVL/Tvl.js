import {View} from 'react-native';
import React, {useContext} from 'react';
import {
  VictoryChart,
  VictoryBar,
  VictoryTooltip,
  VictoryAxis,
} from 'victory-native';
import useChartStyles from '../CurrentMarketCap/ChartStyles';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const TotalValueLocked = ({cryptos}) => {
  const {theme} = useContext(AppThemeContext);
  const styles = useChartStyles();
  return (
    <View style={styles.chartContainer}>
      <VictoryChart
        height={450}
        padding={{left: 55, right: 50, bottom: 40, top: 40}}>
        <VictoryAxis
          style={{
            axis: {stroke: theme.chartsColor},
            tickLabels: {
              fontSize: theme.responsiveFontSize * 0.825,
              fill: theme.titleColor,
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: {stroke: theme.chartsColor},
            tickLabels: {
              fontSize: theme.responsiveFontSize * 0.825,
              fill: theme.chartsColor,
            },
            grid: {stroke: theme.chartsColor},
          }}
          tickFormat={value => `$${value}b`}
        />
        <VictoryBar
          style={{
            data: {
              fill: ({datum}) => datum.color,
            },
          }}
          alignment={'middle'}
          domain={{x: [0, 5], y: [0, 20]}}
          domainPadding={{x: 1, y: 1.5}}
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
