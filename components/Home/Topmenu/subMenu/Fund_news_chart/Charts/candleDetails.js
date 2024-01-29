import React from 'react';
import {View, Text} from 'react-native';

const CandlestickDetails = ({coin, lastPrice, styles}) => {
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.detailsSubContainer}>
        <Text style={styles.detailslabel}>{coin ? coin : '---'}</Text>
        <Text style={styles.lastPrice}>${lastPrice ? lastPrice : '---'}</Text>
      </View>
    </View>
  );
};

export default CandlestickDetails;
