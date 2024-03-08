import React, {useContext} from 'react';
import {View, ImageBackground, Text} from 'react-native';
import {
  VictoryChart,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryCandlestick,
  VictoryLabel,
  VictoryLine,
  VictoryPortal,
  VictoryContainer,
} from 'victory-native';
import Loader from '../../../../../Loader/Loader';
import {AppThemeContext} from '../../../../../../context/themeContext';
import useChartsStyles from './ChartsStyles';

const Chart = ({
  symbol,
  chartData,
  supportLevels,
  resistanceLevels,
  loading,
  candlesToShow = 30,
  activeButtons,
  selectedInterval,
}) => {
  const styles = useChartsStyles();
  const {theme} = useContext(AppThemeContext);

  const formatNumber = num => {
    const absNum = Math.abs(num);
    const abbrev = ['', 'k', 'm', 'b', 't'];
    const thousand = 1000;

    const tier = (Math.log10(absNum) / 3) | 0;

    if (tier == 0) return num;

    const divisor = Math.pow(thousand, tier);
    const formattedNum = (num / divisor).toFixed(1);

    return formattedNum + abbrev[tier];
  };

  if (loading) {
    return (
      <View style={styles.chartContainer}>
        <Loader />
      </View>
    );
  }

  const domainY = () => {
    if (
      activeButtons.length === 0 ||
      (activeButtons.length > 0 &&
        (supportLevels.length === 0 || resistanceLevels.length === 0))
    ) {
      return chartData.slice(-candlesToShow).reduce(
        (acc, dataPoint) => {
          const {open, close, high, low} = dataPoint;
          return [
            Math.min(acc[0], open, close, high, low),
            Math.max(acc[1], open, close, high, low),
          ];
        },
        [Infinity, -Infinity],
      );
    } else {
      const levels = [...supportLevels, ...resistanceLevels];
      // Remove: atom usdt issue solver.
      return symbol.toLowerCase() === 'atomusdt' && selectedInterval === '1W'
        ? [1, Math.max(...levels)]
        : [Math.min(...levels), Math.max(...levels)];
    }
  };

  const domainX = [
    chartData[chartData.length - candlesToShow].x,
    chartData && chartData[chartData.length - 1].x,
  ];

  return (
    <View style={styles.chartContainer}>
      <View style={styles.chart}>
        <ImageBackground
          source={require('../../../../../../assets/images/chart_alpha_logo.png')}
          style={styles.chartBackgroundImage}
          resizeMode="contain"
        />

        <VictoryChart
          width={400}
          containerComponent={<VictoryZoomContainer zoomDimension="x" />}
          domain={{x: domainX, y: domainY()}}
          padding={{top: 20, bottom: 60, left: 20, right: 65}}
          domainPadding={{
            x: 10,
            y:
              symbol.toLowerCase() === 'atomusdt' && selectedInterval === '1W'
                ? 0
                : 10,
          }}
          scale={{x: 'time', y: 'log'}}
          height={340}>
          <VictoryAxis
            style={{
              axis: {stroke: theme.chartsAxisColor},
              tickLabels: {
                fontSize: theme.responsiveFontSize * 0.725,
                fill: theme.titleColor,
                fontFamily: theme.font,
                maxWidth: 10,
              },
              grid: {stroke: theme.chartsGridColor},
            }}
            tickCount={
              selectedInterval === '1W' || selectedInterval === '1D' ? 4 : 6
            }
          />
          <VictoryAxis
            dependentAxis
            style={{
              axis: {stroke: theme.chartsAxisColor},
              tickLabels: {
                fontSize: theme.responsiveFontSize * 0.725,
                fontFamily: theme.font,
                fill: theme.titleColor,
              },
              grid: {stroke: theme.chartsGridColor},
            }}
            tickCount={selectedInterval === '1W' ? 10 : 8}
            tickFormat={t => (t > 0.01 ? `$${formatNumber(t)}` : t)}
            orientation="right"
          />

          <VictoryCandlestick
            data={chartData}
            candleRatio={2.5}
            candleColors={{positive: '#09C283', negative: '#E93334'}}
            style={{
              data: {
                strokeWidth: 0.75,
                stroke: datum =>
                  datum.close < datum.open ? '#09C283' : '#E93334',
              },
            }}
          />

          {resistanceLevels &&
            activeButtons.includes('Resistance') &&
            resistanceLevels?.map((level, index) => (
              <VictoryLine
                data={[
                  {x: domainX[0], y: level},
                  {x: domainX[1], y: level},
                ]}
                key={`resistance-${index}`}
                style={{data: {stroke: '#F9B208', strokeWidth: 2}}}
                labels={() => [`$${level.toString()} `]}
                labelComponent={
                  <VictoryLabel
                    dy={5}
                    dx={260}
                    textAnchor="start"
                    inline={true}
                    style={{
                      fill: '#F7F7F7',
                      fontSize: 11,
                      fontFamily: theme.fontMedium,
                    }}
                    backgroundPadding={[0]}
                    backgroundStyle={[
                      {
                        fill: '#F9B208',
                        borderRadius: 4,
                      },
                      {fill: 'transparent'},
                    ]}
                  />
                }
              />
            ))}
          {supportLevels &&
            activeButtons.includes('Support') &&
            supportLevels?.map((level, index) => (
              <VictoryLine
                data={[
                  {x: domainX[0], y: level},
                  {x: domainX[1], y: level},
                ]}
                key={`support-${index}`}
                style={{
                  data: {stroke: '#FC5404', strokeWidth: 2},
                }}
                labels={() => [`$${level.toString()} `]}
                labelComponent={
                  <VictoryLabel
                    dy={5}
                    dx={260}
                    textAnchor="start"
                    inline={true}
                    backgroundPadding={[0, 0]}
                    backgroundStyle={[
                      {
                        fill: '#FC5404',
                        borderRadius: 2,
                      },
                      {fill: 'transparent'},
                    ]}
                    style={[
                      {
                        fill: '#F7F7F7',
                        fontSize: 11,
                        fontFamily: theme.fontMedium,
                      },
                    ]}
                  />
                }
              />
            ))}
        </VictoryChart>
      </View>
    </View>
  );
};

