import React, {useState, useEffect, useContext} from 'react';
import {View, ImageBackground, StyleSheet, Text} from 'react-native';
import moment from 'moment';
import {
  VictoryChart,
  VictoryAxis,
  VictoryCandlestick,
  VictoryLine,
  VictoryLabel,
} from 'victory-native';
import Loader from '../../Loader/Loader';
import axios from 'axios';
import BackButton from '../BackButton/BackButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import useEthBtcStyles from './EthBtcChartStyles';
import {AppThemeContext} from '../../../context/themeContext';

const EthBtcChart = ({loading, candlesToShow = 30}) => {
  const [chartData, setChartData] = useState([]);
  const styles = useEthBtcStyles();
  const {theme} = useContext(AppThemeContext);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          'https://api3.binance.com/api/v3/klines',
          {
            params: {
              symbol: 'ETHBTC',
              interval: '1d',
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
      }
    };

    fetchChartData();
  }, []);

  if (loading || chartData.length === 0) {
    return (
      <SafeAreaView style={styles.background}>
        <BackButton />
        <Text style={styles.analysisTitle}>ETH/BTC Chart</Text>
        <View style={styles.container}>
          <Loader />
        </View>
      </SafeAreaView>
    );
  }

  const domainY = chartData.reduce(
    (acc, dataPoint) => [
      Math.min(acc[0], dataPoint.low),
      Math.max(acc[1], dataPoint.high),
    ],
    [Infinity, -Infinity],
  );

  const domainX = [chartData[0].x, chartData[chartData.length - 1].x];

  return (
    <>
      <SafeAreaView style={styles.background}>
        <BackButton />
        <Text style={styles.analysisTitle}>ETH/BTC Chart</Text>
        <View style={styles.container}>
          <View style={styles.chart}>
            <ImageBackground
              source={require('../../../assets/logo_3.png')}
              style={styles.backgroundImage}></ImageBackground>

            <VictoryChart
              width={400}
              domain={{x: domainX, y: domainY}}
              padding={{top: 10, bottom: 60, left: 30, right: 60}}
              domainPadding={{x: 5, y: 3}}
              scale={{x: 'time', y: 'linear'}}
              height={300}>
              <VictoryAxis
                style={{
                  axis: {stroke: theme.chartsColor},
                  tickLabels: {
                    fontSize: theme.responsiveFontSize * 0.7,
                    fill: theme.titleColor,
                  },
                }}
              />
              <VictoryAxis
                dependentAxis
                style={{
                  axis: {stroke: theme.chartsColor},
                  tickLabels: {
                    fontSize: theme.responsiveFontSize * 0.825,
                    fill: theme.titleColor,
                  },
                }}
                orientation="right"
              />
              <VictoryCandlestick
                data={chartData}
                candleRatio={0.5}
                candleColors={{positive: '#3ADF00', negative: '#FF477C'}}
              />
            </VictoryChart>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default EthBtcChart;
