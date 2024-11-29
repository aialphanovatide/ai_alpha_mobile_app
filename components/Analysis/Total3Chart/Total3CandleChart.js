import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  VictoryCandlestick,
  VictoryZoomContainer,
} from 'victory-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/core';
import {useScreenOrientation} from '../../../hooks/useScreenOrientation';
import {RevenueCatContext} from '../../../context/RevenueCatContext';
import {getServiceV2, getTestService} from '../../../services/aiAlphaApi';
import BackButton from '../../BackButton/BackButton';
import SkeletonLoader from '../../Loader/SkeletonLoader';
import UpgradeOverlay from '../../UpgradeOverlay/UpgradeOverlay';
import BackgroundGradient from '../../BackgroundGradient/BackgroundGradient';
import ClickOnCandleDetails from '../../Home/Topmenu/subMenu/Fund_news_chart/Charts/clickOnCandleDetails';
import useTotal3Styles from './Total3ChartStyles';
import {AppThemeContext} from '../../../context/themeContext';

// Component that renders the Total 3 Candle Chart, which shows the market value of all cryptocurrencies excluding Bitcoin and Ethereum. It provides an overview of the health and trends of the altcoin market and is essential for diversified investment strategies. The chart is interactive and allows the user to zoom in and out, as well as to see the details of each candlestick when clicked.

