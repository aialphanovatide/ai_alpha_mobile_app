import React, {useContext, useEffect, useMemo, useState} from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../../context/themeContext';
import {
  VictoryAxis,
  VictoryCandlestick,
  VictoryChart,
  VictoryLine,
  VictoryZoomContainer,
} from 'victory-native';
import TwelveDataService from '../../../services/TwelveDataServices';
import useChartSectionStyles from '../ChartSection/ChartSectionStyles';
import SkeletonLoader from '../../Loader/SkeletonLoader';
import {useScreenOrientation} from '../../../hooks/useScreenOrientation';
import {useNavigation} from '@react-navigation/core';
import TimeframeSelector from '../../Home/Topmenu/subMenu/Fund_news_chart/Charts/chartTimeframes';
import moment from 'moment';
import DataRenderer from '../../Home/Topmenu/subMenu/Fund_news_chart/Charts/clickOnCandleDetails';
import {RevenueCatContext} from '../../../context/RevenueCatContext';
import UpgradeOverlay from '../../UpgradeOverlay/UpgradeOverlay';

const VixChart = ({route, candlesToShow = 30}) => {
  const styles = useChartSectionStyles();
  const {isDarkMode, theme} = useContext(AppThemeContext);
  const [chartData, setChartData] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState('1D');
  const [loading, setLoading] = useState(true);
  const {isLandscape, isHorizontal, handleScreenOrientationChange} =
    useScreenOrientation();
  const [selectedCandle, setSelectedCandle] = useState(null);
  const navigation = useNavigation();
  const {subscribed} = useContext(RevenueCatContext);

  // Hook to request again the data to CapitalCom when changing the time interval or the coin (changing to other chart)
  useEffect(() => {
    setLoading(true);
    fetchVixIndexData();
  }, [selectedInterval]);

  async function fetchVixIndexData() {
    try {
      const adapted_interval =
        selectedInterval.toUpperCase() === '1D' ? '1day' : '1week';
      const response = await TwelveDataService.getVixIndexData(
        adapted_interval,
      );
      const mapped_prices = response?.map(price => {
        const mapped_hour = new Date(price?.datetime);
        const hour_to_seconds = mapped_hour.getTime();
        return {
          x: moment(hour_to_seconds),
          open: parseFloat(price.open),
          high: parseFloat(price.high),
          low: parseFloat(price.low),
          close: parseFloat(price.close),
        };
      });
      setChartData(mapped_prices);
      setLoading(false);
    } catch (error) {
      console.error('Error getting the VIX Index data: ', error);
      setChartData([]);
    }
  }

  // [TEMPORARY] Function to manually update the data of the chart

  const handleDataUpdate = async currentInterval => {
    setLoading(true);
    setChartData([]);
    await fetchVixIndexData();
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
  // useEffect(() => {
  //   const intervalId = setInterval(() => fetchVixIndexData(), 8000);
  //   return () => clearInterval(intervalId);
  // }, [selectedInterval]);

  // Function to handle the X button interaction on the horizontal chart

  const handleBackInteraction = () => {
    if (isLandscape || isHorizontal) {
      handleScreenOrientationChange('PORTRAIT');
      navigation.canGoBack(false);
    }
  };

  // X-Axis domain for the chart
  // const [zoomDomain, setZoomDomain] = useState({
  //   x: [
  //     chartData[chartData?.length - candlesToShow]?.x,
  //     chartData[chartData.length - 1]?.x,
  //   ],
  // });

  // useEffect(() => {
  //   setZoomDomain({
  //     x: [
  //       chartData[chartData?.length - candlesToShow]?.x,
  //       chartData[chartData?.length - 1]?.x,
  //     ],
  //   });
  // }, [chartData, candlesToShow, selectedInterval]);

  // // Y-Axis domain for the chart

  // const lows = chartData?.map(d => d.low);
  // const highs = chartData?.map(d => d.high);
  // const low = Math.min(...lows);
  // const high = Math.max(...highs);

  // const domainY = useMemo(() => {
  //   if (chartData && chartData?.length > 0) {
  //     const priceRange = chartData?.slice(-candlesToShow).reduce(
  //       (acc, dataPoint) => {
  //         const {open, close, high, low} = dataPoint;
  //         return [
  //           Math.min(acc[0], open, close, high, low),
  //           Math.max(acc[1], open, close, high, low),
  //         ];
  //       },
  //       [Infinity, -Infinity],
  //     );

  //     let maxPrice = Math.max(priceRange[1], high);
  //     let minPrice = Math.min(priceRange[0], low);

  //     return [minPrice, maxPrice];
  //   }
  // }, [selectedInterval, chartData]);

  const domainY = () => {
    return chartData?.reduce(
      (acc, dataPoint) => {
        return [
          Math.min(acc[0], dataPoint.low),
          Math.max(acc[1], dataPoint.high),
        ];
      },
      [Infinity, -Infinity],
    );
  };

  const domainX = [
    chartData[chartData?.length - candlesToShow]?.x,
    chartData[chartData.length - 1]?.x,
  ];

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
            isLandscape && isHorizontal && {width: '100%', paddingTop: 0},
          ]}>
          <ScrollView style={{flex: 1}}>
            <View style={styles.backButtonWrapper}>
              <BackButton />
            </View>
            <Text style={styles.title}>VIX Index Chart</Text>
            <Text style={styles.sectionDescription}>
              This Index measures the volatility in the markets - it spikes up
              when sudden shocks happen and stays low when things are much
              calmer.
            </Text>
            <View style={styles.container}>
              <SkeletonLoader type="timeframe" quantity={2} />
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
        <ScrollView style={{flex: 1}}>
          <View style={styles.backButtonWrapper}>
            <BackButton />
          </View>
          <Text style={styles.title}>VIX Index Chart</Text>
          <Text style={styles.sectionDescription}>
            This Index measures the volatility in the markets - it spikes up
            when sudden shocks happen and stays low when things are much calmer.
          </Text>
          <View style={styles.container}>
            <View
              style={[
                styles.timeframeContainer,
                {marginTop: 8, marginBottom: 16},
              ]}>
              <TimeframeSelector
                selectedPairing={'null'}
                selectedInterval={selectedInterval}
                changeInterval={changeInterval}
                disabled={loading}
              />
              <TouchableOpacity
                onPress={() => handleDataUpdate(selectedInterval)}
                disabled={loading}>
                <Image
                  source={require('../../../assets/images/home/charts/chart-refresh.png')}
                  style={[styles.refreshButton, {top: 0, left: 20}]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.chart, {marginVertical: 8}]}>
              <ImageBackground
                source={require('../../../assets/images/chart_alpha_logo.png')}
                style={[styles.chartBackgroundImage, {top: 45}]}
                resizeMode="contain"
              />
              <LinearGradient
                useAngle
                angle={90}
                colors={
                  isDarkMode
                    ? ['rgba(22, 22, 22, 1)', 'transparent']
                    : ['rgba(232, 232, 232, 1)', 'transparent']
                }
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '10%',
                  bottom: 0,
                  width: 50,
                  zIndex: 1,
                }}
              />
              <VictoryChart
                width={isLandscape && isHorizontal ? 700 : 375}
                domain={{x: domainX, y: domainY()}}
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
                scale={{x: 'time', y: 'linear'}}
                height={300}
                containerComponent={<VictoryZoomContainer />}>
                <VictoryAxis
                  fixLabelOverlap
                  style={{
                    axis: {stroke: theme.chartsAxisColor, strokeWidth: 2.5},
                    tickLabels: {
                      fontSize: theme.responsiveFontSize * 0.7,
                      fill: theme.titleColor,
                      fontFamily: theme.font,
                    },
                    grid: {stroke: theme.chartsGridColor},
                  }}
                  tickCount={8}
                  tickFormat={t => {
                    const year = t.getFullYear();
                    const month = (t.getMonth() + 1)
                      .toString()
                      .padStart(2, '0');
                    const day = t.getDate().toString().padStart(2, '0');
                    const hour = t.getHours().toString().padStart(2, '0');
                    const minute = t.getMinutes().toString().padStart(2, '0');
                    return `${year}-${day}-${month}`;
                  }}
                />
                <VictoryAxis
                  dependentAxis
                  fixLabelOverlap
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
                        x: domainX[0],
                        y: (selectedCandle.open + selectedCandle.close) / 2,
                      },
                      {
                        x: domainX[1],
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

                <DataRenderer
                  domainX={domainX}
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
                  candleRatio={0.8}
                  candleColors={{positive: '#09C283', negative: '#E93334'}}
                  style={{
                    data: {
                      strokeWidth: 0.75,
                      stroke: datum =>
                        datum.close < datum.open ? '#09C283' : '#E93334',
                    },
                  }}
                />
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
                style={[
                  styles.chartsHorizontalButton,
                  {bottom: Platform.OS === 'android' ? 85 : 100},
                ]}
                resizeMode="contain"
                source={
                  isLandscape && isHorizontal
                    ? require('../../../assets/images/home/charts/deactivate-horizontal.png')
                    : require('../../../assets/images/home/charts/activate-horizontal.png')
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
                source={require('../../../assets/images/home/charts/back.png')}
              />
            </TouchableOpacity>
            <Image
              style={[
                styles.chartsZoomIndicator,
                {bottom: Platform.OS === 'android' ? 60 : 70},
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

export default VixChart;
