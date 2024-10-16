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
import NoContentMessage from '../../../../NoContentMessage/NoContentMessage';
import SkeletonLoader from '../../../../../../../../../Loader/SkeletonLoader';

const TotalValueLocked = ({competitorsData, isSectionWithoutData}) => {
  const {theme} = useContext(AppThemeContext);
  const styles = useChartStyles();
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxTvlValue, setMaxTvlValue] = useState(0);
  const [activeBarIndex, setActiveBarIndex] = useState(null);
  const [activeBarLabel, setActiveBarLabel] = useState(null);

  const parseNumberString = numberString => {
    const numberWithoutSign = numberString.replace(/\s|,/g, '');
    const numericValue = parseFloat(numberWithoutSign);
    const valueInBillions = numericValue / 1e9;
    return isNaN(valueInBillions) && isNaN(numericValue)
      ? [0, 0]
      : [valueInBillions, numericValue];
  };

  const findKeyInCompetitorItem = (data, key, crypto) => {
    const found = data.find(
      item =>
        item.competitor.token.replace(/\s/g, '') ===
          crypto.replace(/\s/g, '') && item.competitor.key.includes(key),
    );
    return found && found !== undefined
      ? found.competitor.value !== '-'
        ? found.competitor.value
        : ''
      : null;
  };

  // Function to handle the pressing of a competitors' bar included in the generated chart shown in this section, this set the index and the value of the bar to be shown in the box over the clicked bar.

  const handleBarPress = (index, label) => {
    if (index === activeBarIndex) {
      setActiveBarIndex(null);
      setActiveBarLabel(null);
    } else {
      setActiveBarIndex(index);
      setActiveBarLabel(label);
    }
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
    setCryptos(mapped_tvl);
    setLoading(false);
    let maxTvl = 0;

    mapped_tvl.forEach(tvl => {
      if (tvl.tvl[0] > maxTvl) {
        maxTvl = tvl.tvl[0];
      }
    });
    setMaxTvlValue(maxTvl);
  }, [competitorsData]);

  const tintColors = ['#399AEA', '#20CBDD', '#895EF6', '#EB3ED6'];

  return (
    <View style={styles.chartContainer}>
      {loading ? (
        <SkeletonLoader type="chart" />
      ) : cryptos?.length === 0 ||
        isSectionWithoutData(competitorsData, 'tvl', '-') ? (
        <NoContentMessage />
      ) : (
        <>
          <VictoryChart
            height={450}
            width={375}
            padding={{left: 55, right: 40, bottom: 40, top: 16}}>
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
              domain={{
                x: [0, 5],
                y: [0, maxTvlValue < 5 ? maxTvlValue + 1 : maxTvlValue + 15],
              }}
              domainPadding={{
                x: 1,
                y: maxTvlValue < 5 ? 0.5 : maxTvlValue > 100 ? 20 : 2.5,
              }}
              data={cryptos.map((crypto, index) => ({
                x: crypto.symbol,
                y: crypto.tvl[0],
                label: ` $${crypto.tvl[1]}b `,
                color: tintColors[index > 3 ? index % 3 : index],
              }))}
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onPress: (e, props) => {
                      handleBarPress(props.index, props.datum.label);
                    },
                  },
                },
              ]}
              labels={({index}) =>
                index === activeBarIndex ? activeBarLabel : ''
              }
              labelComponent={
                <VictoryTooltip
                  index={activeBarIndex}
                  renderInPortal={false}
                  active={
                    activeBarIndex !== null
                      ? ({index}) => index === activeBarIndex
                      : false
                  }
                  style={[
                    styles.barLabel,
                    {
                      opacity: activeBarLabel ? 1 : 0,
                      zIndex: activeBarLabel && -1000,
                    },
                  ]}
                  pointerLength={activeBarIndex === null ? 0 : 10}
                />
              }
            />
          </VictoryChart>
        </>
      )}
    </View>
  );
};

export default TotalValueLocked;
