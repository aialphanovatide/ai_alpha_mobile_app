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
  VictoryLine,
  VictoryZoomContainer,
} from 'victory-native';
import useChartSectionStyles from '../ChartSection/ChartSectionStyles';
import SkeletonLoader from '../../Loader/SkeletonLoader';
import {useScreenOrientation} from '../../../hooks/useScreenOrientation';
import DataRenderer from '../../Home/Topmenu/subMenu/Fund_news_chart/Charts/clickOnCandleDetails';

const initialSessionData = {
  security_token: null,
  security_cst: null,
};

const UsOilChart = ({route, navigation}) => {
  const {title, symbol, description} = route.params;
  const styles = useChartSectionStyles();
  const {isDarkMode, theme} = useContext(AppThemeContext);
  const [selectedInterval, setSelectedInterval] = useState('1D');
  const [sessionData, setSessionData] = useState(initialSessionData);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {isLandscape, isHorizontal, handleScreenOrientationChange} =
    useScreenOrientation();
  const [selectedCandle, setSelectedCandle] = useState(null);

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

  // Function to fetch the data from Capital Com API, this requires a previous authentication with a security token an code, which are provided by a POST request to the Capital Com's auth API. This limites the number of updates to this chart, and that's the reason of the increasing of the update time in the setInterval effect.

  async function fetchCapitalComChartData(security_token, security_cst) {
    const adapted_interval =
      selectedInterval.toUpperCase() === '1D' ? 'DAY' : 'WEEK';
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
      setChartData([]);
    }
  }

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

  // Function to handle the X button interaction on the horizontal chart

  const handleBackInteraction = () => {
    if (isLandscape || isHorizontal) {
      handleScreenOrientationChange('PORTRAIT');
      navigation.canGoBack(false);
    }
  };

  // This chart was configured to update every 8s since the source is an external API which has limitation parameters in terms of requests per minute. The useEffect from below is executing these updates, loading the auth session tokens and after that making the request of the data itself.

  // useEffect(() => {
  //   const intervalId = setInterval(() => loadChartsData(), 2000);
  //   return () => clearInterval(intervalId);
  // }, [symbol, selectedInterval]);

  useEffect(() => {
    setLoading(true);
  }, [symbol, selectedInterval]);

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
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.sectionDescription}>{description}</Text>
            <View style={styles.container}>
              <SkeletonLoader type="timeframe" quantity={2} />
              <SkeletonLoader
                type="chart"
                style={{marginVertical: 0, paddingTop: 24, paddingVertical: 16}}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // [TEMPORARY] Function to manually update the data of the chart

  const handleDataUpdate = async currentInterval => {
    setLoading(true);
    setChartData([]);
    await fetchCapitalComChartData(
      sessionData.security_token,
      sessionData.security_cst,
    );
  };

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

  const domainX = [chartData[0]?.x, chartData[chartData.length - 1]?.x];

  const changeInterval = async newInterval => {
    setLoading(true);

    try {
      setSelectedInterval(newInterval);
      setChartData([]);
    } catch (error) {
      setLoading(false);
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

  // Extracting low and high values from candlestick data
  const lows = chartData.map(d => d.low);
  const highs = chartData.map(d => d.high);

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
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.sectionDescription}>{description}</Text>
          <View style={styles.timeframeContainer}>
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
                style={[styles.refreshButton, {top: 20, left: 20}]}
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
                domainPadding={{x: 5, y: 3}}
                scale={{x: 'time', y: 'linear'}}
                height={300}
                containerComponent={<VictoryZoomContainer />}>
                <VictoryAxis
                  fixLabelOverlap
                  style={{
                    axis: {stroke: theme.chartsAxisColor, strokeWidth: 2.5},
                    tickLabels: {
                      fontSize: theme.responsiveFontSize * 0.65,
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
                    return `${year}-${day}-${month}`;
                  }}
                />
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
                style={[styles.chartsHorizontalButton, {bottom: Platform.OS === 'android' ? 80 : 90,
                }]}
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
              style={styles.chartsZoomIndicator}
              resizeMode="contain"
              source={require('../../../assets/images/home/charts/zoom-expand.png')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default UsOilChart;
