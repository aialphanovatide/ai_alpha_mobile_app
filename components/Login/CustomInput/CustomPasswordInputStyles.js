import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const CustomPasswordInputStyles = () => {
  const {theme} = useContext(AppThemeContext);

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      paddingHorizontal: 12,
      marginVertical: theme.boxesVerticalMargin,
      borderRadius: 2,
      backgroundColor: theme.loginInputBgColor,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      fontSize: theme.responsiveFontSize,
      color: theme.textColor,
    },
    eyeIconContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
    },
    eyeImage: {
      width: 22,
      height: 22,
      tintColor: theme.textColor,
    },
  });

  return styles;
};

export default CustomPasswordInputStyles;
