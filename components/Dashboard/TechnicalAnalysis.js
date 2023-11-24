import React from "react";
import { WebView } from "react-native-webview";

const TechnicalAnalysis = ({ currentSymbol, width, height, widgetId }) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>TradingView Technical Analysis</title>
        <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
      </head>
      <body>
        <div id="tradingview_technical_analysis_${widgetId}"></div>
        <script type="text/javascript">
          new TradingView.widget(${JSON.stringify({
            interval: "1D",
            width: width,
            height: height,
            symbol: currentSymbol,
            isTransparent: false,
            showIntervalTabs: true,
            locale: "en",
            colorTheme: "dark",
            overflow: "hidden",
            container_id: `tradingview_technical_analysis_${widgetId}`
          })});
        </script>
      </body>
    </html>
  `;

  return (
    <WebView style={{ backgroundColor: '#171717' }}
      source={{ html: htmlContent, originWhitelist: '[*]' }}
    />
  );
};

export default TechnicalAnalysis;
