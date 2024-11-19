import React, {useContext} from 'react';
import {Image, Text, View} from 'react-native';
import {AppThemeContext} from '../../context/themeContext';

// Component that renders the Alert item itself, with all the data: the price and main alert word on the top-right corner, the title, and the message of the alert below.

const AlertDetails = ({message, price, timeframe, styles, created_at}) => {
  const {theme} = useContext(AppThemeContext);
  const timeframeStyle = {
    color: timeframe.toLowerCase().includes('bullish')
      ? theme.priceUpColor
      : theme.priceDownColor,
  };
  // Function to separate and format the property that will show as a title for each alert, it separates the currency, the "Chart" word, and the hour
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

  // Function that separates the main alert word from the rest of the alert title, since they come in the same prop data from the backend.
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

  // Function to format the alert pricing, adding the punctuation symbols before the decimals.
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

  // Function to format the alerts date, generating the date from the created_at datum, separating the date from the hour, and returning this data in the required format

  const formatAlertDate = dateTimeString => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');

    return {date: `${day}-${month}-${year}`, hour: ` ${hours}:${minutes}`};
  };

  const {leftText, word} = parseTimeframeString(timeframe);

  const {coin_title, chart_word, interval_word} = formatAlertTitle(leftText);
  const {date, hour} = formatAlertDate(created_at);
  return (
    <View style={styles.itemsContainer}>
      <View style={styles.leftContent}>
        <View style={styles.row}>
          <Text style={styles.itemsTitle}>{`${coin_title.toUpperCase()} ${
            interval_word.toUpperCase()[0] +
            interval_word.toLowerCase().slice(1)
          } ${
            chart_word.toUpperCase()[0] + chart_word.toLowerCase().slice(1)
          }`}</Text>
          <View style={styles.priceAndStateWord}>
            <Text
              style={[
                styles.itemsTitle,
                styles.price,
                styles.noHorizontalMargin,
              ]}>
              ${formatNumber(price)}
            </Text>
            <Text
              style={{
                ...styles.itemsTitle,
                ...timeframeStyle,
                ...styles.noHorizontalMargin,
              }}>
              {`${word.toUpperCase()[0] + word.toLowerCase().slice(1)}`}
            </Text>
          </View>
        </View>
        <Text style={styles.subtitle} numberOfLines={2}>
          {message}
        </Text>
        <View style={[styles.row, styles.dateContainer]}>
          <View style={styles.row}>
            <Image
              source={require('../../assets/images/analysis/calendar-time.png')}
              resizeMode="contain"
              style={styles.dateIcon}
            />
            <Text style={styles.secondaryData}>{hour}</Text>
          </View>
          <View style={styles.row}>
            <Image
              source={require('../../assets/images/analysis/calendar.png')}
              resizeMode="contain"
              style={styles.dateIcon}
            />
            <Text style={styles.secondaryData}>{date}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AlertDetails;
