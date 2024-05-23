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
import {
  VictoryAxis,
  VictoryCandlestick,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
} from 'victory-native';
import Loader from '../../Loader/Loader';
import {getService} from '../../../services/aiAlphaApi';
import ChartButtons from './ChartButtons';

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
  // S&R State variables
  const [activeButtons, setActiveButtons] = useState([]);
  const [supportLevels, setSupportLevels] = useState([]);
  const [resistanceLevels, setResistanceLevels] = useState([]);

  // Format number in shorten way
  function formatLabelNumber(number, decimalPlaces = 2) {
    if (number >= 1) {
      return number
        .toFixed(decimalPlaces)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return number;
    }
  }

  const getSupportAndResistanceData = async (coinBot, time_interval) => {
    try {
      const response = await getService(
        `/api/coin-support-resistance?coin_name=${coinBot}&temporality=${time_interval.toLowerCase()}&pair=usdt`,
      );

      const supportValues = [];
      const resistanceValues = [];

      if (response.success) {
        // Extract support and resistance values from the response
        const values = response.chart_values;
        for (const key in values) {
          if (key.includes('support')) {
            supportValues.push(values[key]);
          } else if (key.includes('resistance')) {
            resistanceValues.push(values[key]);
          }
        }
        setSupportLevels(supportValues);
        setResistanceLevels(resistanceValues);
      }
    } catch (error) {
      console.error('Error fetching support and resistance data: ', error);
    }
  };

  async function fetchCapitalComChartData(security_token, security_cst) {
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
      // console.log('Prices response: ', response?.prices);
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

  // This chart was configured to update every 30s since the source is an external API which has limitation parameters in terms of requests per minute.

  useEffect(() => {
    const intervalId = setInterval(() => loadChartsData(), 15000);
    return () => clearInterval(intervalId);
  }, [symbol, selectedInterval]);

  useEffect(() => {
    setLoading(true);
  }, [symbol, selectedInterval]);

  useEffect(() => {
    const coinBot = symbol === 'US500' ? 'sp500' : 'DXY';
    getSupportAndResistanceData(coinBot, selectedInterval);
  }, [symbol, selectedInterval]);

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
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.sectionDescription}>{description}</Text>
          <View style={styles.container}>
            <Loader />
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  const domainY = () => {
    if (
      activeButtons.length === 0 ||
      (activeButtons.length > 0 &&
        (supportLevels.length === 0 || resistanceLevels.length === 0))
    ) {
      return chartData?.reduce(
        (acc, dataPoint) => {
          return [
            Math.min(acc[0], dataPoint.low),
            Math.max(acc[1], dataPoint.high),
          ];
        },
        [Infinity, -Infinity],
      );
    } else {
      const levels = [];
      if (supportLevels.length > 0) {
        levels.push(...supportLevels);
      }
      if (resistanceLevels.length > 0) {
        levels.push(...resistanceLevels);
      }
      return [Math.min(...levels), Math.max(...levels)];
    }
  };

  const domainX = [chartData[0]?.x, chartData[chartData.length - 1]?.x];

  const changeInterval = async newInterval => {
    setSelectedInterval(newInterval);
    setLoading(true);

    try {
      setChartData([]);
      await fetchCapitalComChartData(s);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Failed to change interval: ${error}');
    }
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
          {(selectedInterval.toUpperCase() === '1W' ||
            selectedInterval.toUpperCase() === '1D') && (
            <ChartButtons
              activeButtons={activeButtons}
              setActiveButtons={setActiveButtons}
            />
          )}
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
              domain={{x: domainX, y: domainY()}}
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
              {/* RESISTANCE LEVELS */}
              {resistanceLevels &&
                activeButtons.includes('Resistance') &&
                resistanceLevels?.map((level, index) => (
                  <VictoryLine
                    data={[
                      {x: domainX[0], y: level},
                      {x: domainX[1], y: level},
                    ]}
                    key={`resistance-${index}`}
                    // styles for the line itself
                    style={{data: {stroke: '#F012A1', strokeWidth: 2}}}
                    labels={() => [`$${formatLabelNumber(level)} `]}
                    labelComponent={
                      <VictoryLabel
                        dy={5}
                        dx={10}
                        textAnchor="start"
                        inline={true}
                        style={{
                          fill: '#fff',
                          fontSize: 11,
                          fontFamily: theme.fontMedium,
                        }}
                        backgroundPadding={[
                          {top: -1, bottom: 6, left: 2.3, right: 0},
                        ]}
                        backgroundStyle={[
                          {
                            fill: '#F012A1',
                            opacity: 0.8,
                          },
                        ]}
                      />
                    }
                  />
                ))}

              {/* SUPPORT LEVELS */}
              {supportLevels &&
                activeButtons.includes('Support') &&
                supportLevels?.map((level, index) => (
                  <VictoryLine
                    data={[
                      {x: domainX[0], y: level},
                      {x: domainX[1], y: level},
                    ]}
                    key={`support-${index}`}
                    style={{
                      data: {stroke: '#C539B4', strokeWidth: 2},
                    }}
                    labels={() => [`$${formatLabelNumber(level)} `]}
                    labelComponent={
                      <VictoryLabel
                        dy={5}
                        dx={10}
                        textAnchor="start"
                        inline={true}
                        backgroundPadding={[
                          {top: -1, bottom: 6, left: 2.3, right: 0},
                        ]}
                        style={[
                          {
                            fill: '#F7F7F7',
                            fontSize: 11,
                            fontFamily: theme.fontMedium,
                          },
                        ]}
                        backgroundStyle={[
                          {
                            fill: '#C539B4',
                            opacity: 0.8,
                          },
                        ]}
                      />
                    }
                  />
                ))}
            </VictoryChart>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ChartSection;
