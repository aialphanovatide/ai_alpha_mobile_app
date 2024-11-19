import React, {useContext, useEffect, useState, useMemo} from 'react';
import {
  View,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  VictoryChart,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryCandlestick,
  VictoryLabel,
  VictoryLine,
} from 'victory-native';
import {AppThemeContext} from '../../../../../../context/themeContext';
import useChartsStyles from './ChartsStyles';
import {getService} from '../../../../../../services/aiAlphaApi';
import ClickOnCandleDetails from './clickOnCandleDetails';
import {useScreenOrientation} from '../../../../../../hooks/useScreenOrientation';
import {useNavigation} from '@react-navigation/core';
import SkeletonLoader from '../../../../../Loader/SkeletonLoader';
import LinearGradient from 'react-native-linear-gradient';
import {throttle} from 'lodash';

// Format any number, including 0.0000
const formatNumber = num => {
  const absNum = Math.abs(num);

  // Handle numbers lower than 1, rounding them to 4 terms.
  if (absNum < 1) {
    return num.toFixed(4);
  }

  const abbrev = ['', 'k', 'm', 'b', 't'];
  const tier = Math.floor(Math.log10(absNum) / 3);

  // If the number is too low, use exponential notation
  if (absNum < 0.001) {
    return num.toExponential();
  }

  // Divide based on the tier
  const divisor = Math.pow(1000, tier);
  const formattedNum = (num / divisor).toFixed(2);

  // Return the number with the correct abbreviation and handling the negative cases.
  return (num < 0 ? '-' : '') + formattedNum + abbrev[tier];
};

