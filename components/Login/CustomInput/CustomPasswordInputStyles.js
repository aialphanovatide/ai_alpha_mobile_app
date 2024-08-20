import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const CustomPasswordInputStyles = () => {
  const {theme} = useContext(AppThemeContext);

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      paddingHorizontal: 12,
      paddingVertical: 2,
      marginTop: 5,
      marginBottom: 15,
      borderRadius: 3,
      backgroundColor: theme.loginInputBgColor,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      fontSize: 14,
      fontFamily: theme.font,
      color: theme.inputColor,
    },
    eyeIconContainer: {
      padding: 2,
    },
  });

  return styles;
};

export default CustomPasswordInputStyles;
