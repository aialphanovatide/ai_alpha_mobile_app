import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../context/themeContext';

const useSignUpStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    root: {
      alignItems: 'center',
      backgroundColor: theme.mainBackgroundColor,
      padding: 20,
    },
    scrollview: {
      backgroundColor: theme.mainBackgroundColor,
    },
    logo: {
      height: theme.height * 0.3,
      margin: 0,
      padding: 0,
      width: '40%',
      maxHeight: 100,
      maxWidth: 200,
      marginBottom: 20,
    },
    mainTitle: {
      fontSize: theme.titleFontSize,
      fontFamily: theme.fontSemibold,
      color: theme.signUpTitlesColor,
      margin: 5,
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
      flexDirection: 'row',
      marginTop: 0,
      marginBottom: 10,
    },
    termsText: {
      color: theme.textColor,
      fontFamily: theme.font,
      fontSize: theme.responsiveFontSize * 0.75,
    },
    termsButton: {
      fontFamily: theme.fontMedium,
      color: theme.orange,
      fontSize: theme.responsiveFontSize * 0.75,
    },
    successContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.mainBackgroundColor,
    },
    successText: {
      fontSize: theme.titleFontSize,
      fontFamily: theme.fontSemibold,
      color: theme.signUpTitlesColor,
    },
    tickImage: {
      width: 120,
      height: 88,
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
  });
  return styles;
};

export default useSignUpStyles;
