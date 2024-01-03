import React, {useContext} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import useTvChartStyles from './TvChartsStyles';
import {AppThemeContext} from '../../../context/themeContext';

const AdvancedTvChart = ({symbol, widgetId, width, height}) => {
  const styles = useTvChartStyles();
  const {isDarkMode} = useContext(AppThemeContext);
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>TradingView Widget</title>
        <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
      </head>
      <body>
      <div class="tradingview-widget-container" style="height:100%;width:100%">
      <div class="tradingview-widget-container__widget_${widgetId}" style="height:calc(100% - 32px);width:100%"></div>
        <script type="text/javascript" >
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = 'true';
        script.src= 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
        script.innerHTML = JSON.stringify({
              symbol: "${symbol}",
              width: ${width},
              height: ${height},
              locale: "en",
              interval: "60",
              theme: ${isDarkMode ? '"dark"' : '"light"'},
              autosize: true,
              backgroundColor: "rgba(255, 255, 255, 0)",
              upColor: "#22ab94",
              downColor: "#f7525f",
              enable_publishing: false,
          });
          document.querySelector(".tradingview-widget-container__widget_${widgetId}")
        .appendChild(script)
        </script>
      </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.container}>
      <AutoHeightWebView
        source={{html: htmlContent, originWhitelist: ['*']}}
        scalesPageToFit={false}
        viewportContent={'width=device-width, user-scalable=no'}
      />
    </SafeAreaView>
  );
};

export default AdvancedTvChart;
