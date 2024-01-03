import {Text, View} from 'react-native';
import React, {useContext} from 'react';
import {VictoryAxis, VictoryBar, VictoryChart} from 'victory-native';
import useRevenueStyles from './RevenueStyles';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const RevenueGraphReferences = ({cryptos, styles}) => {
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
  const {theme} = useContext(AppThemeContext);
  const styles = useRevenueStyles();
  return (
    <View>
      <View style={styles.chartContainer}>
        <VictoryChart>
          <VictoryBar
            width={600}
            height={500}
            style={{
              data: {
                fill: ({datum}) => datum.color || '#FB6822',
              },
              labels: {
                fill: theme.textColor,
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
              axis: {stroke: theme.graphSecondaryColor, size: 1},
              ticks: {stroke: 'none'},
              tickLabels: {fill: 'none'},
              grid: {stroke: 'none'},
            }}
          />
        </VictoryChart>
        <RevenueGraphReferences cryptos={cryptos} styles={styles} />
      </View>
    </View>
  );
};

export default Revenue;
