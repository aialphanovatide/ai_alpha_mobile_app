import React, {useContext, useEffect, useState} from 'react';
import {ImageBackground, SafeAreaView, Text, View} from 'react-native';
import BackButton from '../BackButton/BackButton';
import AdvancedTvChart from '../Charts/AdvancedTvChart';
import useChartSectionStyles from './ChartSectionStyles';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../../context/themeContext';
import TimeframeSelector from '../../Home/Topmenu/subMenu/Fund_news_chart/Charts/chartTimeframes';
import {
  getCapitalComPrices,
  postCCSession,
} from '../../../services/CapitalComServices';
import {VictoryAxis, VictoryCandlestick, VictoryChart} from 'victory-native';
import Loader from '../../Loader/Loader';

const initialSessionData = {
  security_token: null,
  security_cst: null,
};

const ChartSection = ({route, navigation}) => {
  const {title, symbol, description} = route.params;
  const styles = useChartSectionStyles();
  const {isDarkMode, theme} = useContext(AppThemeContext);
  const [selectedInterval, setSelectedInterval] = useState('1h');
  const [sessionData, setSessionData] = useState(initialSessionData);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCapitalComChartData = async (security_token, security_cst) => {
    const adapted_interval =
      selectedInterval.toUpperCase() === '1H'
        ? 'HOUR'
        : selectedInterval.toUpperCase() === '4H'
        ? 'HOUR_4'
        : selectedInterval.toUpperCase() === '1D'
        ? 'DAY'
        : 'WEEK';
    try {
      const response = await getCapitalComPrices(
        symbol,
        adapted_interval,
        30,
        security_token,
        security_cst,
      );
      console.log('Prices response: ', response?.prices);
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
  };

  useEffect(() => {
    const loadChartsData = async () => {
      try {
        const response = await postCCSession();
        console.log('Session data: ', response);
        const {security_token, security_cst} = response;
        setSessionData({security_token, security_cst});

        fetchCapitalComChartData(security_token, security_cst);
      } catch (error) {
        console.error('Error creating the new session', error);
        setSessionData({security_token: null, security_cst: null});
      }
    };
    setLoading(true);
    loadChartsData();
  }, [symbol, selectedInterval]);

  if (loading || chartData?.length === 0) {
    return (
      <LinearGradient
        useAngle={true}
        angle={45}
        colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
        style={{flex: 1}}>
        <SafeAreaView style={styles.background}>
          <BackButton />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.sectionDescription}>{description}</Text>
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

  const domainX = [chartData[0]?.x, chartData[chartData.length - 1]?.x];

  const changeInterval = newInterval => {
    setSelectedInterval(newInterval);
  };

  return (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
      style={{flex: 1}}>
      <SafeAreaView style={styles.mainSection}>
        <BackButton />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.sectionDescription}>{description}</Text>
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
                tickCount={selectedInterval.toUpperCase() === '1W' ? 3 : 6}
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

export default ChartSection;
