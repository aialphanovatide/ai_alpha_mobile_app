import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useSaveButtonStyles from './SaveButtonStyles';

const SaveButton = ({ onPress, text, type = 'PRIMARY', disabled }) => {
  const styles = useSaveButtonStyles();
  let logo = null;

  return (
    <TouchableOpacity
      onPress={() => {
        console.log("SaveButton pressed"); // Debug log
        onPress();
      }}
      disabled={disabled}
      style={[
        styles.container,
        disabled && styles.disabled,
      ]}
    >
      <View style={styles.buttonContent}>
        {logo}
        <Text style={[
          styles.text,
          disabled ? styles.textDisabled : styles.textEnabled
        ]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SaveButton;
