import React from 'react';
import { View, StyleSheet } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';

const TickerTape = () => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>TradingView Ticker Tape</title>
        <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
      </head>
      <body>
        <div class="tradingview-widget-container__widget_ticker_tape"></div>
        <script type="text/javascript">
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.async = true;
          script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
          script.innerHTML = JSON.stringify({
            symbols: [
              {
                proName: 'FOREXCOM:SPXUSD',
                title: 'S&P 500',
              },
              {
                proName: 'FOREXCOM:NSXUSD',
                title: 'US 100',
              },
              {
                proName: 'FX_IDC:EURUSD',
                title: 'EUR to USD',
              },
              {
                proName: 'BITSTAMP:BTCUSD',
                title: 'Bitcoin',
              },
              {
                proName: 'BITSTAMP:ETHUSD',
                title: 'Ethereum',
              },
            ],
            showSymbolLogo: true,
            isTransparent: true,
            displayMode: 'adaptive',
            locale: 'en',
          });

          document.querySelector('.tradingview-widget-container__widget_ticker_tape').appendChild(script);
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <AutoHeightWebView
        style={styles.webview}
        source={{ html: htmlContent, baseUrl: '' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    width: 600,
  },
});

export default TickerTape;
