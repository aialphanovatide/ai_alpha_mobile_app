import {View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  VictoryChart,
  VictoryBar,
  VictoryTooltip,
  VictoryAxis,
} from 'victory-native';
import useChartStyles from './ChartStyles';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';
import Loader from '../../../../../../../../../Loader/Loader';

const CurrentMarketCap = ({competitorsData}) => {
  const {theme} = useContext(AppThemeContext);
  const styles = useChartStyles();
  const [loading, setLoading] = useState(true);
  const [cryptos, setCryptos] = useState([]);
  const tintColors = ['#399AEA', '#20CBDD', '#895EF6', '#EB3ED6'];

  const findKeyInCompetitorItem = (data, key, crypto) => {
    const found = data.find(
      item =>
        item.competitor.token === crypto && item.competitor.key.includes(key),
    );
    return found && found !== undefined ? found.competitor.value : null;
  };

  const parseNumberString = numberString => {
    const numberWithoutSign = numberString.replace(/\$|,/g, '');
    const numericValue = parseFloat(numberWithoutSign);
    const valueInBillions = numericValue / 1e9;
    return [valueInBillions, numericValue];
  };

  const extractSymbol = cryptoString => {
    const string_without_spaces = cryptoString.replace(' ', '');
    const name = string_without_spaces.split('(')[0];
    const symbol_index_start = string_without_spaces.indexOf('(');
    const symbol_index_end = string_without_spaces.indexOf(')');
    const symbol =
      symbol_index_start !== -1
        ? string_without_spaces
            .slice(symbol_index_start + 1, symbol_index_end)
            .toUpperCase()
        : name[0].toUpperCase() + name.slice(1);
    return symbol;
  };

  useEffect(() => {
    setLoading(true);
    const mapped_competitors_data = [];
    competitorsData.forEach(item => {
      if (
        mapped_competitors_data.find(
          mapped => mapped.symbol === extractSymbol(item.competitor.token),
        )
      ) {
        return;
      } else {
        const current = {
          id: item.competitor.id,
          symbol: extractSymbol(item.competitor.token),
          marketCap: parseNumberString(
            findKeyInCompetitorItem(
              competitorsData,
              'current market cap',
              item.competitor.token,
            ),
          ),
        };
        mapped_competitors_data.push(current);
      }
    });
    setCryptos(mapped_competitors_data);
    setLoading(false);
  }, [competitorsData]);

  if (loading || cryptos?.length === 0) {
    return (
      <View style={styles.chartContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <View style={styles.chartContainer}>
      <VictoryChart
        height={450}
        padding={{left: 65, right: 40, top: 40, bottom: 40}}>
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
              fill: ({datum, index}) =>
                tintColors[index > 3 ? index % 3 : index],
            },
          }}
          alignment={'middle'}
          domain={{x: [0, 5], y: [0, 300]}}
          domainPadding={{x: 1, y: 10}}
          data={cryptos.map((crypto, index) => ({
            x: crypto.symbol,
            y: crypto.marketCap[0],
            label: ` $${crypto.marketCap[1]} `,
            color: tintColors[index > 3 ? index % 3 : index],
          }))}
          labels={({datum}) => datum.label}
          labelComponent={<VictoryTooltip renderInPortal={false} />}
        />
      </VictoryChart>
    </View>
  );
};

export default CurrentMarketCap;
