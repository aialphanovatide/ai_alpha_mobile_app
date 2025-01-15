import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {
  getHTMLTestService,
} from '../../../../../../../services/aiAlphaApi';
import {AppThemeContext} from '../../../../../../../context/themeContext';
import SkeletonLoader from '../../../../../../Loader/SkeletonLoader';
import NoContentDisclaimer from '../../../../../../NoContentDisclaimer/NoContentDisclaimer';

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
  const {theme, isDarkMode} = useContext(AppThemeContext);
  const [widgetData, setWidgetData] = useState([]);

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

  return (
    <View style={styles.container}>
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 360,
    height: 340,
    marginRight: 16,
  },
});

export default ChartWidget;
