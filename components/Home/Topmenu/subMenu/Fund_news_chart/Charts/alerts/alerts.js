// AlertMenu.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AlertMenu = ({ activeAlertOption, setActiveButtons }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alerts</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setActiveButtons('Today')}
          style={[
            styles.button,
            activeAlertOption === 'Today' ? styles.activeButton : null,
          ]}
        >
          <Text style={activeAlertOption === 'Today' ? styles.activeText : styles.inactiveText}>
            Today
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveButtons('This Week')}
          style={[
            styles.button,
            activeAlertOption === 'This Week' ? styles.activeButton : null,
          ]}
        >
          <Text style={activeAlertOption === 'This Week' ? styles.activeText : styles.inactiveText}>
            This Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveButtons('Last Week')}
          style={[
            styles.button,
            activeAlertOption === 'Last Week' ? styles.activeButton : null,
          ]}
        >
          <Text style={activeAlertOption === 'Last Week' ? styles.activeText : styles.inactiveText}>
            Last Week
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginLeft: 10,
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 18,
    backgroundColor: 'gray',
  },
  activeButton: {
    backgroundColor: 'white',
  },
  activeText: {
    color: 'gray',
  },
  inactiveText: {
    color: 'white',
  },
});

export default AlertMenu;
