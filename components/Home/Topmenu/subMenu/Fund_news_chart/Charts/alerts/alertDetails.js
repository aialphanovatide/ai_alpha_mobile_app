import React, {useContext} from 'react';
import {View, Text, Image} from 'react-native';
import {AppThemeContext} from '../../../../../../../context/themeContext';

// Component to render each Alert item details. It receives the message, date, price, timeframe, and styles as props. It returns a view with the alert details, including the coin symbol, the price, the timeframe, the message, and the date and hour of the alert.

const AlertDetails = ({
  message,
  date,
  price,
  timeframe,
  styles,
}) => {
  const {theme} = useContext(AppThemeContext);
  const timeframeStyle = {
    color: timeframe.toLowerCase().includes('bullish')
      ? theme.priceUpColor
      : theme.priceDownColor,
    marginTop: 4,
  };

  // Function to format the price number of the coin, adding commas and decimals to the number and returning it as a string

  const formatNumber = price => {
    const number = parseFloat(price);
    if (isNaN(number)) {
      return 'Invalid number';
    }
    return number.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Function to format the alert title, separating the coin symbol from the chart word and the interval word, and returning this data in the required format

  const formatAlertTitle = title => {
    const usdt_word_index = title.indexOf('USDT');
    const coin_word = title.slice(0, usdt_word_index).toUpperCase();
    const chart_word_index = title.indexOf('CHART');
    const chart_word = title.slice(chart_word_index, chart_word_index + 5);
    return {
      coin_title: `${coin_word}/USDT`,
      chart_word,
      interval_word: title.slice(chart_word_index - 3, chart_word_index),
    };
  };

  // Function to parse the timeframe string, separating the left text from the word, and returning this data in the required format

  const parseTimeframeString = timeFrameString => {
    const match = timeFrameString.match(
      /^(.*?)\s+(BULLISH|BEARISH|OVERBOUGHT|OVERSOLD|GOLDEN CROSS)$/i,
    );
    if (match) {
      const [_, leftText, word] = match;
      return {leftText, word};
    } else {
      console.error('Incorrect string pattern');
      return {leftText: 'Error', word: 'Error'};
    }
  };

  // Function to format the alerts date, generating the date from the created_at datum, separating the date from the hour, and returning this data in the required format

  const formatAlertDate = dateTimeString => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');

    return {
      alert_date: `${day}-${month}-${year}`,
      hour: ` ${hours}:${minutes}`,
    };
  };

  const {leftText, word} = parseTimeframeString(timeframe);

  const {coin_title, chart_word, interval_word} = formatAlertTitle(leftText);

  const {alert_date, hour} = formatAlertDate(date);

  return (
    <View style={styles.alertDetailsContainer}>
      <View style={styles.alertDetailsLeftContent}>
        <View style={styles.alertsRow}>
          <Text style={[styles.alertDetailsTitle]} numberOfLines={2}>
            {`${coin_title.toUpperCase()} ${
              interval_word.toUpperCase()[0] +
              interval_word.toLowerCase().slice(1)
            }${
              chart_word.toUpperCase()[0] + chart_word.toLowerCase().slice(1)
            }`}
          </Text>
          <View style={styles.alertsPriceAndWord}>
            <Text style={[styles.alertDetailsTitle, styles.price]}>
              ${formatNumber(price)}
            </Text>
            <Text style={[styles.alertDetailsTitle, timeframeStyle]}>
              {word.toUpperCase()[0] + word.toLowerCase().slice(1)}
            </Text>
          </View>
        </View>
        <Text style={styles.alertDetailsSubtitle} numberOfLines={2}>
          {message}
        </Text>
        <View style={[styles.dateRow, styles.alertsDateContainer]}>
          <View style={styles.flexRow}>
            <Image
              source={require('../../../../../../../assets/images/analysis/calendar-time.png')}
              resizeMode="contain"
              style={styles.dateIcon}
            />
            <Text style={styles.alertsSecondaryData}>{hour}</Text>
          </View>
          <View style={styles.flexRow}>
            <Image
              source={require('../../../../../../../assets/images/analysis/calendar.png')}
              resizeMode="contain"
              style={styles.dateIcon}
            />
            <Text style={styles.alertsSecondaryData}>{alert_date}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AlertDetails;
