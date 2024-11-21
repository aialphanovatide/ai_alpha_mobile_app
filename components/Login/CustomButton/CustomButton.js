import React from 'react';
import {View, Text, Pressable} from 'react-native';
import GoogleLogo from './GoogleLogo';
import AppleLogo from './AppleLogo';
import useCustomButtonStyles from './CustomButtonStyles';

// Component to render a custom button with different styles based on the type, which can be 'PRIMARY', 'GOOGLE' or 'APPLE'.
const CustomButton = ({onPress, text, type = 'PRIMARY', disabled}) => {
  const styles = useCustomButtonStyles();
  let logo = null;

  if (type === 'GOOGLE') {
    logo = <GoogleLogo style={styles.logo} />;
  }
  if (type === 'APPLE') {
    logo = <AppleLogo style={styles.logo} />;
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
