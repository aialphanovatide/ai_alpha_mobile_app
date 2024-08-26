import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useCustomInputStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      paddingHorizontal: 12,
      paddingVertical: 2,
      marginTop: 5,
      marginBottom: 1,
      borderRadius: 5,
      borderWidth: 0.3,
      borderColor: 'transparent',
      backgroundColor: theme.loginInputBgColor,
    },
    dateInput: {
      fontSize: 14,
      fontFamily: theme.font,
      color: theme.inputColor,
    },
  });

  return styles;
};

export default useCustomInputStyles;