const Total3CandleChart = ({candlesToShow = 25}) => {
  const styles = useTotal3Styles();
  const [chartData, setChartData] = useState([]);
  const {isDarkMode, theme} = useContext(AppThemeContext);
  const [loading, setLoading] = useState(true);
  const {isLandscape, isHorizontal, handleScreenOrientationChange} =
    useScreenOrientation();
  const navigation = useNavigation();
  const [selectedCandle, setSelectedCandle] = useState(null);
  const {subscribed} = useContext(RevenueCatContext);
  const [showGradient, setShowGradient] = useState(true);
  const [hasUpdatedZoomDomain, setHasUpdatedZoomDomain] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [hasRequestedData, setHasRequestedData] = useState(false);

  // Function to format the numbers in the chart
  const formatNumber = num => {
    const absNum = Math.abs(num);

    const abbrev = ['', 'k', 'm', 'b', 't'];
    const tier = Math.log10(absNum) / 3 || 0;

    if (tier === 0) return num;

    if (num <= 0.01) return num.toExponential();

    const divisor = Math.pow(1000, Math.round(tier - 1));
    const formattedNum = (num / divisor).toFixed(2);

    return formattedNum + abbrev[Math.round(tier - 1)];
  };

  // Function to fetch the chart data from the API, and map it to the chart data state variable to be used in the VictoryChart component

  async function fetchChartData() {
    try {
      const response = await getServiceV2(`/chart/total3?days=${100}`);
      if (response.data) {
        const mappedData = response?.data?.map(datum => {
          const hour_to_seconds = new Date(datum.date);
          return {
            x: hour_to_seconds.getTime(),
            high: datum.high,
            close: datum.close,
            low: datum.low,
            open: datum.open,
          };
        });
        setHasRequestedData(true);
        setChartData(mappedData.reverse());
      } else {
        setChartData([]);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  }

  // Hook effect to fetch the chart data when the component mounts, and every 30 seconds after that to keep the data updated
  useEffect(() => {
    if (!hasRequestedData) {
      fetchChartData();
    } else {
      const intervalId = setInterval(() => fetchChartData(), 30000);
      return () => clearInterval(intervalId);
    }
  }, [hasRequestedData]);

  // Function to handle the X button interaction on the horizontal chart

  const handleBackInteraction = () => {
    if (isLandscape && isHorizontal) {
      handleScreenOrientationChange(false);
      navigation.canGoBack(false);
    }
  };

  // Function to generate the Y-Domain for the charts

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
  }, [chartData]);

  // Function to trigger the time interval change of the charts, requesting again the data

  // const changeInterval = async newInterval => {
  //   setLoading(true);
  //   try {
  //     setSelectedInterval(newInterval);
  //     setChartData([]);
  //   } catch (error) {
  //     console.error('Failed to change interval: ${error}');
  //   }
  // };

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
    if (domainChange.x[0] < chartData[0].x) {
      setZoomDomain({
        x: [chartData[0].x, domainChange.x[1]],
        y: domainChange.y,
      });
    } else {
      if (domainChange.x[1] > chartData[chartData?.length - 1].x) {
        setZoomDomain({
          x: [domainChange.x[0], chartData[chartData?.length - 1].x],
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

  if (loading) {
    return (
      <LinearGradient
        useAngle={true}
        angle={45}
        colors={isDarkMode ? ['#0F0F0F', '#171717'] : ['#F5F5F5', '#E5E5E5']}
        locations={[0.22, 0.97]}
        style={{flex: 1}}>
        <SafeAreaView style={styles.background}>
          <BackButton />
          <Text style={styles.title}>Total 3 Chart</Text>
          <Text style={styles.sectionDescription}>
            This chart aggregates the market value of all cryptocurrencies
            excluding Bitcoin and Ethereum. It provides an overview of the
            health and trends of the altcoin market and is essential for
            diversified investment strategies.
          </Text>
          <View style={[styles.container, {paddingHorizontal: 10}]}>
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
    <SafeAreaView
      style={[
        styles.background,
        isLandscape && isHorizontal && {width: '100%'},
      ]}>
      <BackgroundGradient />
      <ScrollView
        scrollEnabled={scrollEnabled}
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <BackButton />
        <Text style={styles.title}>Total 3 Chart</Text>
        <Text style={styles.sectionDescription}>
          This chart aggregates the market value of all cryptocurrencies
          excluding Bitcoin and Ethereum. It provides an overview of the health
          and trends of the altcoin market and is essential for diversified
          investment strategies.
        </Text>
        {loading ? (
          <View style={[styles.container, {paddingHorizontal: 10}]}>
            <SkeletonLoader
              type="chart"
              style={{marginVertical: 0, paddingTop: 24, paddingVertical: 16}}
            />
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.chart}>
              <ImageBackground
                source={require('../../../assets/images/chart_alpha_logo.png')}
                style={styles.chartBackgroundImage}
                resizeMode="contain"
              />
              {showGradient && !selectedCandle && (
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
                    left: '4.25%',
                    top: '8.5%',
                    bottom: 0,
                    width: 40,
                    height: '72.5%',
                    zIndex: 1,
                  }}
                />
              )}
              <VictoryChart
                width={isLandscape && isHorizontal ? 700 : 380}
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
                  tickCount={!showGradient ? 3 : 6}
                  tickFormat={t => {
                    const year = t.getFullYear().toString().slice(2, 4);
                    const month = (t.getMonth() + 1)
                      .toString()
                      .padStart(2, '0');
                    const day = t.getDate().toString().padStart(2, '0');
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
                  tickCount={6}
                  tickFormat={t => `$${formatNumber(t)}`}
                />

                {/* HORIZONTAL LINE */}
                {selectedCandle && (
                  <VictoryLine
                    data={[
                      {
                        x: zoomDomain.x[-candlesToShow],
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
                <ClickOnCandleDetails
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
                  candleRatio={1.8}
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
            {/* Horizontal view button [DEACTIVATED UNTIL SOLVING ISSUES] */}
            <TouchableOpacity
              onPress={
                isLandscape
                  ? () => {
                      handleBackInteraction();
                    }
                  : () => {
                      navigation.canGoBack(false);
                      handleScreenOrientationChange(true);
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
            </TouchableOpacity>
            {/* Horizontal view close button */}
            <TouchableOpacity onPress={() => handleBackInteraction()}>
              <Image
                style={
                  isLandscape && isHorizontal
                    ? [
                        styles.chartBackButton,
                        isLandscape && isHorizontal && {right: '16.5%'},
                      ]
                    : {display: 'none'}
                }
                resizeMode="contain"
                source={require('../../../assets/images/home/charts/back.png')}
              />
            </TouchableOpacity>
            {/* Zoom interaction indicator */}
            <Image
              style={[
                styles.chartsZoomIndicator,
                isLandscape && isHorizontal && {right: '17.5%'},
              ]}
              resizeMode="contain"
              source={require('../../../assets/images/home/charts/zoom-expand.png')}
            />
          </View>
        )}
      </ScrollView>
      {subscribed ? <></> : <UpgradeOverlay />}
    </SafeAreaView>
  );
};

export default Total3CandleChart;
