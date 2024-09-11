import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BackButton from '../BackButton/BackButton';
import useChartSectionStyles from './ChartSectionStyles';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../../context/themeContext';
import TimeframeSelector from '../../Home/Topmenu/subMenu/Fund_news_chart/Charts/chartTimeframes';
import {
  getCapitalComPrices,
  postCCSession,
} from '../../../services/CapitalComServices';
import {
  VictoryAxis,
  VictoryCandlestick,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryZoomContainer,
} from 'victory-native';
import {getService} from '../../../services/aiAlphaApi';
import ChartButtons from './ChartButtons';
import SkeletonLoader from '../../Loader/SkeletonLoader';
import {useScreenOrientation} from '../../../hooks/useScreenOrientation';
import DataRenderer from '../../Home/Topmenu/subMenu/Fund_news_chart/Charts/clickOnCandleDetails';
import {RevenueCatContext} from '../../../context/RevenueCatContext';
import UpgradeOverlay from '../../UpgradeOverlay/UpgradeOverlay';

const initialSessionData = {
  security_token: null,
  security_cst: null,
};

const ChartSection = ({route, navigation}) => {
  const {title, symbol, description} = route.params;
  const styles = useChartSectionStyles();
  const {isDarkMode, theme} = useContext(AppThemeContext);
  const [selectedInterval, setSelectedInterval] = useState('1D');
  const [sessionData, setSessionData] = useState(initialSessionData);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  // S&R State variables
  const [activeButtons, setActiveButtons] = useState([]);
  const [supportLevels, setSupportLevels] = useState([]);
  const [resistanceLevels, setResistanceLevels] = useState([]);
  const {isLandscape, isHorizontal, handleScreenOrientationChange} =
    useScreenOrientation();
  const [supportResistanceLoading, setSupportResistanceLoading] =
    useState(false);
  const [selectedCandle, setSelectedCandle] = useState(null);
  const {subscribed} = useContext(RevenueCatContext);
  const [showGradient, setShowGradient] = useState(true);
  const [hasUpdatedZoomDomain, setHasUpdatedZoomDomain] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  // Hook to request again the data to CapitalCom when changing the time interval or the coin (changing to other chart)
  useEffect(() => {
    setLoading(true);
    if (!sessionData.security_cst && !sessionData.security_token) {
      loadChartsData();
    } else {
      fetchCapitalComChartData(
        sessionData.security_token,
        sessionData.security_cst,
      );
    }
  }, [symbol, selectedInterval]);

  // Hook to fetch the support and resistance data, only when one of the buttons is active

  useEffect(() => {
    const coinBot = symbol === 'US500' ? 'sp500' : 'DXY';
    if (
      activeButtons.length > 0 &&
      (resistanceLevels.length === 0 || supportLevels.length === 0)
    ) {
      setSupportResistanceLoading(true);
      getSupportAndResistanceData(coinBot, selectedInterval);
    }
  }, [symbol, selectedInterval, activeButtons]);

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

  // Function to fetch the support and resistance data for the chart's currency

  const getSupportAndResistanceData = async (coinBot, time_interval) => {
    try {
      const response = await getService(
        `/api/coin-support-resistance?coin_name=${coinBot}&temporality=${time_interval.toLowerCase()}&pair=usdt`,
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

  // Function to fetch the chart data from the CapitalCom API, passing the previously requested session data

  async function fetchCapitalComChartData(security_token, security_cst) {
    const adapted_interval =
      selectedInterval.toUpperCase() === '1H'
        ? 'HOUR'
        : selectedInterval.toUpperCase() === '4H'
        ? 'HOUR_4'
        : selectedInterval.toUpperCase() === '1D'
        ? 'DAY'
        : 'WEEK';
    try {
      const response = await getCapitalComPrices(
        symbol,
        adapted_interval,
        30,
        security_token,
        security_cst,
      );
      const mapped_prices = response?.prices?.map(price => {
        const mapped_hour = new Date(price?.snapshotTime);
        const hour_to_seconds = mapped_hour.getTime();
        return {
          x: hour_to_seconds,
          open: parseFloat(price.openPrice.ask),
          high: parseFloat(price.highPrice.ask),
          low: parseFloat(price.lowPrice.ask),
          close: parseFloat(price.closePrice.ask),
        };
      });
      setChartData(mapped_prices);
      setLoading(false);
    } catch (error) {
      console.error('Error getting the prices data: ', error);
      setSessionData({security_token: null, security_cst: null});
    }
  }

  // Function to obtain both session and charts data from CapitalCom

  async function loadChartsData() {
    try {
      const response = await postCCSession();
      const {security_token, security_cst} = response;
      setSessionData({security_token, security_cst});

      fetchCapitalComChartData(security_token, security_cst);
    } catch (error) {
      console.error('Error creating the new session', error);
      setSessionData({security_token: null, security_cst: null});
    }
  }

  // This chart was configured to update every 30s since the source is an external API which has limitation parameters in terms of requests per minute.

  // useEffect(() => {
  //   const intervalId = setInterval(() => loadChartsData(), 8000);
  //   return () => clearInterval(intervalId);
  // }, [symbol, selectedInterval]);

  const candlesToShow = selectedInterval.toLowerCase() === '1w' ? 30 : 20;

  // Function to generate the Y-Domain for the charts

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

  // State variable and hook effect to handle the chart's domain including the zoom interaction, due to it is updated on every chart panning or zooming

  const [zoomDomain, setZoomDomain] = useState({
    x: [
      chartData[chartData.length - candlesToShow]?.x,
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
          chartData[chartData.length - candlesToShow]?.x,
          chartData[chartData.length - 1]?.x,
        ],
      });
    }
  }, [chartData, selectedInterval]);

  // const domainX = [chartData[0]?.x, chartData[chartData.length - 1]?.x];

  // [TEMPORARY] Function to manually update the data of the chart

  const handleDataUpdate = async currentInterval => {
    setLoading(true);
    setChartData([]);
    await fetchCapitalComChartData(
      sessionData.security_token,
      sessionData.security_cst,
    );
  };

  // Function to trigger the time interval change of the charts, requesting again the data

  const changeInterval = async newInterval => {
    setLoading(true);
    try {
      setSelectedInterval(newInterval);
      setChartData([]);
    } catch (error) {
      console.error('Failed to change interval: ${error}');
    }
  };

  // Function to handle the X button interaction on the horizontal chart

  const handleBackInteraction = () => {
    if (isLandscape || isHorizontal) {
      handleScreenOrientationChange('PORTRAIT');
      navigation.canGoBack(false);
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

  // Extracting low and high values from candlestick data
  const lows = chartData.map(d => d.low);
  const highs = chartData.map(d => d.high);

  // Calculate Fibonacci retracement levels
  const low = Math.min(...lows);
  const high = Math.max(...highs);

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

  // Function to enable and disable the scroll interactions when zooming the chart

  const handleOnZoom = value => {
    setScrollEnabled(value);
  };

  if (loading || chartData?.length === 0) {
    return (
      <LinearGradient
        useAngle={true}
        angle={45}
        colors={isDarkMode ? ['#0F0F0F', '#171717'] : ['#F5F5F5', '#E5E5E5']}
        locations={[0.22, 0.97]}
        style={{flex: 1}}>
        <SafeAreaView
          style={[
            styles.background,
            isLandscape && isHorizontal && {width: '100%'},
          ]}>
          <ScrollView style={{flex: 1}}>
            <View style={styles.backButtonWrapper}>
              <BackButton />
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.sectionDescription}>{description}</Text>
            <View style={styles.container}>
              <SkeletonLoader type="timeframe" quantity={4} />
              <SkeletonLoader
                type="chart"
                style={{marginVertical: 0, paddingTop: 24, paddingVertical: 16}}
              />
            </View>
          </ScrollView>
          {subscribed ? <></> : <UpgradeOverlay />}
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0F0F0F', '#171717'] : ['#F5F5F5', '#E5E5E5']}
      locations={[0.22, 0.97]}
      style={{flex: 1}}>
      <SafeAreaView
        style={[
          styles.mainSection,
          isLandscape && isHorizontal && {width: '100%', paddingTop: 0},
        ]}>
        <ScrollView
          scrollEnabled={scrollEnabled}
          style={[
            {flex: 1, paddingTop: 36},
            isLandscape && isHorizontal && {paddingTop: 36},
          ]}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <View style={styles.backButtonWrapper}>
            <BackButton />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.sectionDescription}>{description}</Text>
          <View style={styles.timeframeContainer}>
            <TimeframeSelector
              selectedInterval={selectedInterval}
              changeInterval={changeInterval}
              selectedPairing={'usdt'}
              disabled={loading}
            />
            {(selectedInterval.toUpperCase() === '1W' ||
              selectedInterval.toUpperCase() === '1D') && (
              <ChartButtons
                activeButtons={activeButtons}
                setActiveButtons={setActiveButtons}
                disabled={loading || supportResistanceLoading}
              />
            )}
            {/* Refresh data button */}
            <TouchableOpacity
              onPress={() => handleDataUpdate(selectedInterval)}
              disabled={loading}>
              <Image
                source={require('../../../assets/images/home/charts/chart-refresh.png')}
                style={styles.refreshButton}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={styles.chart}>
              <ImageBackground
                source={require('../../../assets/images/chart_alpha_logo.png')}
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
                    top: 0,
                    bottom: 0,
                    width: 40,
                    height: '80%',
                    marginTop: '5%',
                    zIndex: 1,
                  }}
                />
              )}
              <VictoryChart
                width={isLandscape && isHorizontal ? 700 : 375}
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
                height={300}
                containerComponent={
                  <VictoryZoomContainer
                    zoomDomain={zoomDomain.x}
                    onZoomDomainChange={domain => handleGradientRender(domain)}
                    onTouchStart={() => handleOnZoom(false)}
                    onTouchEnd={() => handleOnZoom(true)}
                  />
                }>
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
                  tickCount={selectedInterval.toUpperCase() === '1W' ? 3 : 6}
                  tickFormat={t => {
                    const year = t.getFullYear();
                    const month = (t.getMonth() + 1)
                      .toString()
                      .padStart(2, '0');
                    const day = t.getDate().toString().padStart(2, '0');
                    const hour = t.getHours().toString().padStart(2, '0');
                    const minute = t.getMinutes().toString().padStart(2, '0');
                    return `${day}/${month}/${year}`;
                  }}
                />
                {/* Y-Axis */}
                <VictoryAxis
                  dependentAxis
                  style={{
                    axis: {stroke: theme.chartsAxisColor},
                    tickLabels: {
                      fontSize: theme.responsiveFontSize * 0.725,
                      fill: theme.titleColor,
                      fontFamily: theme.font,
                    },
                    grid: {stroke: theme.chartsGridColor},
                  }}
                  orientation="right"
                  tickCount={8}
                  tickFormat={t => `$${t}`}
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
                {/* Component that renders when clicking a candle */}
                <DataRenderer
                  domainX={zoomDomain.x}
                  yPoint={
                    selectedCandle && calculateCandleMiddle(selectedCandle)
                  }
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
                  candleRatio={0.6}
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
              </VictoryChart>
            </View>
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
              style={[
                styles.chartsZoomIndicator,
                selectedCandle && {zIndex: -1},
              ]}
              resizeMode="contain"
              source={require('../../../assets/images/home/charts/zoom-expand.png')}
            />
          </View>
        </ScrollView>
        {subscribed ? <></> : <UpgradeOverlay />}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ChartSection;
