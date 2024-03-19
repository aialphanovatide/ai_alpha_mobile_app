import React, { useContext, useEffect, useState } from 'react';
import { View, ImageBackground, Text } from 'react-native';
import {
  VictoryChart,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryCandlestick,
  VictoryLabel,
  VictoryLine,
} from 'victory-native';
import Loader from '../../../../../Loader/Loader';
import { AppThemeContext } from '../../../../../../context/themeContext';
import useChartsStyles from './ChartsStyles';
import { getService } from '../../../../../../services/aiAlphaApi';


// Format any number
const formatNumber = num => {
  const absNum = Math.abs(num);

  const abbrev = ['', 'k', 'm', 'b', 't'];
  const tier = (Math.log10(absNum) / 3) | 0;

  // If the number is smaller than 1000, no need for abbreviation
  if (tier === 0) return num;

  const divisor = Math.pow(1000, tier);
  const formattedNum = (num / divisor).toFixed(1);

  // Concatenate the formatted number with the appropriate abbreviation
  return formattedNum + abbrev[tier];
};


function formatLabelNumber(number, decimalPlaces=2) {
  if (number >= 1) {
      return number.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
      return number
  }
}


// Function to calculate Fibonacci retracement levels
const fibonacciRetracement = (low, high) => {
  const range = high - low;
  const retracementLevels = [0, 0.236, 0.382, 0.5, 0.618, 1];
  return retracementLevels.map(level => low + range * level);
};

