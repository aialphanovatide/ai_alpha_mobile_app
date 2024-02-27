import {View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  VictoryChart,
  VictoryBar,
  VictoryTooltip,
  VictoryAxis,
} from 'victory-native';
import useChartStyles from '../CurrentMarketCap/ChartStyles';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';
import Loader from '../../../../../../../../../Loader/Loader';

const TotalValueLocked = ({competitorsData}) => {
  const {theme} = useContext(AppThemeContext);
  const styles = useChartStyles();
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const parseLargeNumberString = numberString => {
    const numberWithoutSign = numberString.replace(/\$/g, '');
    const decimalNumberString = numberWithoutSign.replace(/,/g, '.');
    const [numberPart, unitPart] = decimalNumberString.split(/(?=[a-zA-Z])/);
    const numericValue = Number(numberPart);
    const unitValues = {
      k: 100000,
      m: 1000000,
      b: 1000000000,
      t: 1000000000000,
    };

    const scaledValue = numericValue * unitValues[unitPart.toLowerCase()];
    const valueInBillions = scaledValue / 1000000000;
    return parseFloat(valueInBillions.toFixed(3));
  };

  const findKeyInCompetitorItem = (data, key, crypto) => {
    const found = data.find(
      item =>
        item.competitor.token === crypto && item.competitor.key.includes(key),
    );
    console.log('Tvl value found: ', found);
    return found && found !== undefined ? found.competitor.value : null;
  };

  useEffect(() => {
    setLoading(true);
    const mapped_tvl = [];
    competitorsData.forEach(item => {
      if (
        mapped_tvl.find(
          mapped => mapped.symbol === extractSymbol(item.competitor.token),
        )
      ) {
        return;
      } else {
        const current = {
          id: item.competitor.id,
          symbol: extractSymbol(item.competitor.token),
          tvl: parseLargeNumberString(
            findKeyInCompetitorItem(
              competitorsData,
              'tvl',
              item.competitor.token,
            ),
          ),
        };
        mapped_tvl.push(current);
      }
    });
    setCryptos(mapped_tvl);
    setLoading(false);
  }, [competitorsData]);

  const tintColors = ['#399AEA', '#20CBDD', '#895EF6', '#EB3ED6'];

  if (loading) {
    <View style={styles.chartContainer}>
      <Loader />
    </View>;
  }

  if (!cryptos || cryptos?.length === 0) {
    return null;
  }
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
              fill: ({datum, index}) =>
                tintColors[index > 3 ? index % 3 : index],
            },
          }}
          alignment={'middle'}
          domain={{x: [0, 5], y: [0, 20]}}
          domainPadding={{x: 1, y: 1.5}}
          data={cryptos.map((crypto, index) => ({
            x: crypto.symbol,
            y: crypto.tvl,
            label: ` $${crypto.tvl}b `,
            color: tintColors[index > 3 ? index % 3 : index],
          }))}
          labels={({datum}) => datum.label}
          labelComponent={<VictoryTooltip renderInPortal={false} />}
        />
      </VictoryChart>
    </View>
  );
};

export default TotalValueLocked;
