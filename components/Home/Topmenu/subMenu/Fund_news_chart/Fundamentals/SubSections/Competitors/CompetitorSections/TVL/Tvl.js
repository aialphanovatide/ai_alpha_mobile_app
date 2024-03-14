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
import NoContentMessage from '../../../../NoContentMessage/NoContentMessage';

const TotalValueLocked = ({competitorsData, isSectionWithoutData}) => {
  const {theme} = useContext(AppThemeContext);
  const styles = useChartStyles();
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  const parseNumberString = numberString => {
    const numberWithoutSign = numberString.replace(/\s|,/g, '');
    const numericValue = parseFloat(numberWithoutSign);
    const valueInBillions = numericValue / 1e9;
    return isNaN(valueInBillions) && isNaN(numericValue)
      ? [0, 0]
      : [valueInBillions, numericValue];
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
    return found && found !== undefined
      ? found.competitor.value !== '-'
        ? found.competitor.value
        : ''
      : null;
  };

  useEffect(() => {
    setLoading(true);
    const mapped_tvl = [];
    competitorsData.forEach(item => {
      if (
        mapped_tvl.find(
          mapped =>
            mapped.symbol ===
            item.competitor.token.replace(/\s/g, '').toUpperCase(),
        )
      ) {
        return;
      } else {
        const current = {
          id: item.competitor.id,
          symbol: item.competitor.token.replace(/\s/g, '').toUpperCase(),
          tvl: parseNumberString(
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
    console.log('Mapped tvl: ', mapped_tvl);
    setCryptos(mapped_tvl);
    setLoading(false);
  }, [competitorsData]);

  const tintColors = ['#399AEA', '#20CBDD', '#895EF6', '#EB3ED6'];

  return (
    <View style={styles.chartContainer}>
      {loading ? (
        <Loader />
      ) : cryptos?.length === 0 ||
        isSectionWithoutData(competitorsData, 'tvl', '-') ? (
        <NoContentMessage />
      ) : (
        <>
          <VictoryChart
            height={450}
            padding={{left: 55, right: 50, bottom: 40, top: 40}}>
            <VictoryAxis
              style={{
                axis: {stroke: theme.chartsColor},
                tickLabels: {
                  fontSize: theme.responsiveFontSize * 0.85,
                  fontFamily: theme.fontMedium,
                  fill: theme.titleColor,
                },
              }}
            />
            <VictoryAxis
              dependentAxis
              style={{
                axis: {stroke: theme.chartsColor},
                tickLabels: {
                  fontFamily: theme.fontMedium,
                  fontSize: theme.responsiveFontSize * 0.85,
                  fill: theme.secondaryTextColor,
                },
                grid: {stroke: theme.chartsColor},
              }}
              tickFormat={value => `$${value}b`}
              tickCount={8}
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
                y: crypto.tvl[0],
                label: ` $${crypto.tvl[1]}b `,
                color: tintColors[index > 3 ? index % 3 : index],
              }))}
              labels={({datum}) => datum.label}
              labelComponent={<VictoryTooltip renderInPortal={false} />}
            />
          </VictoryChart>
        </>
      )}
    </View>
  );
};

export default TotalValueLocked;
