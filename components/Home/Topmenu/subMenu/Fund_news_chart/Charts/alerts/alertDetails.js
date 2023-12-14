// AlertDetails.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AlertDetails = ({ activeAlertOption }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Text style={styles.title}>Alert Strategy</Text>
        <Text style={styles.subtitle}>Price Touch resistance 1</Text>
        <Text style={styles.text}>Last Price: 37.062.01</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.rightTitle}>BTCUSDT - 4h chart</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '95%',
    borderRadius: 2
  },
  leftContent: {
    flex: 1,
    paddingLeft: 10,
  },
  rightContent: {
    alignItems: 'flex-end',
    paddingRight: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },
  text: {
    fontSize: 14,
  },
  rightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AlertDetails;
