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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    // borderColor: 'dark',
    // borderWidth: 1,
    paddingVertical: 10,
  },
  subContainer: {
    flexDirection: 'row',
    width: '90%',
  },
  label: {
    textTransform: 'uppercase',

    fontSize: 15,
    fontWeight: 'bold'
  },
  lastPrice: {
    textTransform: 'uppercase',
    fontSize: 15,
    marginLeft: 10,
    fontWeight: 'bold'
  },
});

export default CandlestickDetails;
