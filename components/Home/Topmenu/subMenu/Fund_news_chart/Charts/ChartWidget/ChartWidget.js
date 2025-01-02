import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {
  getHTMLTestService,
  getService,
} from '../../../../../../../services/aiAlphaApi';
import {AppThemeContext} from '../../../../../../../context/themeContext';
import SkeletonLoader from '../../../../../../Loader/SkeletonLoader';
import NoContentDisclaimer from '../../../../../../NoContentDisclaimer/NoContentDisclaimer';

const INITIAL_SUPPORT_LEVELS = [5000, 6000, 7000, 8000];
const INITIAL_RESISTANCE_LEVELS = [4500, 6500, 9000, 10000];

// Component that renders the chart widget, using the symbol, pair, active interval and the theme to get the correct data.

const ChartWidget = ({
  symbol,
  pair,
  activeInterval,
  handleOnZoom,
  setSupportResistanceLoading,
  activeButtons,
}) => {
  const {theme, isDarkMode} = useContext(AppThemeContext);
  const [widgetData, setWidgetData] = useState([]);
  const [supportLevels, setSupportLevels] = useState(INITIAL_SUPPORT_LEVELS);
  const [resistanceLevels, setResistanceLevels] = useState(
    INITIAL_RESISTANCE_LEVELS,
  );
  const [loading, setLoading] = useState(true);

  // Function to fetch the chart widget data from the backend, using the symbol, pair, active interval and theme to get the correct data.

  const fetchChartWidgetData = async () => {
    setLoading(true);
    try {
      const data = await getHTMLTestService(
        `chart/widget?symbol=${symbol.toUpperCase()}${pair}&interval=${activeInterval}&theme=${
          isDarkMode ? 'dark' : 'light'
        }&text_price_font_size=32px&axis_font_size=22px&label_font_size=24px&title_font_size=24px&axis_line_color=${
          isDarkMode ? 'rgb(115,115,115)' : 'rgb(56,56,56)'
        }&grid_color=${isDarkMode ? 'rgb(212,212,212)' : 'rgb(56,56,56)'}`,
        // &resistance_levels=${resistanceLevels}&support_levels=${supportLevels}`,
      );
      console.log('Requested data: ', data);
      setWidgetData(data);
    } catch (error) {
      console.error('Error trying to fetch the chart widget data: ', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch support and resistance data from the API
  const getSupportAndResistanceData = async (coinBot, time_interval) => {
    try {
      const response = await getService(
        `/api/coin-support-resistance?coin_name=${coinBot}&temporality=${time_interval.toLowerCase()}&pair=${pair.toLowerCase()}`,
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

  // Hook to fetch the widget's data from the backend and set it to the state, retrieving the HTML content to be used in the WebView.

  //  useEffect(() => {
  //    getSupportAndResistanceData(symbol, activeInterval);
  //  }, [symbol, activeInterval, pair]);

  useEffect(() => {
    fetchChartWidgetData();
  }, [symbol, pair, activeInterval, isDarkMode]);

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
          allowsFullscreenVideo={true}
          allowsInlineMediaPlayback={true}
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
