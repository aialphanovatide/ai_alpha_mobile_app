import React, {useState, useEffect, useContext} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {VictoryChart, VictoryAxis, VictoryLine} from 'victory-native';
import Loader from '../../Loader/Loader';
import {SafeAreaView} from 'react-native-safe-area-context';
import useTotal3Styles from './Total3ChartStyles';
import {AppThemeContext} from '../../../context/themeContext';
import LinearGradient from 'react-native-linear-gradient';
import {getService} from '../../../services/aiAlphaApi';
import BackButton from '../BackButton/BackButton';

const Total3Chart = ({candlesToShow = 30}) => {
  const styles = useTotal3Styles();
  const [chartData, setChartData] = useState([]);
  const {isDarkMode, theme} = useContext(AppThemeContext);
  const [loading, setLoading] = useState(true);

  function formatDateArray(days, arrayLength) {
    // Get current date
    const today = new Date();

    // Format a date to the required format
    function formatDate(date) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }

    // Map the received array to days by the index value

    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - (chartData.length - 1) + days);
    return formatDate(pastDate);
  }

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
  async function fetchChartData() {
    try {
      const response = await getService('api/total_3_data');
      if (response.data) {
        const ohlcData = response.data;
        setChartData(ohlcData);
      } else {
        setChartData([]);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => fetchChartData(), 3500);
    return () => clearInterval(intervalId);
  }, []);

  if (loading || chartData?.length === 0) {
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
            <VictoryChart width={375} domainPadding={{x: 10, y: 10}}>
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
                tickFormat={(t, index) =>
                  `${formatDateArray(t, chartData.length)}`
                }
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
                tickFormat={t => `$${formatNumber(t)}`}
              />
              <VictoryLine
                data={chartData.map((value, index) => ({x: index, y: value}))}
                style={{
                  data: {stroke: '#C43A31'},
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
