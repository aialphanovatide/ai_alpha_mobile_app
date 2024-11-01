import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../context/themeContext';

const useForgotPasswordStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      backgroundColor: theme.mainBackgroundColor,
    },
    root: {
      backgroundColor: theme.mainBackgroundColor,
      padding: 20,
      flexGrow: 1,
      backgroundColor: theme.mainBackgroundColor,
      justifyContent: 'center', // Centers vertically
      marginBottom: 100,
    },
    mainTitle: {
      fontSize: 25,
      fontFamily: theme.fontMedium,
      color: theme.titleColor,
      marginBottom: 30,
    },
    inputContainer: {
      alignSelf: 'stretch',
      marginBottom: 10,
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
      fontSize: 25,
      fontFamily: theme.fontMedium,
      color: theme.titleColor,
      marginTop: 20,
      marginBottom: 20,
    },
    tickImage: {
      width: 111,
      height: 92,
      marginBottom: 10,
    },
    greyText: {
      color: theme.discordGreyColor,
      fontSize: 13,
      fontFamily: theme.font,
      textAlign: 'center',
      marginTop: 10,
      marginLeft: 15,
      marginRight: 15,
    },
    successContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    successSubText: {
      fontSize: 15,
      fontFamily: theme.fontMedium,
      color: theme.signUpTitlesColor,
    },
    successSubTextBold: {
      fontSize: 15,
      fontFamily: theme.fontSemibold,
      color: theme.signUpTitlesColor,
      marginTop: 10,
    },
  });

  return styles;
};

export default useForgotPasswordStyles;
