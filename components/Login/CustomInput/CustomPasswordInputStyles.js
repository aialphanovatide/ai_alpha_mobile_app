import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const CustomPasswordInputStyles = () => {
  const {theme} = useContext(AppThemeContext);

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      paddingHorizontal: 12,
      paddingVertical: 10,
      marginTop: 5,
      marginBottom: 15,
      borderRadius: 5,
      borderWidth: 0.3,
      borderColor: theme.textColor,
      backgroundColor: theme.loginInputBgColor,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      fontSize: theme.responsiveFontSize,
      fontFamily: theme.fontMedium,
      color: theme.inputColor,
    },
    eyeIconContainer: {
      padding: 2,
    },
  });

  return styles;
};

export default CustomPasswordInputStyles;
