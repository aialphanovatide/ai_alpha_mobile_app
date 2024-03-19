import React, {useState, useEffect, useContext} from 'react';
import {View, ImageBackground, StyleSheet, Text} from 'react-native';
import {VictoryChart, VictoryAxis, VictoryCandlestick} from 'victory-native';
import Loader from '../../Loader/Loader';
import axios from 'axios';
import BackButton from '../BackButton/BackButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import TimeframeSelector from '../../Home/Topmenu/subMenu/Fund_news_chart/Charts/chartTimeframes';
import useBtcDominanceStyles from './BtcDominanceStyles';
import {AppThemeContext} from '../../../context/themeContext';
import LinearGradient from 'react-native-linear-gradient';

const BtcDominanceChart = ({loading, candlesToShow = 30}) => {
  const [chartData, setChartData] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState('1D');
  const [loadingState, setLoading] = useState(true);
  const styles = useBtcDominanceStyles();
  const {isDarkMode, theme} = useContext(AppThemeContext);

  const fetchChartData = async (interval = selectedInterval) => {
    try {
      const response = await axios.get(
        'https://fapi.binance.com/fapi/v1/klines',
        {
          params: {
            symbol: 'BTCDOMUSDT',
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
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [selectedInterval]);

  const changeInterval = async newInterval => {
    setSelectedInterval(newInterval);
    setLoading(true);

    try {
      setChartData([]);
      await fetchChartData(newInterval);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Failed to change interval: ${error}');
    }
  };

  if (loading || chartData.length === 0) {
    return (
      <LinearGradient
        useAngle={true}
        angle={45}
        colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
        style={{flex: 1}}>
        <SafeAreaView style={styles.background}>
          <BackButton />
          <Text style={styles.analysisTitle}>BTC Dominance Chart</Text>
          <Text style={styles.sectionDescription}>
            Reflects the proportion of the total cryptocurrency market held by
            Bitcoin. It is a vital indicator for assessing the market's
            preference for BTC over other altcoins.
          </Text>
          <View style={styles.container}>
            <Loader />
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  const domainY = chartData.reduce(
    (acc, dataPoint) => [
      Math.min(
        acc[0],
        dataPoint.open,
        dataPoint.close,
        dataPoint.high,
        dataPoint.low,
      ),
      Math.max(
        acc[1],
        dataPoint.open,
        dataPoint.close,
        dataPoint.high,
        dataPoint.low,
      ),
    ],
    [Infinity, -Infinity],
  );

  const domainX = [chartData[0].x, chartData[chartData.length - 1].x];

  return (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
      style={{flex: 1}}>
      <SafeAreaView style={styles.background}>
        <BackButton />
        <Text style={styles.analysisTitle}>BTC Dominance Chart</Text>
        <Text style={styles.sectionDescription}>
          Reflects the proportion of the total cryptocurrency market held by
          Bitcoin. It is a vital indicator for assessing the market's preference
          for BTC over other altcoins.
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
            <VictoryChart
              width={400}
              domain={{x: domainX, y: domainY}}
              padding={{top: 10, bottom: 40, left: 20, right: 70}}
              domainPadding={{x: 5, y: 3}}
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
                tickCount={8}
                tickFormat={t => `$${t}`}
                orientation="right"
              />

              <VictoryCandlestick
                data={chartData}
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
              <ImageBackground
                source={require('../../../assets/images/chart_alpha_logo.png')}
                style={styles.chartBackgroundImage}
                resizeMode="contain"
              />
            </VictoryChart>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default BtcDominanceChart;
