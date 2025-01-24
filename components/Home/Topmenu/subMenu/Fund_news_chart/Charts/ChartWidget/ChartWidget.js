import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {getHTMLTestService} from '../../../../../../../services/aiAlphaApi';
import {AppThemeContext} from '../../../../../../../context/themeContext';
import SkeletonLoader from '../../../../../../Loader/SkeletonLoader';
import NoContentDisclaimer from '../../../../../../NoContentDisclaimer/NoContentDisclaimer';
import {useScreenOrientation} from '../../../../../../../hooks/useScreenOrientation';
import {useNavigation} from '@react-navigation/core';
import useChartWidgetStyles from './ChartWidgetStyles';

// Component that renders the chart widget, using the symbol, pair, active interval and the theme to get the correct data.

const ChartWidget = ({
  symbol,
  pair,
  activeInterval,
  handleOnZoom,
  activeButtons,
  loading,
  setLoading,
}) => {
  const styles = useChartWidgetStyles();
  const {theme, isDarkMode} = useContext(AppThemeContext);
  const [widgetData, setWidgetData] = useState([]);
  const {isLandscape, isHorizontal, handleScreenOrientationChange} =
    useScreenOrientation();
  const navigation = useNavigation();

  // Function to fetch the chart widget data from the backend, using the symbol, pair, active interval and theme to get the correct data.

  const fetchChartWidgetData = async activeSRButtons => {
    setLoading(true);
    try {
      const data = await getHTMLTestService(
        `chart/widget?symbol=${symbol.toUpperCase()}${pair}&interval=${activeInterval}&theme=${
          isDarkMode ? 'dark' : 'light'
        }&candle_width=16&text_price_font_size=32px&axis_font_size=24px&label_font_size=24px&title_font_size=24px&tooltip_font_size=36px&show_support_levels${
          activeSRButtons.includes('Support') ? 'true' : 'false'
        }&show_resistance_levels=${
          activeSRButtons.includes('Resistance') ? 'true' : 'false'
        }`,
      );
      setWidgetData(data);
    } catch (error) {
      console.error('Error trying to fetch the chart widget data: ', error);
    } finally {
      setLoading(false);
    }
  };

  // Hook to fetch the widget's data from the backend and set it to the state, retrieving the HTML content to be used in the WebView.
  useEffect(() => {
    fetchChartWidgetData(activeButtons);
  }, [symbol, pair, activeInterval, isDarkMode, activeButtons]);

  // Function to handle the back interaction when the user is in Horizontal mode
  const handleBackInteraction = () => {
    handleScreenOrientationChange(false);
    navigation.canGoBack(false);
  };

  return (
    <View
      style={[
        styles.container,
        isLandscape && isHorizontal ? {width: '100%', padding: 36} : {},
      ]}>
      {loading ? (
        <SkeletonLoader type="chart" style={{height: 300}} />
      ) : widgetData.length === 0 ? (
        <NoContentDisclaimer
          title={'Whoops, something went wrong.'}
          description={'Please try again in a little while.'}
          type="error"
          additionalStyles={{
            disclaimer: {marginVertical: '5%', paddingVertical: 16},
          }}
        />
      ) : (
        <>
          <WebView
            originWhitelist={['*']}
            source={{html: widgetData}}
            style={{flex: 1, marginBottom: -4}}
            nestedScrollEnabled={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            scalesPageToFit={true}
            onTouchStart={() => {
              handleOnZoom(false);
            }}
            onTouchEnd={() => {
              handleOnZoom(true);
            }}
          />
          <TouchableOpacity
            onPress={
              isLandscape
                ? () => {
                    handleBackInteraction();
                  }
                : () => {
                    navigation.canGoBack(false);
                    handleScreenOrientationChange(true);
                  }
            }>
            <Image
              style={styles.chartsHorizontalButton}
              source={
                isLandscape && isHorizontal
                  ? require('../../../../../../../assets/images/home/charts/deactivate-horizontal.png')
                  : require('../../../../../../../assets/images/home/charts/activate-horizontal.png')
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
              source={require('../../../../../../../assets/images/home/charts/back.png')}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ChartWidget;
