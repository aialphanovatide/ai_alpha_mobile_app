import React, {useContext, useEffect, useState, useMemo} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  processColor,
  ImageBackground,
  Platform,
} from 'react-native';
import {CandleStickChart} from 'react-native-charts-wrapper';
import {AppThemeContext} from '../../../../../../../context/themeContext';
import {useScreenOrientation} from '../../../../../../../hooks/useScreenOrientation';
import {useNavigation} from '@react-navigation/core';
import {getService} from '../../../../../../../services/aiAlphaApi';
import SkeletonLoader from '../../../../../../Loader/SkeletonLoader';
import LinearGradient from 'react-native-linear-gradient';

// Function to adapt the chartData to the required react-native-charts-wrapper format

const mapChartDataFormat = chartsData => {
  return chartsData.map(candle => ({
    x: new Date(candle.x).getTime(),
    shadowH: candle.high,
    shadowL: candle.low,
    open: candle.open,
    close: candle.close,
    marker: `H: $${candle.high}\nO: $${candle.open}\nC: $${candle.close}\nL: $${
      candle.low
    }\nDate: ${new Date(candle.x).toLocaleString()}`,
  }));
};

const CWChart = ({
  symbol,
  chartData,
  loading,
  candlesToShow = 30,
  activeButtons,
  selectedInterval,
  coinBot,
  selectedPairing,
  setSupportResistanceLoading,
}) => {
  const {theme} = useContext(AppThemeContext);
  const [supportLevels, setSupportLevels] = useState([]);
  const [resistanceLevels, setResistanceLevels] = useState([]);
  const {isLandscape, isHorizontal, handleScreenOrientationChange} =
    useScreenOrientation();
  const navigation = useNavigation();
  const {isDarkMode} = useContext(AppThemeContext);
  const [selectedCandleColor, setSelectedCandleColor] = useState(null);
  const [showGradient, setShowGradient] = useState(true);
  const [zoomDomain, setZoomDomain] = useState({
    minX: mapChartDataFormat(chartData)[0]?.x,
    maxX: mapChartDataFormat(chartData)[chartData.length - 1]?.x,
  });

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

  const handleCandlePress = candleData => {
    const linesColor =
      candleData.close > candleData.open ? '#09C283' : '#E93334';
    setSelectedCandleColor(linesColor);
  };

  if (loading || chartData.length === 0) {
    return <SkeletonLoader type="chart" style={{height: 300}} />;
  }

  const chartWidth = Dimensions.get('window').width > 500 ? 860 : 390;
  const chartHeight = 340;

  return (
    <View style={styles.chartContainer}>
      <View style={[styles.chart, {width: '100%'}]}>
        <ImageBackground
          source={require('../../../../../../../assets/images/chart_alpha_logo.png')}
          style={styles.chartBackgroundImage}
          resizeMode="contain"
        />
        {showGradient && (
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
        )}

        <CandleStickChart
          style={{height: chartHeight, width: chartWidth}}
          // Candles data configuration
          data={{
            dataSets: [
              {
                values: chartData.map(candle => ({
                  x: new Date(candle.x).getTime(),
                  shadowH: candle.high,
                  shadowL: candle.low,
                  open: candle.open,
                  close: candle.close,
                  marker: `H: $${candle.high}\nO: $${candle.open}\nC: $${
                    candle.close
                  }\nL: $${candle.low}\nDate: ${new Date(
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
                  barSpace: 2,
                },
              },
            ],
          }}
          // X-Axis configuration
          xAxis={{
            position: 'BOTTOM',
            valueFormatter: 'date',
            valueFormatterPattern: 'dd/MM/yy',
            textColor: processColor(theme.titleColor),
            textSize: 10,
            gridColor: processColor(theme.chartsGridColor),
            gridLineWidth: 1,
            avoidFirstLastClipping: true,
            labelCount: 4,
            fontFamily: theme.font,
            axisLineColor: processColor(theme.chartsAxisColor),
            axisLineWidth: 2,
          }}
          // Y-Axis configuration
          yAxis={{
            left: {
              enabled: false,
            },
            right: {
              valueFormatter:
                chartData[chartData.length - 1].close > 2000
                  ? 'largeValue'
                  : '',
              textColor: processColor(theme.titleColor),
              textSize: 11,
              gridColor: processColor(theme.chartsGridColor),
              gridLineWidth: 1,
              granularityEnabled: true,
              granularity: 0.05,
              fontFamily: theme.font,
              axisLineColor: processColor(theme.chartsAxisColor),
              axisLineWidth: 2,
              // Support and resistance lines: configured as the react-native-charts-wrapper library allows
              limitLines:
                activeButtons.length === 2
                  ? [
                      ...supportLevels.map(support => {
                        return {
                          limit: support,
                          label: `   \n$ ${support}`,
                          lineColor: processColor('#D82A2B'),
                          lineWidth: 2,
                          valueTextColor: processColor('#D82A2B'),
                          valueFont: 12,
                          fontWeight: 'bold',
                          fontFamily: theme.fontMedium,
                          labelPosition: 'LEFT_TOP',
                          drawLimitLinesBehindData: true,
                        };
                      }),
                      ...resistanceLevels.map(resistance => {
                        return {
                          limit: resistance,
                          label: `   \n$ ${resistance}`,
                          lineColor: processColor('#2DDA99'),
                          lineWidth: 2,
                          valueTextColor: processColor('#2DDA99'),
                          valueFont: 12,
                          fontWeight: 'bold',
                          fontFamily: theme.fontMedium,
                          labelPosition: 'LEFT_TOP',
                          drawLimitLinesBehindData: true,
                        };
                      }),
                    ]
                  : activeButtons.some(button =>
                      button.toLowerCase().includes('support'),
                    )
                  ? supportLevels.map(support => {
                      return {
                        limit: support,
                        label: `   \n$ ${support}`,
                        lineColor: processColor('#D82A2B'),
                        lineWidth: 2,
                        valueTextColor: processColor('#D82A2B'),
                        valueFont: 12,
                        fontWeight: 'bold',
                        fontFamily: theme.fontMedium,
                        labelPosition: 'LEFT_TOP',
                        drawLimitLinesBehindData: true,
                      };
                    })
                  : activeButtons.some(button =>
                      button.toLowerCase().includes('resistance'),
                    )
                  ? resistanceLevels.map(resistance => {
                      return {
                        limit: resistance,
                        label: `   \n$ ${resistance}`,
                        lineColor: processColor('#2DDA99'),
                        lineWidth: 2,
                        valueTextColor: processColor('#2DDA99'),
                        valueFont: 12,
                        fontWeight: 'bold',
                        fontFamily: theme.fontMedium,
                        labelPosition: 'LEFT_TOP',
                        drawLimitLinesBehindData: true,
                      };
                    })
                  : [],
            },
          }}
          animation={{
            durationX: 100,
            durationY: 100,
            easingX: 'EaseInCubic',
            easingY: 'EaseInCubic',
          }}
          legend={{
            enabled: false,
          }}
          // Click-on-a-candle data configuration
          marker={{
            enabled: true,
            markerColor: processColor(theme.chartsGridColor),
            fontFamily: theme.font,
            markerFontSize: 12,
            textColor: processColor(theme.textColor),
          }}
          chartDescription={{text: ''}}
          // Functions that triggers when selecting a candle
          onSelect={event => {
            handleCandlePress(event.nativeEvent);
          }}
        />
        <Image
          style={styles.chartsZoomIndicator}
          resizeMode="contain"
          source={require('../../../../../../../assets/images/home/charts/zoom-expand.png')}
        />
      </View>
      {/* <TouchableOpacity
        style={styles.horizontalButtonContainer}
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
              ? require('../../../../../../../assets/images/home/charts/deactivate-horizontal.png')
              : require('../../../../../../../assets/images/home/charts/activate-horizontal.png')
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.horizontalCloseContainer}
        onPress={() => handleBackInteraction()}>
        <Image
          style={
            isLandscape && isHorizontal
              ? styles.chartBackButton
              : {display: 'none'}
          }
          resizeMode="contain"
          source={require('../../../../../../../assets/images/home/charts/back.png')}
        />
      </TouchableOpacity> */}
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
  horizontalButtonContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? '8%' : 100,
    left: Platform.OS === 'android' ? '10%' : 10,
  },
  horizontalCloseContainer: {
    position: 'absolute',
    top: '10%',
    right: '8%',
  },
  chartsHorizontalButton: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
    zIndex: 1,
  },
  chartBackButton: {
    width: 32,
    height: 32,
    tintColor: '#FFFFFF',
    zIndex: 1,
  },
  chartBackgroundImage: {
    width: 52,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '8.5%',
    left: '7.5%',
    opacity: 0.5,
    tintColor: '#A3A3A350',
  },
  chartsZoomIndicator: {
    width: 20,
    height: 24,
    position: 'absolute',
    bottom: '8%',
    right: '12%',
  },
});

export default CWChart;