// Format number in shorten way
function formatLabelNumber(number, decimalPlaces = 2) {
  if (number >= 1) {
    return number.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return number;
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

// Calculate fibonacci lines
const fibonacciRetracement = (low, high) => {
  const range = high - low;
  const retracementLevels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1, 1.618];

  return retracementLevels.reduce((result, level) => {
    result[level] = low + range * level;
    return result;
  }, {});
};

// Component to render the chart with the support and resistance levels using the Victory library, including the zoom and pan interactions. The component includes the logic to handle the gradient rendering and the S&R levels fetching from the API, and the logic to filter the excessively high or low levels. The component also includes the logic to handle the horizontal chart interaction and the selected candle details rendering.

const VicChart = ({
  symbol,
  chartData,
  loading,
  candlesToShow = 30,
  activeButtons,
  selectedInterval,
  coinBot,
  selectedPairing,
  setSupportResistanceLoading,
  handleOnZoom,
}) => {
  const styles = useChartsStyles();
  const {isDarkMode, theme} = useContext(AppThemeContext);
  const [supportLevels, setSupportLevels] = useState([]);
  const [resistanceLevels, setResistanceLevels] = useState([]);
  const [selectedCandle, setSelectedCandle] = useState(null);
  const {isLandscape, isHorizontal, handleScreenOrientationChange} =
    useScreenOrientation();
  const [showGradient, setShowGradient] = useState(true);
  const navigation = useNavigation();

  // Hook to restart the S&R values when switching the coin, and setting the buttons to inactive

  useEffect(() => {
    setSupportLevels([]);
    setResistanceLevels([]);
  }, [coinBot]);

  // Function to handle the X button interaction on the horizontal chart

  const handleBackInteraction = () => {
    handleScreenOrientationChange('PORTRAIT');
    navigation.canGoBack(false);
  };

  const usesAlternativeSource =
    coinBot === 'velo' || coinBot === 'kas' ? true : false;

  // Fetch support and resistance data from the API
  const getSupportAndResistanceData = async (coinBot, time_interval) => {
    try {
      const response = await getService(
        `/api/coin-support-resistance?coin_name=${coinBot}&temporality=${time_interval.toLowerCase()}&pair=${selectedPairing.toLowerCase()}`,
      );

      const supportValues = [];
      const resistanceValues = [];

      if (response.status === 200) {
        // Extract support and resistance values from the response
        const values = response.message;
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
        console.info('---response S&R----', response.message);
      }
    } catch (error) {
      console.error('Error fetching support and resistance data: ', error);
    } finally {
      setSupportResistanceLoading(false);
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
    if (
      coinBot &&
      activeButtons.length > 0 &&
      (supportLevels.length === 0 || resistanceLevels.length === 0)
    ) {
      setSupportResistanceLoading(true);
      getSupportAndResistanceData(coinBot, selectedInterval);
    }
  }, [coinBot, selectedInterval, activeButtons]);

  const filterExcessiveLevels = (levels, currentPrice, type) => {
    return levels.filter(level => {
      if (type === 'support' || type === 'resistance') {
        return level <= currentPrice * 1.8 && level >= currentPrice * 0.2;
      }
      return false;
    });
  };

  // State variable and hook effect to handle the chart's domain including the zoom interaction, due to it is updated on every chart panning or zooming

  const [zoomDomain, setZoomDomain] = useState({
    x: [
      chartData[chartData.length - candlesToShow]?.x,
      chartData[chartData.length - 1]?.x,
    ],
  });

  useEffect(() => {
    setZoomDomain({
      x: [
        chartData[chartData.length - candlesToShow]?.x,
        chartData[chartData.length - 1]?.x,
      ],
    });
  }, [chartData, candlesToShow]);

  const handleZoomDomainChange = throttle(newZoomDomain => {
    setZoomDomain(newZoomDomain);
  }, 100);

  const domainY = useMemo(() => {
    const priceRange = chartData.slice(-candlesToShow).reduce(
      (acc, dataPoint) => {
        const {open, close, high, low} = dataPoint;
        return [
          Math.min(acc[0], open, close, high, low),
          Math.max(acc[1], open, close, high, low),
        ];
      },
      [Infinity, -Infinity],
    );

    let maxPrice = Math.max(priceRange[1], high);
    let minPrice = Math.min(priceRange[0], low);

    // Apply the function to filter the excessively high or low support and resistance levels
    if (activeButtons.includes('Support')) {
      const filteredSupport = filterExcessiveLevels(
        supportLevels,
        low,
        'support',
      );
      if (filteredSupport.length > 0) {
        minPrice = Math.min(minPrice, ...filteredSupport);
      }
    }

    if (activeButtons.includes('Resistance')) {
      const filteredResistance = filterExcessiveLevels(
        resistanceLevels,
        high,
        'resistance',
      );
      if (filteredResistance.length > 0) {
        maxPrice = Math.max(maxPrice, ...filteredResistance);
      }
    }

    return [minPrice, maxPrice];
  }, [
    chartData,
    candlesToShow,
    supportLevels,
    resistanceLevels,
    activeButtons,
  ]);

  // Function to handle candle click events
  const handleCandleClick = (event, data) => {
    const linesColor = data.close > data.open ? '#09C283' : '#E93334';
    setSelectedCandle({...data, linesColor});
  };

  const handleCandlePressOut = () => {
    setSelectedCandle(null); // Clear the selected candle state
  };

  const calculateCandleMiddle = candle => {
    return (candle.open + candle.close) / 2;
  };

  // Gets the dimensation of the phone
  const {height, width} = Dimensions.get('window');
  const chartWidth = width > 500 ? 860 : 400;
  const chartHeight = 340;

  // Function to handle the gradient rendering by calculating the difference between the last candle's x-axis value with the current x-axis domain lower value
  const handleGradientRender = domainChange => {
    const chartDataTimeStamp = new Date(chartData[0].x).getTime();
    const chartDataMaxTimeStamp = new Date(
      chartData[chartData?.length - 1].x,
    ).getTime();
    const isFirstCandleVisible = zoomDomain.x[0] <= chartDataTimeStamp;

    if (domainChange.x[0] < chartDataTimeStamp) {
      handleZoomDomainChange({
        x: [chartDataTimeStamp, domainChange.x[1]],
        y: domainChange.y,
      });
    } else {
      if (domainChange.x[1] > chartDataMaxTimeStamp) {
        handleZoomDomainChange({
          x: [domainChange.x[0], chartDataMaxTimeStamp],
          y: domainChange.y,
        });
      } else {
        handleZoomDomainChange(domainChange);
      }
    }
    setShowGradient(!isFirstCandleVisible);
  };

  if (loading || chartData.length === 0) {
    return <SkeletonLoader type="chart" style={{height: 300}} />;
  }

  return (
    <View style={styles.chartContainer}>
      <View style={[styles.chart, {width: '100%'}]}>
        <ImageBackground
          source={require('../../../../../../assets/images/chart_alpha_logo.png')}
          style={styles.chartBackgroundImage}
          resizeMode="contain"
        />

        {showGradient && (
          <LinearGradient
            useAngle
            angle={90}
            colors={
              isDarkMode
                ? ['rgba(22, 22, 22, 1)', 'transparent']
                : ['rgba(232, 232, 232, 1)', 'rgba(233 ,233 ,233 ,0)']
            }
            style={{
              position: 'absolute',
              left: 0,
              top: '3%',
              bottom: 0,
              width: 40,
              height: '68.5%',
              marginTop: '5%',
              zIndex: activeButtons.length > 0 ? 0 : 200,
            }}
          />
        )}

        {/* CHART WRAPPER COMPONENT */}
        <VictoryChart
          style={styles.chartMainContainer}
          width={chartWidth}
          standalone={true}
          containerComponent={
            <VictoryZoomContainer
              responsive={true}
              allowPan={true}
              allowZoom={true}
              zoomDomain={zoomDomain.x}
              onZoomDomainChange={domain => handleGradientRender(domain)}
              onTouchStart={() => handleOnZoom(false)}
              onTouchEnd={() => handleOnZoom(true)}
            />
          }
          domain={{x: zoomDomain.x, y: domainY}}
          events={[
            {
              target: 'parent',
              eventHandlers: {
                onPressOut: () => {
                  handleCandlePressOut();
                  return [];
                },
              },
            },
          ]}
          padding={{top: 20, bottom: 60, left: 20, right: 70}}
          domainPadding={{
            x: 1,
            y:
              coinBot.toLowerCase() === 'atom' && selectedInterval === '1W'
                ? 0
                : 10,
          }}
          scale={{x: 'time', y: 'log'}}
          height={chartHeight}>
          {/* X AXIS */}
          <VictoryAxis
            fixLabelOverlap
            style={{
              axis: {stroke: theme.chartsAxisColor},
              tickLabels: {
                fontSize: theme.responsiveFontSize * 0.625,
                fill: theme.titleColor,
                fontFamily: theme.font,
                maxWidth: 10,
              },
              grid: {stroke: theme.chartsGridColor},
            }}
            tickCount={!showGradient ? 2 : 4}
            tickFormat={t => {
              const year = t.getFullYear().toString().slice(2, 4);
              const month = (t.getMonth() + 1).toString().padStart(2, '0');
              const day = t.getDate().toString().padStart(2, '');
              const hour = t.getHours().toString().padStart(2, '0');
              const minute = t.getMinutes().toString().padStart(2, '0');
              return `${day}/${month}/${year}`;
            }}
          />

          {/* Y AXIS */}
          <VictoryAxis
            dependentAxis
            // Events configuration for preventing the scroll issue with the Y-axis values
            events={[
              {
                childName: 'all',
                target: 'tickLabels',
                eventHandlers: {
                  onClick: () => {
                    return;
                  },
                },
              },
              {
                childName: 'all',
                target: 'axis',
                eventHandlers: {
                  onClick: () => {
                    return;
                  },
                },
              },
              {
                childName: 'all',
                target: 'axisLabel',
                eventHandlers: {
                  onClick: () => {
                    return;
                  },
                },
              },
            ]}
            style={{
              axis: {stroke: theme.chartsAxisColor},
              tickLabels: {
                fontSize: theme.responsiveFontSize * 0.67,
                fontFamily: theme.font,
                fill: theme.titleColor,
              },
              grid: {stroke: theme.chartsGridColor},
            }}
            tickCount={selectedInterval === '1W' ? 7 : 5}
            tickFormat={t => formatNumber(t)}
            orientation={'right'}
          />
          {/* HORIZONTAL LINE */}
          {selectedCandle && (
            <VictoryLine
              data={[
                {
                  x: zoomDomain.x[0],
                  y: (selectedCandle.open + selectedCandle.close) / 2,
                },
                {
                  x: zoomDomain.x[1],
                  y: (selectedCandle.open + selectedCandle.close) / 2,
                },
              ]}
              style={{
                data: {
                  stroke: selectedCandle
                    ? selectedCandle.linesColor
                    : '#E93334',
                  strokeWidth: 1,
                  strokeDasharray: [4, 4],
                },
              }}
            />
          )}

          <ClickOnCandleDetails
            domainX={zoomDomain.x}
            yPoint={selectedCandle && calculateCandleMiddle(selectedCandle)}
            domainY={domainY}
            chartWidth={chartWidth}
            screenWidth={width}
            chartHeight={chartHeight}
            data={selectedCandle && selectedCandle}
          />

          {/* VERTICAL LINE */}
          {selectedCandle && (
            <VictoryLine
              data={[
                {x: new Date(selectedCandle.x), y: high},
                {x: new Date(selectedCandle.x), y: low},
              ]}
              style={{
                data: {
                  stroke: selectedCandle
                    ? selectedCandle.linesColor
                    : '#E93334',
                  strokeWidth: 1,
                  strokeDasharray: [4, 4],
                },
              }}
            />
          )}

          {/* DISPLAY DATA COMPONENT */}
          <VictoryCandlestick
            data={chartData}
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onPressIn: (event, props) => {
                    handleCandleClick(event, props.datum);
                    return []; // Return an empty array to avoid any state mutation on the chart itself
                  },
                  onRender: props => {
                    handleGradientRender(props.datum, chartData);
                  },
                },
              },
            ]}
            candleRatio={
              (usesAlternativeSource && selectedInterval !== '1W') ||
              selectedPairing.toLowerCase() === 'eth' ||
              selectedPairing.toLowerCase() === 'btc'
                ? 2.75
                : 0.9
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

          {/* RESISTANCE LEVELS */}
          {resistanceLevels &&
            activeButtons.includes('Resistance') &&
            resistanceLevels?.map((level, index) => (
              <VictoryLine
                data={[
                  {x: zoomDomain.x[0], y: level},
                  {x: zoomDomain.x[1], y: level},
                ]}
                key={`resistance-${index}`}
                // styles for the line itself
                style={{data: {stroke: '#2DDA99', strokeWidth: 2}}}
                labels={() => [`$${formatLabelNumber(level)} `]}
                labelComponent={
                  <VictoryLabel
                    dy={5}
                    dx={10}
                    textAnchor="start"
                    inline={true}
                    style={{
                      fill: '#F7F7F7',
                      fontSize: 10,
                      fontFamily: theme.font,
                    }}
                    backgroundPadding={[
                      {top: -1, bottom: 6, left: 2.3, right: 0},
                    ]}
                    backgroundStyle={[
                      {
                        fill: '#2DDA99',
                      },
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
                  {x: zoomDomain.x[0], y: level},
                  {x: zoomDomain.x[1], y: level},
                ]}
                key={`support-${index}`}
                style={{
                  data: {stroke: '#D82A2B', strokeWidth: 2},
                }}
                labels={() => [`$${formatLabelNumber(level)} `]}
                labelComponent={
                  <VictoryLabel
                    dy={5}
                    dx={10}
                    textAnchor="start"
                    inline={true}
                    backgroundPadding={[
                      {top: -1, bottom: 6, left: 2.3, right: 0},
                    ]}
                    style={[
                      {
                        fill: '#F7F7F7',
                        fontSize: 10,
                        fontFamily: theme.font,
                      },
                    ]}
                    backgroundStyle={[
                      {
                        fill: '#D82A2B',
                      },
                    ]}
                  />
                }
              />
            ))}
        </VictoryChart>
      </View>
      <TouchableOpacity
        onPress={
          isLandscape
            ? () => {
                handleBackInteraction();
              }
            : () => {
                navigation.canGoBack(false);
                handleScreenOrientationChange('LANDSCAPE');
              }
        }>
        <Image
          style={styles.chartsHorizontalButton}
          source={
            isLandscape && isHorizontal
              ? require('../../../../../../assets/images/home/charts/deactivate-horizontal.png')
              : require('../../../../../../assets/images/home/charts/activate-horizontal.png')
          }
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleBackInteraction()}>
        <Image
          style={
            isLandscape && isHorizontal
              ? styles.chartBackButton
              : {display: 'none'}
          }
          resizeMode="contain"
          source={require('../../../../../../assets/images/home/charts/back.png')}
        />
      </TouchableOpacity>
      <Image
        style={[styles.chartsZoomIndicator, selectedCandle && {zIndex: -1}]}
        resizeMode="contain"
        source={require('../../../../../../assets/images/home/charts/zoom-expand.png')}
      />
    </View>
  );
};

export default VicChart;
