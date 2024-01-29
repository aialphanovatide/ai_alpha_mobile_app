<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { View, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { VictoryChart, VictoryAxis, VictoryCandlestick } from 'victory-native';
import Loader from '../../Loader/Loader';
import axios from 'axios';
import BackButton from '../BackButton/BackButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import TimeframeSelector from '../../Home/Topmenu/subMenu/Fund_news_chart/Charts/chartTimeframes'; // Ajusta la ruta según la ubicación de tu componente

const EthBtcChart = ({ loading, candlesToShow = 30 }) => {
  const [chartData, setChartData] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState('1d');
=======
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
>>>>>>> f923d6e37d2cf50fbe583fe5fd48d0c1186a194d

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          'https://api3.binance.com/api/v3/klines',
          {
            params: {
              symbol: 'ETHBTC',
<<<<<<< HEAD
              interval: selectedInterval.toLowerCase(),
              limit: 45,
            },
          }
        );
        const data = response.data;
        const ohlcData = data.map((entry) => ({
=======
              interval: '1d',
              limit: 45,
            },
          },
        );
        const data = response.data;
        const ohlcData = data.map(entry => ({
>>>>>>> f923d6e37d2cf50fbe583fe5fd48d0c1186a194d
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
<<<<<<< HEAD
  
    fetchChartData();
  }, [selectedInterval]);
=======

    fetchChartData();
  }, []);
>>>>>>> f923d6e37d2cf50fbe583fe5fd48d0c1186a194d

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
<<<<<<< HEAD
    [Infinity, -Infinity]
  );

  const domainX = [chartData[0].x, chartData[chartData.length - 1].x];

  const changeInterval = (newInterval) => {
    setSelectedInterval(newInterval);
  };
=======
    [Infinity, -Infinity],
  );

  const domainX = [chartData[0].x, chartData[chartData.length - 1].x];
>>>>>>> f923d6e37d2cf50fbe583fe5fd48d0c1186a194d

  return (
    <>
      <SafeAreaView style={styles.background}>
        <BackButton />
        <Text style={styles.analysisTitle}>ETH/BTC Chart</Text>
<<<<<<< HEAD

        <TimeframeSelector
          selectedInterval={selectedInterval}
          changeInterval={changeInterval}
        />

=======
>>>>>>> f923d6e37d2cf50fbe583fe5fd48d0c1186a194d
        <View style={styles.container}>
          <View style={styles.chart}>
            <ImageBackground
              source={require('../../../assets/logo_3.png')}
<<<<<<< HEAD
              style={styles.backgroundImage}
            ></ImageBackground>

            <VictoryChart
              width={400}
              domain={{ x: domainX, y: domainY }}
              padding={{ top: 10, bottom: 60, left: 30, right: 60 }}
              domainPadding={{ x: 5, y: 3 }}
              scale={{ x: 'time', y: 'linear' }}
              height={300}
            >
              <VictoryAxis dependentAxis orientation="right" />
              <VictoryAxis />

              <VictoryCandlestick
                data={chartData}
                candleRatio={0.5}
                candleColors={{ positive: '#3ADF00', negative: '#FF477C' }}
=======
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
>>>>>>> f923d6e37d2cf50fbe583fe5fd48d0c1186a194d
              />
            </VictoryChart>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'top',
    alignItems: 'top',
    width: '100%',
    height: 500,
  },
  chart: {
    width: '100%',
    height: '100%',
    margin: '0%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  analysisTitle: {
    marginTop: '3%',
    marginLeft: '3%',
    fontSize: 16,
    fontWeight: 'bold', 
  },
  backgroundImage: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: 50,
    height: 50,
  },
  background: {
    flex: 1,
  },
});

export default EthBtcChart;
