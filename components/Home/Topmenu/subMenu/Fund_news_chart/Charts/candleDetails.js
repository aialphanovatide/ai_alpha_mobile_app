import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CandlestickDetails = ({ coin, lastPrice }) => {

  return (
    <View style={styles.container}>
    <View style={styles.subContainer}>
      <Text style={styles.label}>{coin? coin: '---' }</Text>
      <Text style={styles.lastPrice}>${lastPrice? lastPrice : '---'}</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  subContainer: {
    flexDirection: 'row',
    width: '90%',
  },
  label: {
    textTransform: 'uppercase',
    paddingVertical: 20,
    fontSize: 15,
    fontWeight: 'bold'
  },
  lastPrice: {
    textTransform: 'uppercase',
    paddingVertical: 20,
    paddingHorizontal: 10,
    fontSize: 15,
    fontWeight: 'bold'
  },
});

export default CandlestickDetails;
