// TickerTape.js

import React from 'react';
import {WebView} from 'react-native-webview';

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
    <WebView
      style={{flex: 1}}
      source={{html: htmlContent, originWhitelist: ['*']}}
    />
  );
};

export default TickerTape;
