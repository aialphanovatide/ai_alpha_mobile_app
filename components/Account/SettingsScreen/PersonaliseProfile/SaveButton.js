import React from 'react';
import { View, Text, Pressable, Appearance } from 'react-native';

import useSaveButtonStyles from './SaveButtonStyles';

const SaveButton = ({ onPress, text, type = 'PRIMARY', disabled }) => {
  const styles = useSaveButtonStyles();
  let logo = null; // assuming logo setup or modification might occur here

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.container,
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}>
      <View style={styles.buttonContent}>
        {logo}
        <Text style={[
          styles.text,
          disabled ? styles.textDisabled : styles.textEnabled
        ]}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

export default SaveButton;
