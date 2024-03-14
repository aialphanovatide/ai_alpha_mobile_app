import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {AppThemeContext} from '../../../../../../../context/themeContext';

const AlertDetails = ({message, price, timeframe, styles}) => {
  const {theme} = useContext(AppThemeContext);
  const timeframeStyle = {
    color: timeframe.toLowerCase().includes('bullish')
      ? theme.priceUpColor
      : theme.priceDownColor,
    marginHorizontal: 0,
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
      /^(.*?)\s+(BULLISH|BEARISH|OVERBOUGHT|OVERSOLD)$/i,
    );
    if (match) {
      const [_, leftText, word] = match;
      return {leftText, word};
    } else {
      console.error('Incorrect string pattern');
      return {leftText: 'Error', word: 'Error'};
    }
  };

  const {leftText, word} = parseTimeframeString(timeframe);

  const {coin_title, chart_word, interval_word} = formatAlertTitle(leftText);

  return (
    <View style={styles.alertDetailsContainer}>
      <View style={styles.alertDetailsLeftContent}>
        <View style={styles.alertsRow}>
          <Text style={styles.alertDetailsTitle} numberOfLines={2}>
            {coin_title}
          </Text>
          <Text style={styles.alertDetailsTitle}>{interval_word}</Text>
          <Text style={styles.alertDetailsTitle}>{chart_word} - </Text>
          <Text style={[styles.alertDetailsTitle, timeframeStyle]}>{word}</Text>
        </View>
        <Text style={styles.alertDetailsSubtitle} numberOfLines={2}>
          {message}
        </Text>
      </View>
      <View style={styles.alertDetailsRightContent}>
        <Text style={styles.alertDetailsRightTitle}>${price}</Text>
      </View>
    </View>
  );
};

export default AlertDetails;
