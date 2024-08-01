import React, {useContext, useEffect, useState, useMemo} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  processColor,
} from 'react-native';
import {CandleStickChart} from 'react-native-charts-wrapper';
import {AppThemeContext} from '../../../../../../../context/themeContext';
import {useScreenOrientation} from '../../../../../../../hooks/useScreenOrientation';
import {useNavigation} from '@react-navigation/core';
import {getService} from '../../../../../../../services/aiAlphaApi';
import SkeletonLoader from '../../../../../../Loader/SkeletonLoader';

const CWChart = ({
  symbol,
  chartData,
  loading,
  candlesToShow = 30,
  activeButtons,
  selectedInterval,
  coinBot,
  selectedPairing,
}) => {
  const {theme} = useContext(AppThemeContext);
  const [supportLevels, setSupportLevels] = useState([]);
  const [resistanceLevels, setResistanceLevels] = useState([]);
  const {isLandscape, isHorizontal, handleScreenOrientationChange} =
    useScreenOrientation();
  const navigation = useNavigation();
  const [supportResistanceLoading, setSupportResistanceLoading] =
    useState(false);
  const [selectedCandleColor, setSelectedCandleColor] = useState(null);

  useEffect(() => {
    if (
      coinBot &&
      activeButtons.length > 0 &&
      (supportLevels.length === 0 || resistanceLevels.length === 0)
    ) {
      getSupportAndResistanceData(coinBot, selectedInterval);
    }
  }, [coinBot, selectedInterval, activeButtons]);

  const getSupportAndResistanceData = async (coinBot, time_interval) => {
    try {
      const response = await getService(
        `/api/coin-support-resistance?coin_name=${coinBot}&temporality=${time_interval.toLowerCase()}&pair=${selectedPairing.toLowerCase()}`,
      );

      const supportValues = [];
      const resistanceValues = [];

      if (response.status === 200) {
        // Extract support and resistance values from the response
        const values = response.message;
        for (const key in values) {
          if (key.includes('support')) {
            supportValues.push(values[key]);
          } else if (key.includes('resistance')) {
            resistanceValues.push(values[key]);
          }
        }
        setSupportLevels(supportValues);
        setResistanceLevels(resistanceValues);
      } else {
        console.info('---response S&R----', response.message);
      }
    } catch (error) {
      console.error('Error fetching support and resistance data: ', error);
    } finally {
      setSupportResistanceLoading(false);
    }
  };

  // Function to handle the X button interaction on the horizontal chart

  const handleBackInteraction = () => {
    if (isLandscape || isHorizontal) {
      handleScreenOrientationChange('PORTRAIT');
      navigation.canGoBack(false);
    }
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}/${day} ${hours}:${minutes}`;
  };

  const processDataForChart = () => {
    return chartData.slice(-candlesToShow).map(data => ({
      shadowH: data.high,
      shadowL: data.low,
      open: data.open,
      close: data.close,
      date: formatDate(data.x),
    }));
  };

  const handleCandlePress = candleData => {
    const linesColor =
      candleData.close > candleData.open ? '#09C283' : '#E93334';
    setSelectedCandleColor(linesColor);
  };

  if (loading || chartData.length === 0) {
    return <SkeletonLoader type="chart" style={{height: 300}} />;
  }

  const chartWidth = Dimensions.get('window').width > 500 ? 860 : 400;
  const chartHeight = 340;

  return (
    <View style={styles.chartContainer}>
      <View style={[styles.chart, {width: '100%'}]}>
        <CandleStickChart
          style={{height: chartHeight, width: chartWidth}}
          data={{
            dataSets: [
              {
                values: chartData.map(candle => ({
                  x: new Date(candle.x).getTime(),
                  shadowH: candle.high,
                  shadowL: candle.low,
                  open: candle.open,
                  close: candle.close,
                  marker: `H: ${candle.high}\nO: ${candle.open}\nC: ${
                    candle.close
                  }\nL: ${candle.low}\nDate: ${new Date(
                    candle.x,
                  ).toLocaleString()}`,
                })),
                label: 'Candle Data',
                config: {
                  highlightColor: processColor(
                    selectedCandleColor !== null
                      ? selectedCandleColor
                      : theme.chartsGridColor,
                  ),
                  textEnabled: false,
                  drawValues: false, 
                  shadowWidth: 5,
                  shadowColorSameAsCandle: true,
                  increasingColor: processColor('#09C283'),
                  increasingPaintStyle: 'FILL',
                  decreasingColor: processColor('#E93334'),
                  decreasingPaintStyle: 'FILL',
                  barSpace: 0.05,
                },
              },
            ],
          }}
          // X-Axis configuration
          xAxis={{
            position: 'BOTTOM',
            valueFormatter: 'date',
            valueFormatterPattern: 'YY/MM/dd',
            textColor: processColor(theme.titleColor),
            textSize: 9.5,
            gridColor: processColor(theme.chartsGridColor),
            avoidFirstLastClipping: true,
            granularityEnabled: true,
            granularity: 1,
            labelCount: 5,
            fontFamily: theme.font,
          }}
          yAxis={{
            left: {
              enabled: false,
            },
            right: {
              valueFormatter: 'largeValue',
              textColor: processColor(theme.titleColor),
              textSize: 11,
              gridColor: processColor(theme.chartsGridColor),
              granularityEnabled: true,
              granularity: 1,
              fontFamily: theme.font,
            },
          }}
          legend={{
            enabled: false,
          }}
          marker={{
            enabled: true,
            markerColor: processColor(theme.chartsGridColor),
            markerFontSize: 12,
            textColor: processColor(theme.textColor),
          }}
          chartDescription={{text: ''}}
          onSelect={event => {
            handleCandlePress(event.nativeEvent);
          }}
        />
      </View>
      {/* <TouchableOpacity
        onPress={
          isLandscape
            ? () => {
                handleScreenOrientationChange('PORTRAIT');
                navigation.canGoBack(false);
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
              ? require('../../../../../../assets/images/home/charts/deactivate-horizontal.png')
              : require('../../../../../../assets/images/home/charts/activate-horizontal.png')
          }
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleBackInteraction()}>
        <Image
          style={
            isLandscape && isHorizontal
              ? styles.chartBackButton
              : {display: 'none'}
          }
          resizeMode="contain"
          source={require('../../../../../../assets/images/home/charts/back.png')}
        />
      </TouchableOpacity>
      <Image
        style={styles.chartsZoomIndicator}
        resizeMode="contain"
        source={require('../../../../../../assets/images/home/charts/zoom-expand.png')}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    height: 340,
    width: 340,
    marginRight: 20,
  },
  chartsHorizontalButton: {
    width: 50,
    height: 50,
  },
  chartBackButton: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 20,
    left: 20,
  },
  chartsZoomIndicator: {
    width: 30,
    height: 30,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default CWChart;
