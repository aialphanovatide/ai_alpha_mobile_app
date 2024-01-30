import React, { useState, useEffect } from 'react';
import { View, ImageBackground, StyleSheet, Text } from 'react-native';
import { VictoryChart, VictoryAxis, VictoryCandlestick } from 'victory-native';
import Loader from '../../Loader/Loader';
import axios from 'axios';
import BackButton from '../BackButton/BackButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import TimeframeSelector from '../../Home/Topmenu/subMenu/Fund_news_chart/Charts/chartTimeframes';

const BtcDominanceChart = ({ loading, candlesToShow = 30 }) => {
  const [chartData, setChartData] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState('1D');
  const [loadingState, setLoading] = useState(true);

  const fetchChartData = async (interval = selectedInterval) => {
    try {
      const response = await axios.get(
        'https://fapi.binance.com/fapi/v1/klines',
        {
          params: {
            symbol: 'BTCDOMUSDT',
            interval: interval.toLowerCase(), // Utiliza la nueva temporalidad
            limit: 45,
          },
        }
      );
      const data = response.data;
      const ohlcData = data.map((entry) => ({
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
  
  const changeInterval = async (newInterval) => {
    setSelectedInterval(newInterval);
    setLoading(true);
  
    try {
      setChartData([]);
      await fetchChartData(newInterval);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Failed to change interval: ${error}");
    }
  };

  if (loading || chartData.length === 0) {
    return (
      <SafeAreaView style={styles.background}>
        <BackButton />
        <View style={styles.container}>
          <Loader />
        </View>
      </SafeAreaView>
    );
  }

  const domainY = chartData.reduce(
    (acc, dataPoint) => [
      Math.min(acc[0], dataPoint.open, dataPoint.close, dataPoint.high, dataPoint.low),
      Math.max(acc[1], dataPoint.open, dataPoint.close, dataPoint.high, dataPoint.low),
    ],
    [Infinity, -Infinity]
  );

  const domainX = [chartData[0].x, chartData[chartData.length - 1].x];

  return (
    <SafeAreaView style={styles.background}>
      <BackButton />
      <Text style={styles.analysisTitle}>BTC Dominance Chart</Text>
      <TimeframeSelector
        selectedInterval={selectedInterval}
        changeInterval={changeInterval}
      />
      <View style={styles.container}>
        <View style={styles.chart}>
          <ImageBackground
            source={require('../../../assets/logo_3.png')}
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
            />
          </VictoryChart>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'top',
    alignItems: 'top',
    width: '100%',
    height: 300,
  },
  chart: {
    marginTop: '15%',
    width: '100%',
    height: '90%',
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

export default BtcDominanceChart;