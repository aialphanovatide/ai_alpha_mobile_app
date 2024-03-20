import React, { useContext, useEffect, useState } from 'react';
import { View, ImageBackground } from 'react-native';
import {
  VictoryChart,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryCandlestick,
  VictoryLabel,
  VictoryLine,
  VictoryTooltip,
} from 'victory-native';
import Loader from '../../../../../Loader/Loader';
import { AppThemeContext } from '../../../../../../context/themeContext';
import useChartsStyles from './ChartsStyles';
import { getService } from '../../../../../../services/aiAlphaApi';


// Format any number, including 0.0000
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

// Format of date: yeay-month-day hour:minutes
function formatDate(dateString) {
 
  const date = new Date(dateString);
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${month}/${day} ${hours}:${minutes}`;
}


const fibonacciRetracement = (low, high) => {
  const range = high - low;
  const retracementLevels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1, 1.618];
  
  return retracementLevels.reduce((result, level) => {
    result[level] = low + range * level;
    return result;
  }, {});
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

  const usesAlternativeSource =
    coinBot === 'velo' || coinBot === 'kas' ? true : false;

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
      return coinBot.toLowerCase() === 'atom' && selectedInterval === '1W'
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

  const lastCandle = chartData[chartData.length - 1]; // Get the last candlestick data


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
              coinBot.toLowerCase() === 'atom' && selectedInterval === '1W'
                ? 0
                : 10,
          }}
          scale={{ x: 'time', y: 'log' }}
          height={340}>

        {/* Plot of the Fibonacci lines */}
        {activeButtons.includes('Fibonacci') && Object.keys(retracementLevels).length > 0 && (
          Object.keys(retracementLevels).map(level => (
            <VictoryLine
            key={level}
            padding={{ top: 0, bottom: 0, left: 20, right: 60}}
            labels={() => `${level}% $${formatLabelNumber(retracementLevels[level])}`}
            data={[
              { x: domainX[0], y: retracementLevels[level] },
              { x: domainX[1], y: retracementLevels[level] },
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
          ))
        )}

          
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
            tickCount={selectedInterval === '1W' ? 10 : 8}
            tickFormat={(t) => formatNumber(t)}
            orientation="right"
          />

          {/* DISPLAY DATA COMPONENT */}
          <VictoryCandlestick
            data={chartData}
            candleRatio={
              usesAlternativeSource && selectedInterval !== '1W' ? 2.75 : 0.9
            }
            labels={({ datum }) => `Date: ${formatDate(datum.x)}\nHigh: ${formatLabelNumber(datum.high)}\nLow: ${formatLabelNumber(datum.low)}\nClose: ${formatLabelNumber(datum.close)}\nOpen: ${formatLabelNumber(datum.open)}`}
            labelComponent={
              <VictoryTooltip
                constrainToVisibleArea 
                dx={0}
                dy={-10}
                renderInPortal={false}
                center={{ x: 90, y: 90 }}
                flyoutWidth={100}
                flyoutPadding={{ top: -5, bottom: 15, left: 0, right: 0 }}
                cornerRadius={5}
                flyoutStyle={{stroke: "#282828", 
                              strokeWidth: 2,
                              fill: "#282828",
                            }}
                labelComponent={
                  <VictoryLabel
                  textAnchor='middle'
                  style={{
                    fill: '#fff',
                    fontSize: 10,
                    fontFamily: theme.fontMedium,
                  }}
                  backgroundStyle={[
                    {
                      fill: '#282828'
                    }
                  ]}
                  backgroundPadding={[{ top: 0, bottom: 5 }]}
                />
                }
              />
            }
          
            candleColors={{positive: '#09C283', negative: '#E93334'}}
            style={{
              data: {
                strokeWidth: 0.75,
                stroke: datum =>
                  datum.close < datum.open ? '#09C283' : '#E93334',
              },
            }}
          />


          {/* TREND LINE */}
          {/* <VictoryLine
                data={[
                  { x: chartData[25].x, y: 52000 },
                  { x: chartData[33].x, y: 68000 },
                ]}
                key={`trendline`}
                style={{
                  data: { stroke: '#13B4C7', strokeWidth: 2 },
                }}
                labels={[formatLabelNumber(52000), formatLabelNumber(68000)]}
                labelComponent={
                  <VictoryLabel
                    dy={0}
                    dx={0}
                    // angle={-36}
                    textAnchor="end"
                    inline={true}
                    backgroundPadding={[{ top: -1, bottom: 6, left: 2.5, right: 8 }]}
                    style={[
                      {
                        fill: '#fff',
                        fontSize: 11,
                        fontFamily: theme.fontMedium,
                      },
                    ]}
                    backgroundStyle={[
                      {
                        fill: '#13B4C7',
                        opacity: 1
                      },
                    ]}
                  />
                }
              /> */}

        

  
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
                style={{ data: { stroke: '#F012A1', strokeWidth: 2 } }}
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
                        fill: '#F012A1',
                        opacity: 0.8
                      }
                    ]}
                  />
                }
              />
            ))}

           {/* SUPPORT LEVELS */}
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



