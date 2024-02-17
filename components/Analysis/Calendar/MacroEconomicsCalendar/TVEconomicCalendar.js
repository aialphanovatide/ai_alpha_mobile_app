import React, {useContext} from 'react';
import AutoHeightWebView from 'react-native-autoheight-webview';
import styles from './TVEconomicCalendarStyles.js';
import {AppThemeContext} from '../../../../context/themeContext.js';

const TVEconomicCalendar = ({width, height}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  const htmlContent = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>TV Economic Calendar</title>
            <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
        </head>
    <body>
        <div class="tradingview-widget-container__widget_economic_calendar" style={{"width": 400, "height": 600}}></div>
        <script type="text/javascript">
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = 'true';
            script.src= 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
            script.innerHTML = JSON.stringify({
              isTransparent: ${isDarkMode ? 'false' : 'true'},
              ${isDarkMode ? "colorTheme:'dark'," : ''}
                width: '90%',
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
