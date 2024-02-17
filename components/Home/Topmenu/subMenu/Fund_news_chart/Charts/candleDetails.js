import React from 'react';
import {View, Text} from 'react-native';

const CandlestickDetails = ({coin, lastPrice, interval, styles}) => {
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

  const formatCoin = coin => {
    const usdt_word_index = coin.indexOf('USDT');
    const coin_word = coin.slice(0, usdt_word_index).toUpperCase();
    return `${coin_word}/${coin.slice(usdt_word_index, coin.length)}`;
  };
  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.detailslabel}>
        {coin ? formatCoin(coin) : 'Loading ...'}
      </Text>
      <Text
        style={[
          styles.lastPrice,
          //  prevPrice !== undefined && lastPrice !== undefined
          //     ? lastPrice > prevPrice
          //       ? styles.priceUpColor
          //       : styles.priceDownColor
          //     : {},
        ]}>
        ${lastPrice ? formatNumber(lastPrice) : ' ...'}
      </Text>
    </View>
  );
};

export default CandlestickDetails;
