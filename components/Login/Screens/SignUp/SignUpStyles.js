import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../context/themeContext';

const useSignUpStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    root: {
      alignItems: 'center',
      backgroundColor: theme.mainBackgroundColor,
      paddingHorizontal: 20,
      paddingVertical: 0,
    },
    scrollview: {
      backgroundColor: theme.mainBackgroundColor,
    },
    logo: {
      height: theme.height * 0.3,
      margin: 0,
      padding: 0,
      width: '55%',
      marginBottom: 0,
    },
    mainTitle: {
      fontSize: theme.titleFontSize,
      fontFamily: theme.fontSemibold,
      color: theme.signUpTitlesColor,
      margin: 5,
    },
    inputContainer: {
      alignSelf: 'stretch',
      marginBottom: 17,
    },
    title: {
      color: theme.textColor,
      textAlign: 'left',
      marginLeft: 0,
      fontFamily: theme.fontSemibold,
    },
    loginContainer: {
      flexDirection: 'row',
      marginTop: 10,
    },
    loginText: {
      color: theme.textColor,
      fontFamily: theme.font,
    },
    loginButton: {
      color: theme.activeOrange,
      fontFamily: theme.fontMedium,
    },
    termsContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 0,
      marginBottom: 10,
    },
    termsText: {
      color: theme.secondaryTextColor,
      fontFamily: theme.font,
      fontSize: theme.responsiveFontSize * 0.75,
    },
    termsButton: {
      fontFamily: theme.fontMedium,
      color: theme.secondaryTextColor,
      fontSize: theme.responsiveFontSize * 0.80,
      textDecorationLine: 'underline',
    },
    successContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    successText: {
      fontSize: theme.titleFontSize * 1.5,
      fontFamily: theme.fontMedium,
      color: theme.signUpTitlesColor,
      marginTop: 20,
    },
    tickImage: {
      width: 120,
      height: 120,
      marginBottom: 10,
    },
    labelContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    errorLabel: {
      color: theme.priceDownColor,
      fontFamily: theme.fontMedium,
      fontSize: 12,
      marginLeft: 8,
    },
    loginContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 15,
      marginBottom: 20,
    },
    loginText: {
      color: theme.secondaryTextColor,
      fontFamily: theme.font,
    },
    loginButton: {
      color: theme.activeOrange,
      fontFamily: theme.fontMedium,
    },
  });
  return styles;
};

export default useSignUpStyles;
