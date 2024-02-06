import React from 'react';
import {View, Text} from 'react-native';

const CandlestickDetails = ({coin, lastPrice, interval, styles}) => {
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
      <Text style={styles.lastPrice}>
        ${lastPrice ? lastPrice : ' ...'}
      </Text>
    </View>
  );
};

export default CandlestickDetails;
