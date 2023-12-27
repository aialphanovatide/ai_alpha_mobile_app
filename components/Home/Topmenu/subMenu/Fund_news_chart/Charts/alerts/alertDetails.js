import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AlertDetails = ({ message, price, timeframe }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Text style={styles.title}>{timeframe}</Text>
        <Text style={styles.subtitle}>{message}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.rightTitle}>{price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 2,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1, // Take up 100% of the width
  },
  leftContent: {
    flex: 1,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },
  rightTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AlertDetails;
