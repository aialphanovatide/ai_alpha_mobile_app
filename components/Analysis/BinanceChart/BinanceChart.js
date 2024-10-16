import React, {useState, useEffect, useContext, useMemo} from 'react';
import {View, ImageBackground, Text, Image, Dimensions} from 'react-native';
import {
  VictoryChart,
  VictoryAxis,
  VictoryCandlestick,
  VictoryZoomContainer,
  VictoryLine,
  VictoryLabel,
} from 'victory-native';
import axios from 'axios';
import BackButton from '../BackButton/BackButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import TimeframeSelector from '../../Home/Topmenu/subMenu/Fund_news_chart/Charts/chartTimeframes';
import useBinanceChartStyles from './BinanceChartStyles';
import {AppThemeContext} from '../../../context/themeContext';
import LinearGradient from 'react-native-linear-gradient';
import SkeletonLoader from '../../Loader/SkeletonLoader';
import DataRenderer from '../../Home/Topmenu/subMenu/Fund_news_chart/Charts/clickOnCandleDetails';
import {RevenueCatContext} from '../../../context/RevenueCatContext';
import UpgradeOverlay from '../../UpgradeOverlay/UpgradeOverlay';
import {useScreenOrientation} from '../../../hooks/useScreenOrientation';
import BackgroundGradient from '../../BackgroundGradient/BackgroundGradient';
import {getService} from '../../../services/aiAlphaApi';
import ChartButtons from '../ChartSection/ChartButtons';

