import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AlertMenu = ({ activeAlertOption, setActiveButtons }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alerts</Text>
      <View style={styles.buttonContainer}>
        {['today', 'this week', 'last week'].map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => setActiveButtons(option)}
            style={[
              styles.button,
              activeAlertOption === option ? styles.activeButton : null,
            ]}
          >
            <Text style={activeAlertOption === option ? styles.activeText : styles.inactiveText}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
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
    marginHorizontal: 5,
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
