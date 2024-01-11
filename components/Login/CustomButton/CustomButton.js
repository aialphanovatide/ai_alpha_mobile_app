import React, {useState} from 'react';
import {View, Text, Pressable, Appearance} from 'react-native';
import GoogleLogo from './GoogleLogo';
import FacebookLogo from './FacebookLogo';
import useCustomButtonStyles from './CustomButtonStyles';

const CustomButton = ({onPress, text, type = 'PRIMARY', disabled}) => {
  const styles = useCustomButtonStyles();
  let logo = null;
  const colorScheme = Appearance.getColorScheme();

  if (type === 'GOOGLE') {
    logo = <GoogleLogo style={styles.logo} />;
  }
  if (type === 'FACEBOOK') {
    logo = <FacebookLogo style={styles.logo} />;
  }
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.container,
        styles[`container_${type}`],
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}>
      <View style={styles.buttonContent}>
        {logo}
        <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
      </View>
    </Pressable>
  );
};
export default CustomButton;