const BinanceChart = ({route, navigation}) => {
  const {title, symbol, description} = route.params;
  const [chartData, setChartData] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState('1D');
  const [loading, setLoading] = useState(true);
  const styles = useBinanceChartStyles();
  const {isDarkMode, theme} = useContext(AppThemeContext);
  const [selectedCandle, setSelectedCandle] = useState(null);
  const {subscribed} = useContext(RevenueCatContext);
  const {isLandscape, isHorizontal, handleScreenOrientationChange} =
    useScreenOrientation();
  const [showGradient, setShowGradient] = useState(true);
  const [hasUpdatedZoomDomain, setHasUpdatedZoomDomain] = useState(false);

  // S&R State variables
  const [activeButtons, setActiveButtons] = useState([]);
  const [supportLevels, setSupportLevels] = useState([]);
  const [resistanceLevels, setResistanceLevels] = useState([]);
  const [supportResistanceLoading, setSupportResistanceLoading] =
    useState(false);

  // Hook to fetch the support and resistance data, only when one of the buttons is active

  useEffect(() => {
    if (
      activeButtons.length > 0 &&
      (resistanceLevels.length === 0 || supportLevels.length === 0)
    ) {
      setSupportResistanceLoading(true);
      getSupportAndResistanceData(selectedInterval);
    }
  }, [selectedInterval, activeButtons]);

  async function fetchChartData(interval = selectedInterval) {
    try {
      const response = await axios.get(
        'https://fapi.binance.com/fapi/v1/klines',
        {
          params: {
            symbol: symbol,
            interval: interval.toLowerCase(),
            limit: 45,
          },
        },
      );
      const data = response.data;
      const ohlcData = data.map(entry => ({
        x: new Date(entry[0]),
        open: parseFloat(entry[1]),
        high: parseFloat(entry[2]),
        low: parseFloat(entry[3]),
        close: parseFloat(entry[4]),
      }));
      setChartData(ohlcData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(
      () => fetchChartData(selectedInterval),
      2000,
    );
    return () => clearInterval(intervalId);
  }, [selectedInterval]);

  const changeInterval = async newInterval => {
    setLoading(true);
    try {
      setHasUpdatedZoomDomain(false);
      setSelectedInterval(newInterval);
      setChartData([]);
    } catch (error) {
      console.error('Failed to change interval: ${error}');
    }
  };

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

  // Function to handle the X button interaction on the horizontal chart

  const handleBackInteraction = () => {
    if (isLandscape || isHorizontal) {
      handleScreenOrientationChange('PORTRAIT');
      navigation.canGoBack(false);
    }
  };

  // Function to fetch the support and resistance data for the chart's currency

  const getSupportAndResistanceData = async time_interval => {
    try {
      const response = await getService(
        `/api/coin-support-resistance?coin_name=btc_dom&temporality=${time_interval.toLowerCase()}&pair=usdt`,
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
      }
    } catch (error) {
      console.error('Error fetching support and resistance data: ', error);
    } finally {
      setSupportResistanceLoading(false);
    }
  };

  // Format number in shorten way
  function formatLabelNumber(number, decimalPlaces = 2) {
    if (number >= 1) {
      return number
        .toFixed(decimalPlaces)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return number;
    }
  }

  // Extracting low and high values from candlestick data
  const lows = chartData.map(d => d.low);
  const highs = chartData.map(d => d.high);

  // Calculate Fibonacci retracement levels
  const low = Math.min(...lows);
  const high = Math.max(...highs);

  const {height, width} = Dimensions.get('window');
  const chartWidth = width > 500 ? 860 : 400;
  const chartHeight = 300;

  // State variable and hook effect to handle the chart's domain including the zoom interaction, due to it is updated on every chart panning or zooming

  const domainY = () => {
    if (
      activeButtons.length === 0 ||
      (activeButtons.length > 0 &&
        (supportLevels.length === 0 || resistanceLevels.length === 0))
    ) {
      return chartData?.reduce(
        (acc, dataPoint) => {
          return [
            Math.min(acc[0], dataPoint.low),
            Math.max(acc[1], dataPoint.high),
          ];
        },
        [Infinity, -Infinity],
      );
    } else {
      const levels = [];
      if (supportLevels.length > 0) {
        levels.push(...supportLevels);
      }
      if (resistanceLevels.length > 0) {
        levels.push(...resistanceLevels);
      }
      return [Math.min(...levels), Math.max(...levels)];
    }
  };

  const [zoomDomain, setZoomDomain] = useState({
    x: [
      chartData[chartData.length - 30]?.x,
      chartData[chartData.length - 1]?.x,
    ],
  });

  useEffect(() => {
    if (
      !hasUpdatedZoomDomain ||
      zoomDomain.x[0] === undefined ||
      !zoomDomain.x
    ) {
      setHasUpdatedZoomDomain(true);
      setZoomDomain({
        x: [
          chartData[chartData.length - 30]?.x,
          chartData[chartData.length - 1]?.x,
        ],
      });
    }
  }, [chartData, selectedInterval]);

  // Function to handle the gradient rendering by calculating the difference between the last candle's x-axis value with the current x-axis domain lower value
  const handleGradientRender = domainChange => {
    const chartDataTimeStamp = new Date(chartData[0].x).getTime();
    const chartDataMaxTimeStamp = new Date(
      chartData[chartData?.length - 1].x,
    ).getTime();
    const isFirstCandleVisible = zoomDomain.x[0] <= chartDataTimeStamp;

    if (domainChange.x[0] < chartDataTimeStamp) {
      setZoomDomain({
        x: [chartDataTimeStamp, domainChange.x[1]],
        y: domainChange.y,
      });
    } else {
      if (domainChange.x[1] > chartDataMaxTimeStamp) {
        setZoomDomain({
          x: [domainChange.x[0], chartDataMaxTimeStamp],
          y: domainChange.y,
        });
      } else {
        setZoomDomain(domainChange);
      }
    }
    setShowGradient(!isFirstCandleVisible);
  };

  if (loading || chartData.length === 0) {
    return (
      <LinearGradient
        useAngle={true}
        angle={45}
        colors={isDarkMode ? ['#0F0F0F', '#171717'] : ['#F5F5F5', '#E5E5E5']}
        locations={[0.22, 0.97]}
        style={{flex: 1}}>
        <SafeAreaView style={styles.background}>
          <BackButton />
          <Text style={styles.analysisTitle}>{title}</Text>
          <Text style={styles.sectionDescription}>{description}</Text>
          <View style={styles.container}>
            <SkeletonLoader type="timeframe" quantity={2} />
            <SkeletonLoader
              type="chart"
              style={{marginVertical: 0, paddingTop: 24, paddingVertical: 16}}
            />
          </View>
          {subscribed ? <></> : <UpgradeOverlay />}
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <SafeAreaView style={styles.background}>
      <BackgroundGradient />
      <BackButton />
      <Text style={styles.analysisTitle}>{title}</Text>
      <Text style={styles.sectionDescription}>{description}</Text>
      <View style={styles.timeframeContainer}>
        <TimeframeSelector
          selectedPairing={'null'}
          selectedInterval={selectedInterval}
          changeInterval={changeInterval}
          additionalStyles={{marginVertical: 0}}
        />
        {/* <ChartButtons
          activeButtons={activeButtons}
          setActiveButtons={setActiveButtons}
          disabled={loading || supportResistanceLoading}
        /> */}
      </View>
      <View style={styles.container}>
        <View style={styles.chart}>
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
                left: '2.5%',
                top: 0,
                bottom: 0,
                width: 40,
                height: '80%',
                marginTop: '2.5%',
                zIndex: 1,
              }}
            />
          )}
          <VictoryChart
            width={375}
            domain={{x: zoomDomain.x, y: domainY()}}
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
            padding={{top: 10, bottom: 40, left: 20, right: 70}}
            domainPadding={{x: 5, y: 3}}
            scale={{x: 'time', y: 'linear'}}
            containerComponent={
              <VictoryZoomContainer
                zoomDomain={zoomDomain.x}
                onZoomDomainChange={domain => handleGradientRender(domain)}
              />
            }
            height={300}>
            {/* X-Axis */}
            <VictoryAxis
              fixLabelOverlap
              style={{
                axis: {stroke: theme.chartsAxisColor, strokeWidth: 2.5},
                tickLabels: {
                  fontSize: 9.25,
                  fill: theme.titleColor,
                  fontFamily: theme.font,
                },
                grid: {stroke: theme.chartsGridColor},
              }}
              tickCount={6}
              tickFormat={t => {
                const year = t.getFullYear().toString().slice(2, 4);
                const month = (t.getMonth() + 1).toString().padStart(2, '0');
                const day = t.getDate().toString().padStart(2, '');
                const hour = t.getHours().toString().padStart(2, '0');
                const minute = t.getMinutes().toString().padStart(2, '0');
                return `${day}/${month}/${year}`;
              }}
            />
            {/* Y Axis */}
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
                axis: {stroke: theme.chartsAxisColor, strokeWidth: 2.5},
                tickLabels: {
                  fontSize: theme.responsiveFontSize * 0.725,
                  fill: theme.titleColor,
                  fontFamily: theme.font,
                },
                grid: {stroke: theme.chartsGridColor},
              }}
              tickCount={!showGradient ? 3 : 8}
              tickFormat={t => `$${t}`}
              orientation="right"
            />
            {/* Selected candle data component */}
            <DataRenderer
              domainX={zoomDomain.x}
              yPoint={selectedCandle && calculateCandleMiddle(selectedCandle)}
              domainY={domainY}
              chartWidth={chartWidth}
              screenWidth={width}
              chartHeight={chartHeight}
              data={selectedCandle && selectedCandle}
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
            {/* Candle component */}
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
                  },
                },
              ]}
              candleRatio={0.5}
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
                          opacity: 0.9,
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
                          opacity: 1,
                        },
                      ]}
                    />
                  }
                />
              ))}
            <ImageBackground
              source={require('../../../assets/images/chart_alpha_logo.png')}
              style={styles.chartBackgroundImage}
              resizeMode="contain"
            />
          </VictoryChart>
          {/* Horizontal view button [DEACTIVATED UNTIL SOLVING ISSUES] */}
          {/* <TouchableOpacity
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
                resizeMode="contain"
                source={
                  isLandscape && isHorizontal
                    ? require('../../../assets/images/home/charts/deactivate-horizontal.png')
                    : require('../../../assets/images/home/charts/activate-horizontal.png')
                }
              />
            </TouchableOpacity> */}
          {/* Horizontal view close button */}
          {/* <TouchableOpacity onPress={() => handleBackInteraction()}>
              <Image
                style={
                  isLandscape && isHorizontal
                    ? styles.chartBackButton
                    : {display: 'none'}
                }
                resizeMode="contain"
                source={require('../../../assets/images/home/charts/back.png')}
              />
            </TouchableOpacity> */}
          {/* Zoom interaction indicator */}
          <Image
            style={[styles.chartsZoomIndicator, selectedCandle && {zIndex: -1}]}
            resizeMode="contain"
            source={require('../../../assets/images/home/charts/zoom-expand.png')}
          />
        </View>
      </View>
      {subscribed ? <></> : <UpgradeOverlay />}
    </SafeAreaView>
  );
};

export default BinanceChart;
