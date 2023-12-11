import React from 'react';
import {View} from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import styles from './TvChartsStyles';

const NewTvChart = ({width, height, symbol, widgetId}) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>TradingView Widget</title>
        <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
      </head>
      <body>
        <div id="tradingview-widget-container">
        <div class="tradingview-widget-container__widget_${widgetId}"></div></div>
        <script type="text/javascript" >
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = 'true';
        script.src= 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
        script.innerHTML = JSON.stringify({
            symbols: [
                [
                  "${symbol}|1D"
                ],
              ],
              chartOnly: false,
              width: ${width},
              height: ${height},
              locale: "en",
              colorTheme: "light",
              autosize: true,
              showVolume: false,
              showMA: false,
              hideDateRanges: false,
              hideMarketStatus: true,
              hideSymbolLogo: false,
              scalePosition: "left",
              scaleMode: "Normal",
              fontFamily: "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
              fontSize: "12",
              noTimeScale: false,
              valuesTracking: "1",
              changeMode: "price-and-percent",
              chartType: "candlesticks",
              maLineColor: "#2962FF",
              maLineWidth: 1,
              maLength: 9,
              fontColor: "rgba(19, 23, 34, 1)",
              backgroundColor: "rgba(255, 255, 255, 0)",
              lineType: 0,
              dateRanges: [
                "1d|1"
              ],
              dateFormat: "MM/dd/yyyy",
              upColor: "#22ab94",
              downColor: "#f7525f",
              borderUpColor: "#22ab94",
              borderDownColor: "#f7525f",
              wickUpColor: "#22ab94",
              wickDownColor: "#f7525f"
          });
          document.querySelector(".tradingview-widget-container__widget_${widgetId}")
        .appendChild(script)
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <AutoHeightWebView source={{html: htmlContent, originWhitelist: ['*']}} />
    </View>
  );
};

export default NewTvChart;