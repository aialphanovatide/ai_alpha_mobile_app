import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../context/themeContext';

const useForgotPasswordStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: theme.mainBackgroundColor,
    },
    root: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.mainBackgroundColor,
      padding: 20,
    },
    mainTitle: {
      fontSize: theme.titleFontSize,
      fontFamily: theme.fontSemibold,
      color: theme.titleColor,
      margin: 40,
    },
    inputContainer: {
      alignSelf: 'stretch',
    },
    title: {
      color: theme.textColor,
      textAlign: 'left',
      marginLeft: 0,
      fontFamily: theme.fontSemibold,
    },
    loginContainer: {
      flexDirection: 'row',
      marginTop: 30,
    },
    loginText: {
      color: theme.textColor,
      fontFamily: theme.font,
    },
    loginButton: {
      color: theme.orange,
      fontFamily: theme.fontMedium,
    },
    successContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.mainBackgroundColor,
    },
    successText: {
      fontSize: theme.titleFontSize,
      fontFamily: theme.fontMedium,
      color: theme.titleColor,
    },
    tickImage: {
      width: 120,
      height: 88,
      marginBottom: 10,
    },
  });

  return styles;
};

export default useForgotPasswordStyles;