const Chart = ({
  symbol,
  chartData,
  loading,
  candlesToShow = 30,
  activeButtons,
  selectedInterval,
  coinBot,
}) => {
  const styles = useChartsStyles();
  const { theme } = useContext(AppThemeContext);
  const [supportLevels, setSupportLevels] = useState([]);
  const [resistanceLevels, setResistanceLevels] = useState([]);

  // Fetch support and resistance data from the API
  const getSupportAndResistanceData = async (coinBot, time_interval) => {
    try {
      
      const response = await getService(
        `/api/coin-support-resistance?coin_name=${coinBot}&temporality=${time_interval.toLowerCase()}&pair=usdt`
      );

      const supportValues = [];
      const resistanceValues = [];
      
      if (response.success) {
        // Extract support and resistance values from the response
        const values = response.chart_values;
        for (const key in values) {
          if (key.includes('support')) {
            supportValues.push(values[key]);
          } else if (key.includes('resistance')) {
            resistanceValues.push(values[key]);
          }
        }
  
        setSupportLevels(supportValues);
        setResistanceLevels(resistanceValues);
      } else {
        console.info("---response S&R----", response.message);
      }
    } catch (error) {
      console.error('Error fetching support and resistance data: ', error);
    }
  };


  // Extracting low and high values from candlestick data
  const lows = chartData.map(d => d.low);
  const highs = chartData.map(d => d.high);

  // Calculate Fibonacci retracement levels
  const low = Math.min(...lows);
  const high = Math.max(...highs);
  const retracementLevels = fibonacciRetracement(low, high);
  

  useEffect(() => {
    if (coinBot && selectedInterval){
      getSupportAndResistanceData(coinBot, selectedInterval);
    }
  }, [coinBot, selectedInterval]);


  const domainY = () => {
    if (
      activeButtons.length === 0 ||
      (activeButtons.length > 0 &&
        (supportLevels.length === 0 || resistanceLevels.length === 0))
    ) {
      return chartData.slice(-candlesToShow).reduce(
        (acc, dataPoint) => {
          const { open, close, high, low } = dataPoint;
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
    chartData[chartData.length - candlesToShow]?.x,
    chartData && chartData[chartData.length - 1]?.x,
  ];

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  // console.log('----chartData----', chartData)

  return (
    <View style={styles.chartContainer}>
      <View style={styles.chart}>
        <ImageBackground
          source={require('../../../../../../assets/images/chart_alpha_logo.png')}
          style={styles.chartBackgroundImage}
          resizeMode="contain"
        />

        {/* CHART WRAPPER COMPONENT */}
        <VictoryChart
          width={400}
          containerComponent={<VictoryZoomContainer />}
          domain={{ x: domainX, y: domainY() }}
          padding={{ top: 20, bottom: 60, left: 20, right: 65 }}
          domainPadding={{
            x: 1,
            y: 
              symbol.toLowerCase() === 'atomusdt' && selectedInterval === '1W'
                ? 0
                : 10,
          }}
          scale={{ x: 'time', y: 'log' }}
          height={340}>

          {/* Plot of the Fibonacci lines */}
          {retracementLevels && retracementLevels?.map(level => (
            <VictoryLine
              key={level}
              padding={{ top: 0, bottom: 0, left: 20, right: 60}}
              labels={() => "1.6%"}
              data={[
                { x: domainX[0], y: level },
                { x: domainX[1], y: level },
              ]}
              style={{
                data: { stroke: 'blue' },
                labels: {fontSize: 12}
              }}
              labelComponent={
                <VictoryLabel
                  dy={5}
                  dx={10}
                  textAnchor="start"
                  inline={true}
                  style={{
                    fill: '#fff',
                    fontSize: 11,
                    fontFamily: theme.fontMedium,
                  }}
                  backgroundPadding={[{ top: -1, bottom: 6, left: 2.3, right: 0 }]}
                  backgroundStyle={[
                    {
                      fill: 'blue',
                      opacity: 0.8
                    }
                  ]}
                />
              }
            />
          ))}
          
          {/* X AXIS */}
          <VictoryAxis
            style={{
              axis: { stroke: theme.chartsAxisColor },
              tickLabels: {
                fontSize: theme.responsiveFontSize * 0.725,
                fill: theme.titleColor,
                fontFamily: theme.font,
                maxWidth: 10,
              },
              grid: { stroke: theme.chartsGridColor },
            }}
            tickCount={3}
            tickFormat={(t) => {
              const year = t.getFullYear();
              const month = (t.getMonth() + 1).toString().padStart(2, '0');
              const day = t.getDate().toString().padStart(2, '0');
              const hour = t.getHours().toString().padStart(2, '0');
              const minute = t.getMinutes().toString().padStart(2, '0');
              return `${year}-${day}-${month}`;
            }}
          />
          
           {/* Y AXIS */}
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: theme.chartsAxisColor },
              tickLabels: {
                fontSize: theme.responsiveFontSize * 0.725,
                fontFamily: theme.font,
                fill: theme.titleColor,
              },
              grid: { stroke: theme.chartsGridColor },
            }}
            tickCount={8}
            tickFormat={t => (t > 0.01 ? `$${formatNumber(t)}` : t)}
            orientation="right"
          />

          {/* DISPLAY DATA COMPONENT */}
          <VictoryCandlestick
            data={chartData}
            candleRatio={0.9}
            candleColors={{ positive: '#09C283', negative: '#E93334' }}
            style={{
              data: {
                strokeWidth: 0.75,
                stroke: datum =>
                  datum.close < datum.open ? '#09C283' : '#E93334',
              },
            }}
          />

        

  
          {/* RESISTANCE LEVELS */}
          {resistanceLevels &&
            activeButtons.includes('Resistance') &&
            resistanceLevels?.map((level, index) => (
              <VictoryLine
                data={[
                  { x: domainX[0], y: level },
                  { x: domainX[1], y: level },
                ]}
                key={`resistance-${index}`}
                // styles for the line itself
                style={{ data: { stroke: '#F9B208', strokeWidth: 2 } }}
                labels={() => [`$${formatLabelNumber(level)} `]}
                labelComponent={
                  <VictoryLabel
                    dy={5}
                    dx={10}
                    textAnchor="start"
                    inline={true}
                    style={{
                      fill: '#fff',
                      fontSize: 11,
                      fontFamily: theme.fontMedium,
                    }}
                    backgroundPadding={[{ top: -1, bottom: 6, left: 2.3, right: 0 }]}
                    backgroundStyle={[
                      {
                        fill: '#F9B208',
                        opacity: 0.8
                      }
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
                  { x: domainX[0], y: level },
                  { x: domainX[1], y: level },
                ]}
                key={`support-${index}`}
                style={{
                  data: { stroke: '#FC5404', strokeWidth: 2 },
                }}
                labels={() => [`$${formatLabelNumber(level)} `]}
                labelComponent={
                  <VictoryLabel
                    dy={5}
                    dx={10}
                    textAnchor="start"
                    inline={true}
                    backgroundPadding={[{ top: -1, bottom: 6, left: 2.3, right: 0 }]}
                    style={[
                      {
                        fill: '#F7F7F7',
                        fontSize: 11,
                        fontFamily: theme.fontMedium,
                      },
                    ]}
                    backgroundStyle={[
                      {
                        fill: '#FC5404',
                        opacity: 0.8
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