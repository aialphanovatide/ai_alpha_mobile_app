import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TimeframeSelector = ({ selectedInterval, changeInterval }) => {

  const timeframes = ['1h', '4h', '1D', '1W'];

  return (
    <View style={styles.container}>
    <View style={styles.subContainer}>
      {timeframes.map((interval) => (
        <TouchableOpacity
          key={interval}
          style={selectedInterval === interval ? styles.activeButton : styles.button}
          onPress={() => changeInterval(interval)}
        >
          <Text style={selectedInterval === interval ? styles.activeButtonText : styles.buttonText}>
            {interval}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10
  },
  subContainer: {
    flexDirection: 'row',
    width: '90%',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    paddingVertical: 3,
  },
  activeButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 3,
    borderColor: 'gray',
    borderWidth: 1
  },
  buttonText: {
    color: 'white',
    textTransform: 'uppercase',
  },
  activeButtonText: {
    color: 'gray',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
});

export default TimeframeSelector;
