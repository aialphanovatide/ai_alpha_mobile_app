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
        <div class="tradingview-widget-container__widget_economic_calendar" style={{"width": 450, "height": 600}}></div>
        <script type="text/javascript">
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = 'true';
            script.src= 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
            script.innerHTML = JSON.stringify({
                colorTheme: "light",
                isTransparent: false,
                width: '100%',
                height: '100%',
                locale: "en",
                importanceFilter: "0,1",
                "countryFilter": "us,gb,in,jp,cn"
              });
              document.querySelector(".tradingview-widget-container__widget_economic_calendar")
            .appendChild(script)
            </script>
        </body>
    </html>`;

  return (
    <AutoHeightWebView source={{html: htmlContent}} scrollEnabled={true} />
  );
};

export default TVEconomicCalendar;
