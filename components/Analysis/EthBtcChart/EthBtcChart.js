import React, {useState, useEffect, useContext} from 'react';
import {View, ImageBackground, Text} from 'react-native';
import {VictoryChart, VictoryAxis, VictoryCandlestick} from 'victory-native';
import Loader from '../../Loader/Loader';
import axios from 'axios';
import BackButton from '../BackButton/BackButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import TimeframeSelector from '../../Home/Topmenu/subMenu/Fund_news_chart/Charts/chartTimeframes';
import useEthBtcStyles from './EthBtcChartStyles';
import {AppThemeContext} from '../../../context/themeContext';
import LinearGradient from 'react-native-linear-gradient';
import SkeletonLoader from '../../Loader/SkeletonLoader';

// This component generates a chart with ETH/BTC pairing data coming from the binance API

const EthBtcChart = ({candlesToShow = 30}) => {
  const styles = useEthBtcStyles();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInterval, setSelectedInterval] = useState('1D');
  const {isDarkMode, theme} = useContext(AppThemeContext);

  // Use Effect that gets the chart data from the Binance API, mapping it to the Victory Chart necessary format
  async function fetchChartData() {
    try {
      const response = await axios.get(
        'https://api3.binance.com/api/v3/klines',
        {
          params: {
            symbol: 'ETHBTC',
            interval: selectedInterval.toLowerCase(),
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
    const intervalId = setInterval(() => fetchChartData(), 3500);
    return () => clearInterval(intervalId);
  }, [selectedInterval]);

  // If the chart data is loading, then display a loader
  if (loading || chartData.length === 0) {
    return (
      <LinearGradient
        useAngle={true}
        angle={45}
        colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
        style={{flex: 1}}>
        <SafeAreaView style={styles.background}>
          <View style={styles.backButtonWrapper}>
            <BackButton />
          </View>
          <Text style={styles.analysisTitle}>ETH/BTC Chart</Text>
          <Text style={styles.sectionDescription}>
            The strength of ETH against BTC helps us understand how strong
            Ethereum and its ecosystem projects are while also telling us how
            strong the entire altcoin market is too.
          </Text>
          <View style={[styles.container, {width: '95%', marginHorizontal: 10}]}>
            <SkeletonLoader type="timeframe" quantity={4} />
            <SkeletonLoader
              type="chart"
              style={{marginVertical: 0, paddingTop: 24, paddingVertical: 16}}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
  // Function that generates the Y-Axis domain with the charts data
  const domainY = chartData.reduce(
    (acc, dataPoint) => [
      Math.min(acc[0], dataPoint.low),
      Math.max(acc[1], dataPoint.high),
    ],
    [Infinity, -Infinity],
  );
  // Function that generates the X-Axis domain with the charts data

  const domainX = [chartData[0].x, chartData[chartData.length - 1].x];

  // Function to change the time interval of the chart
  const changeInterval = async newInterval => {
    setLoading(true);
    try {
      setSelectedInterval(newInterval);
      setChartData([]);
    } catch (error) {
      console.error(`Failed to change interval: ${error}`);
    }
  };

  return (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
      style={{flex: 1}}>
      <SafeAreaView style={styles.background}>
        <View style={styles.backButtonWrapper}>
          <BackButton />
        </View>
        <Text style={styles.analysisTitle}>ETH/BTC Chart</Text>
        <Text style={styles.sectionDescription}>
          The strength of ETH against BTC helps us understand how strong
          Ethereum and its ecosystem projects are while also telling us how
          strong the entire altcoin market is too.
        </Text>
        <View style={styles.timeframeContainer}>
          <TimeframeSelector
            selectedInterval={selectedInterval}
            changeInterval={changeInterval}
            hasHourlyTimes={true}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.chart}>
            <ImageBackground
              source={require('../../../assets/images/chart_alpha_logo.png')}
              style={styles.chartBackgroundImage}
              resizeMode="contain"
            />
            <VictoryChart
              width={375}
              domain={{x: domainX, y: domainY}}
              padding={{top: 10, bottom: 40, left: 20, right: 70}}
              domainPadding={{x: 2.5, y: 3}}
              scale={{x: 'time', y: 'linear'}}
              height={300}>
              <VictoryAxis
                style={{
                  axis: {stroke: theme.chartsAxisColor, strokeWidth: 2.5},
                  tickLabels: {
                    fontSize: theme.responsiveFontSize * 0.7,
                    fill: theme.titleColor,
                    fontFamily: theme.font,
                  },
                  grid: {stroke: theme.chartsGridColor},
                }}
                tickCount={6}
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

              <VictoryCandlestick
                data={chartData}
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
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default EthBtcChart;