export default Chart;

// this style deletes the line in the y axis
{
  /* <VictoryAxis dependentAxis style={{ axis: { stroke: 'none' } }} /> */
}

// {chartData.length == 0 ? <View style={styles.loadingContainer}><Text style={styles.loading}>Loading...</Text></View> :
//         <View style={styles.chart}>
//           <ImageBackground source={require('../../../../assets/logo_3.png')} style={styles.background}>
//             <VictoryChart
//               scale={{ x: 'time', y: 'log' }}
//               height={400}
//               width={420}
//               domainPadding={{x:60, y: 3}}
//               containerComponent={<VictoryZoomContainer />}
//               theme={VictoryTheme.material}
//             >

//               {/* Y */}
//               <VictoryAxis
//                 label={'USD'}
//                 tickCount={6}
//                 dependentAxis
//                 axisLabelComponent={<VictoryLabel dy={-30} dx={0} />}
//                 style={{ tickLabels: { fill: '#282828' } }}
//               />

//               {/* X */}
//               <VictoryAxis
//                 tickCount={4}
//                 label={'Time'}
//                 tickFormat={(t) => moment.unix(t).format('MMM DD')}
//                 axisLabelComponent={<VictoryLabel dy={25} />}
//                 style={{
//                   tickLabels: {
//                     padding: 5,
//                     fontSize: 12, fill: '#282828'
//                   }
//                 }} />

//               {/* global */}
//               <VictoryCandlestick
//                domain={{
//                 x: [chartData.length - 20, chartData.length],
//                  }}
//                 labels={({ datum, index }) => (index === chartData.length - 1 ? `${datum.close}` : '')}
//                 open="open"
//                 high="high"
//                 low="low"
//                 close="close"
//                 style={{
//                   data: {
//                     margin: 6,
//                     padding: 10,
//                     stroke: 'red',
//                     strokeWidth: 1,
//                   },
//                   labels: {
//                     fill: ({ datum }) => datum.close > datum.open
//                         ? "green"
//                           : "red"
//                     }
//                 }}
//                 candleRatio={6}
//                 data={chartData}
//                 candleColors={{ positive: '#4caf50', negative: '#f44336' }}
//               />

//               { resistanceLevels && resistanceLevels?.map((level, index) => (
//               <VictoryLine
//               domain={{
//                 x: [chartData.length, chartData.length],
//                 }}
//                 // labels={`Resistance ${index+1} - ${level}`}
//                 key={`resistance-${index}`}
//                 data={[{ x: 0, y: level }, { x: chartData.length, y: level }]}
//                 style={{ data: { stroke: 'red', strokeWidth: 1 } }}
//                 labelComponent={<VictoryLabel dy={0}/>}
//               />
//             ))}

//               { supportLevels && supportLevels?.map((level, index) => (
//               <VictoryLine
//               domain={{
//                 x: [chartData.length, chartData.length],
//                 }}
//                 // labels={`Support ${index+1} - ${level}`}
//                 key={`support-${index}`}
//                 labelComponent={<VictoryLabel dy={0}/>}
//                 data={[{ x: 0, y: level }, { x: chartData.length, y: level }]}
//                 style={{ data: { stroke: 'blue', strokeWidth: 1} }}
//               />
//             ))}

//             </VictoryChart>
//           </ImageBackground>
//         </View>
//       }
