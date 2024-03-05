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
import NoContentMessage from '../../../../NoContentMessage/NoContentMessage';

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
    const numberWithoutSign = numberString.replace(/\s|,/g, '');
    const numericValue = parseFloat(numberWithoutSign);
    const valueInBillions = numericValue / 1e9;
    return [valueInBillions, numericValue];
  };

  const generateMarketCapChart = (cryptos, tintColors) => {
    return (
      <VictoryChart
        height={450}
        padding={{left: 65, right: 40, top: 40, bottom: 40}}>
        <VictoryAxis
          style={{
            axis: {stroke: theme.chartsColor},
            tickLabels: {
              fontSize: theme.responsiveFontSize * 0.825,
              fill: theme.textColor,
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: {stroke: theme.chartsColor},
            tickLabels: {
              fontSize: theme.responsiveFontSize * 0.825,
              fill: theme.secondaryTextColor,
            },
            grid: {stroke: theme.chartsColor},
          }}
          tickFormat={value => `$${value}b`}
          tickCount={10}
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
    );
  };

  useEffect(() => {
    setLoading(true);
    const mapped_competitors_data = [];
    competitorsData.forEach(item => {
      if (
        mapped_competitors_data.find(
          mapped =>
            mapped.symbol ===
            item.competitor.token.replace(' ', '').toUpperCase(),
        )
      ) {
        return;
      } else {
        const current = {
          id: item.competitor.id,
          symbol: item.competitor.token.replace(' ', '').toUpperCase(),
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
    console.log('Mapped competitors: ', mapped_competitors_data);
    setCryptos(mapped_competitors_data);
    setLoading(false);
  }, [competitorsData]);

  return (
    <View style={styles.chartContainer}>
      {loading ? (
        <Loader />
      ) : cryptos?.length === 0 ? (
        <NoContentMessage />
      ) : (
        generateMarketCapChart(cryptos, tintColors)
      )}
    </View>
  );
};

export default CurrentMarketCap;
