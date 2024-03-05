import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useCustomInputStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      paddingHorizontal: 12,
      marginVertical: theme.boxesVerticalMargin,
      borderRadius: 2,
      backgroundColor: theme.loginInputBgColor,
    },
    input: {
      fontSize: theme.responsiveFontSize,
      color: theme.textColor,
    },
  });

  return styles;
};

export default useCustomInputStyles;
