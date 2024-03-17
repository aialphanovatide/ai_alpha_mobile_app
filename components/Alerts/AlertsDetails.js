import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {AppThemeContext} from '../../context/themeContext';
const AlertDetails = ({message, price, timeframe, styles}) => {
  const {theme} = useContext(AppThemeContext);
  const timeframeStyle = {
    color: timeframe.toLowerCase().includes('bullish')
      ? theme.priceUpColor
      : theme.priceDownColor,
  };

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

  const {leftText, word} = parseTimeframeString(timeframe);

  const {coin_title, chart_word, interval_word} = formatAlertTitle(leftText);

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
      </View>
    </View>
  );
};

export default AlertDetails;
