import React from 'react';
import {View, StyleSheet} from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';

/* Every coin to add to the TickerTape should be obtained from https://www.tradingview.com/widget/ticker-tape/
- - - TODO - - -
  The 'coins' prop should be an array with all the coins to show, and should replace the large array on symbols, down in the component definition. These will be obtained from the ones that the user has suscribed and should have a json structure like this:
    {
      title: 'Coin name',
      proName: 'Source:Coin'
    }
    - On title goes the title that shows on the tickertape itself, it could be the coin name, or also include the currency which it is compared to.
    - On proName goes a string that should be obtained from TradingView page.

*/

const TickerTape = ({coins}) => {
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
                proName: "BITSTAMP:BTCUSD",
                title: "Bitcoin"
              },
              {
                proName: "BITSTAMP:ETHUSD",
                title: "Ethereum"
              },
              {
                proName: "BINANCE:ATOMUSD",
                title: "ATOM / USD",
              },
              {
                proName: "BINANCE:DOTUSD",
                title: "DOT / USD",
              },
              {
                proName: "BINANCE:QNTUSD",
                title: "QNT / USD",
              },
              {
                proName: "BINANCE:ADAUSD",
                title: "ADA / USD",
              },
              {
                proName: "BINANCE:SOLUSD",
                title: "SOL / USD",
              },
              {
                proName: "BINANCE:AVAXUSD",
                title: "AVAX / USD",
              },
              {
                proName: "BINANCE:NEARUSD",
                title: "NEAR/ USD",
              },
              {
                proName: "BINANCE:FTMUSD",
                title: "FTM / USD",
              },
              {
                proName: "CRYPTO:KASUSD",
                title: "KAS / USD",
              },
              {
                proName: "BINANCE:XLMUSD",
                title: "XLM / USD",
              },
              {
                proName: "BINANCE:ALGOUSD",
                title: "ALGO / USD",
              },
              {
                proName: "BINANCE:XRPUSD",
                title: "XRP / USD",
              },
              {
                proName: "BINANCE:LDOUSD",
                title: "LDO / USD",
              },
              {
                proName: "BINANCE:RPLUSD",
                title: "RPL / USD",
              },
              {
                proName: "BINANCE:FXSUSD",
                title: "FXS / USD",
              },
              {
                proName: "BINANCE:MATICUSD",
                title: "MATIC / USD",
              },
              {
                proName: "COINBASE:ARBUSD",
                title: "ARB / USD",
              },
              {
                "proName": "BINANCE:OPUSD",
                "title": "OP / USD",
              },
              {
                proName: "BINANCE:LINKUSD",
                title: "LINK / USD",
              },
              {
                proName: "BINANCE:API3USD",
                title: "API3 / USD",
              },
              {
                proName: "BINANCE:BANDUSD",
                title: "BAND / USD",
              },
              {
                proName: "BINANCE:DYDXUSD",
                title: "DYDX / USD",
              },
              {
                proName: "BINANCE:GMXUSD",
                title: "GMX / USD",
              },
              {
                proName: "CRYPTO:VELOUSD",
                title: "VELO / USD",
              },
              {
                proName: "BINANCE:UNIUSD",
                title: "UNI / USD",
              },
              {
                proName: "BINANCE:SUSHIUSD",
                title: "SUSHI / USD",
              },
              {
                proName: "BINANCE:CAKEUSD", 
                title: "CAKE / USD",
              },
              {
                proName: "BINANCE:AAVEUSD",
                title: "AAVE / USD",
              },
              {
                proName: "BINANCE:PENDLEUSD",
                title: "PENDLE / USD",
              },
              {
                proName: "BINANCE:1INCHUSD",
                title: "1INCH / USD",
              },
              {
                proName: "BINANCE:OCEANUSD",
                title: "OCEAN / USD",
              },
              {
                proName: "BINANCE:FETUSD",
                title: "FET / USD",
              },
              {
                proName: "BINANCE:RNDRUSD",
               title: "RNDR / USD",
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
    <View style={styles.container} pointerEvents={'none'}>
      <AutoHeightWebView
        style={styles.webview}
        source={{html: htmlContent, baseUrl: ''}}

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
