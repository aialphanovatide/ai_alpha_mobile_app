import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useCustomButtonStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      paddingVertical: 15,
      paddingHorizontal: 10,
      marginVertical: 5,
      borderRadius: 5,
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
      width: 150,
      marginBottom: 0,
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
      fontWeight: 'bold',
      fontSize: 15,
      color: theme.textColor
    },
    text_PRIMARY: {
      color: theme.textColor,
    },
    text_TERTIARY: {
      color: theme.orange,
    },
  });
  return styles;
};

export default useCustomButtonStyles;
