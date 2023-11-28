import React from 'react';
import {WebView} from 'react-native-webview';

const TradingViewChart = ({symbol, widgetId, width, height}) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>TradingView Chart</title>
        <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
      </head>
      <body>
        <div id="tradingview_chart_${widgetId}"></div>
        <script type="text/javascript">
          new TradingView.widget(${JSON.stringify({
            interval: '60',
            width: width,
            height: height,
            symbol: symbol,
            timezone: 'Etc/UTC',
            theme: 'light',
            style: '1',
            locale: 'en',
            enable_publishing: false,
            hide_side_toolbar: false,
            allow_symbol_change: true,
            container_id: `tradingview_chart_${widgetId}`,
          })});
        </script>
      </body>
    </html>
  `;

  return (
    <WebView
      style={{backgroundColor: '#EFEFEF'}}
      source={{html: htmlContent, originWhitelist: '[*]'}}
    />
  );
};

export default TradingViewChart;
