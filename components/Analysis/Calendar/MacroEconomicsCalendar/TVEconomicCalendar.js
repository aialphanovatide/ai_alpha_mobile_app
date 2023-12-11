import React from 'react';
import {View, ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview';
import styles from './TVEconomicCalendarStyles.js';

const TVEconomicCalendar = ({width, height}) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>TV Economic Calendar</title>
            <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
        </head>
    <body>
        <div class="tradingview-widget-container__widget_economic_calendar" style={{"height": 600px}}></div>
        <script type="text/javascript">
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = 'true';
            script.src= 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
            script.innerHTML = JSON.stringify({
                colorTheme: "light",
                isTransparent: false,
                width: ${width},
                height: ${height},
                locale: "en",
                importanceFilter: "0,1",
                "countryFilter": "us,ca,fr,eu,de,ru,it,gb,sa,za,tr,ar,br,mx,au,in,id,jp,kr,cn"
              });
              document.querySelector(".tradingview-widget-container__widget_economic_calendar")
            .appendChild(script)
            </script>
        </body>
    </html>`;

  return (
    <View style={styles.container}>
      {/*
        <ScrollView
          nestedScrollEnabled={true}
          style={styles.container}>*/}
      <AutoHeightWebView source={{html: htmlContent}} style={styles.widget} />
      {/* </ScrollView> */}
    </View>
  );
};

export default TVEconomicCalendar;
