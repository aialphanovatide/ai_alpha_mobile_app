import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const RsButton = ({ activeButtons, setActiveButtons }) => {

    
  const buttons = [
    { label: 'Resistance', color: '#F9B208' },
    { label: 'Support', color: '#FC5404' },
  ];


  const handlePress = (buttonLabel) => {
    const index = activeButtons.indexOf(buttonLabel);
    if (index !== -1) {
      // Button is already active, remove it
      setActiveButtons((prevActiveButtons) => prevActiveButtons.filter((label) => label !== buttonLabel));
    } else {
      // Button is not active, add it
      setActiveButtons((prevActiveButtons) => [...prevActiveButtons, buttonLabel]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              {
                backgroundColor: activeButtons.includes(button.label) ? button.color : 'white',
                borderColor: activeButtons.includes(button.label) ? 'transparent' : button.color,
              },
            ]}
            onPress={() => handlePress(button.label)}
          >
            <Text style={[styles.buttonText, { color: activeButtons.includes(button.label) ? 'white' : button.color }]}>
              {button.label}
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
      marginTop: 10,
    },
    subContainer: {
      flexDirection: 'row',
      width: '90%',
    },
    button: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderWidth: 1,
      borderRadius: 2,
      margin: 5,
    },
    buttonText: {
      textTransform: 'uppercase',
      fontSize: 12
    },
  });

export default RsButton;
