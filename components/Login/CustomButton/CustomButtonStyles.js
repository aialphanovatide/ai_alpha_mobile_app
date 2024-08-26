import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useCustomButtonStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      paddingVertical: 11,
      paddingHorizontal: 10,
      marginVertical: 4,
      borderRadius: 4,
      alignItems: 'center',
    },
    pressed: {
      opacity: 0.75,
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    disabled: {
      opacity: 0.5,
    },
    container_PRIMARY: {
      backgroundColor: theme.orange,
      width: '100%',
      marginBottom: 15,
    },
    container_SECONDARY: {
      backgroundColor: theme.orange,
      width: 200,
    },
    container_TERTIARY: {
      width: 300,
    },
    container_GOOGLE: {
      width: 220,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.orange,
    },
    container_APPLE: {
      width: 220,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.orange,
    },
    text: {
      fontFamily: theme.fontSemibold,
      fontSize: 15,
      color: theme.signUpButtonText,
    },
    text_PRIMARY: {
      color: 'white',
      fontFamily: theme.fontMedium,
    },
    text_TERTIARY: {
      color: theme.orange,
      textDecorationLine: 'underline',
      fontSize: 14,
    },
    text_GOOGLE: {
      color: theme.textColor,
      fontFamily: theme.fontMedium,
    },
    text_APPLE: {
      color: theme.textColor,
      fontFamily: theme.fontMedium,
    },
  });
  return styles;
};

export default useCustomButtonStyles;
