import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {VictoryChart, VictoryAxis, VictoryLine} from 'victory-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useTotal3Styles from './Total3ChartStyles';
import {AppThemeContext} from '../../../context/themeContext';
import LinearGradient from 'react-native-linear-gradient';
import {getService} from '../../../services/aiAlphaApi';
import BackButton from '../BackButton/BackButton';
import SkeletonLoader from '../../Loader/SkeletonLoader';
import {useScreenOrientation} from '../../../hooks/useScreenOrientation';
import {useNavigation} from '@react-navigation/core';
import UpgradeOverlay from '../../UpgradeOverlay/UpgradeOverlay';
import {RevenueCatContext} from '../../../context/RevenueCatContext';
import BackgroundGradient from '../../BackgroundGradient/BackgroundGradient';

const Total3Chart = ({candlesToShow = 30}) => {
  const styles = useTotal3Styles();
  const [chartData, setChartData] = useState([]);
  const {isDarkMode, theme} = useContext(AppThemeContext);
  const [loading, setLoading] = useState(true);
  const {isLandscape, isHorizontal, handleScreenOrientationChange} =
    useScreenOrientation();
  const navigation = useNavigation();
  const {subscribed} = useContext(RevenueCatContext);

  function formatDateArray(days, arrayLength) {
    // Get current date
    const today = new Date();

    // Format a date to the required format
    function formatDate(date) {
      const day = String(date.getDate()).padStart(2, '');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear().toString().slice(2, 4);
      return `${day}/${month}/${year}`;
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
      if (response.message) {
        const ohlcData = response.message;
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
    const intervalId = setInterval(() => fetchChartData(), 2000);
    return () => clearInterval(intervalId);
  }, []);

  // Function to handle the X button interaction on the horizontal chart

  const handleBackInteraction = () => {
    if (isLandscape || isHorizontal) {
      handleScreenOrientationChange('PORTRAIT');
      navigation.canGoBack(false);
    }
  };

  if (loading) {
    return (
      <LinearGradient
        useAngle={true}
        angle={45}
        colors={isDarkMode ? ['#0F0F0F', '#171717'] : ['#F5F5F5', '#E5E5E5']}
        locations={[0.22, 0.97]}
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
          <View style={[styles.container, {paddingHorizontal: 10}]}>
            <SkeletonLoader
              type="chart"
              style={{marginVertical: 0, paddingTop: 24, paddingVertical: 16}}
            />
          </View>
          {subscribed ? <></> : <UpgradeOverlay />}
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.background,
        isLandscape && isHorizontal && {width: '100%'},
      ]}>
      <BackgroundGradient />
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        bounces={false}>
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
            <LinearGradient
              useAngle
              angle={90}
              colors={
                isDarkMode
                  ? ['rgba(22, 22, 22, 1)', 'transparent']
                  : ['rgba(232, 232, 232, 1)', 'rgba(233 ,233 ,233 ,0)']
              }
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 40,
                height: '80%',
                marginTop: '5%',
                zIndex: 1,
              }}
            />
            <VictoryChart
              width={isLandscape && isHorizontal ? 700 : 375}
              domainPadding={{x: 10, y: 10}}>
              {/* X-Axis */}
              <VictoryAxis
                fixLabelOverlap
                style={{
                  axis: {stroke: theme.chartsAxisColor, strokeWidth: 2.5},
                  tickLabels: {
                    fontSize: theme.responsiveFontSize * 0.7,
                    fill: theme.titleColor,
                    fontFamily: theme.font,
                  },
                  grid: {stroke: theme.chartsGridColor},
                }}
                tickCount={isLandscape && isHorizontal ? 6 : 4}
                tickFormat={(t, index) =>
                  `${formatDateArray(t, chartData.length)}`
                }
              />
              {/* Y-Axis */}
              <VictoryAxis
                dependentAxis
                style={{
                  axis: {stroke: theme.chartsAxisColor},
                  tickLabels: {
                    fontSize: theme.responsiveFontSize * 0.55,
                    fill: theme.titleColor,
                    fontFamily: theme.font,
                    overflow: 'visible',
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
          {/* Horizontal view button [DEACTIVATED UNTIL SOLVING ISSUES] */}
          {/* <TouchableOpacity
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
                style={styles.chartsHorizontalButton}
                resizeMode="contain"
                source={
                  isLandscape && isHorizontal
                    ? require('../../../assets/images/home/charts/deactivate-horizontal.png')
                    : require('../../../assets/images/home/charts/activate-horizontal.png')
                }
              />
            </TouchableOpacity> */}
          {/* Horizontal view close button */}
          {/* <TouchableOpacity onPress={() => handleBackInteraction()}>
              <Image
                style={
                  isLandscape && isHorizontal
                    ? styles.chartBackButton
                    : {display: 'none'}
                }
                resizeMode="contain"
                source={require('../../../assets/images/home/charts/back.png')}
              />
            </TouchableOpacity> */}
          {/* Zoom interaction indicator */}
          <Image
            style={styles.chartsZoomIndicator}
            resizeMode="contain"
            source={require('../../../assets/images/home/charts/zoom-expand.png')}
          />
        </View>
      </ScrollView>
      {subscribed ? <></> : <UpgradeOverlay />}
    </SafeAreaView>
  );
};

export default Total3Chart;
