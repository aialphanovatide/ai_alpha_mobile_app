import React, {useState, useEffect, useContext} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {VictoryChart, VictoryAxis, VictoryCandlestick} from 'victory-native';
import Loader from '../../Loader/Loader';
import {SafeAreaView} from 'react-native-safe-area-context';
import useTotal3Styles from './Total3ChartStyles';
import {AppThemeContext} from '../../../context/themeContext';
import LinearGradient from 'react-native-linear-gradient';
import {getService} from '../../../services/aiAlphaApi';
import BackButton from '../BackButton/BackButton';

const Total3Chart = ({loading, candlesToShow = 30}) => {
  const styles = useTotal3Styles();
  const [chartData, setChartData] = useState([]);
  const {isDarkMode, theme} = useContext(AppThemeContext);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await getService('api/total_3_data');

        if (response.success) {
          // console.log(response.candlestick_data);
          const ohlcData = response.candlestick_data
            .slice(
              response.candlestick_data.length - 50,
              response.candlestick_data.length - 1,
            )
            .map(entry => ({
              x: new Date(entry.timestamp),
              open: parseFloat(entry.open),
              high: parseFloat(entry.high),
              low: parseFloat(entry.low),
              close: parseFloat(entry.close),
            }));
          setChartData(ohlcData);
        } else {
          setChartData([]);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchChartData();
  }, []);

  if (loading || chartData?.length === 0) {
    return (
      <LinearGradient
        useAngle={true}
        angle={45}
        colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
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
          <View style={styles.container}>
            <Loader />
          </View>
        </SafeAreaView>
      </LinearGradient>
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
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
      style={{flex: 1}}>
      <SafeAreaView style={styles.background}>
        <BackButton />
        <Text style={styles.title}>Total 3 Chart</Text>
        <Text style={styles.sectionDescription}>
          This chart aggregates the market value of all cryptocurrencies
          excluding Bitcoin and Ethereum. It provides an overview of the health
          and trends of the altcoin market and is essential for diversified
          investment strategies.
        </Text>
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
                tickCount={4}
              />
              <VictoryAxis
                dependentAxis
                style={{
                  axis: {stroke: theme.chartsAxisColor},
                  tickLabels: {
                    fontSize: theme.responsiveFontSize * 0.55,
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

export default Total3Chart;
