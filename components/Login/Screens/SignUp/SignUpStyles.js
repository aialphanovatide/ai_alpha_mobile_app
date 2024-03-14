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
      fontWeight: 'bold',
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
      fontWeight: 'bold',
    },
    loginContainer: {
      flexDirection: 'row',
      marginTop: 10,
    },
    loginText: {
      color: theme.textColor,
    },
    loginButton: {
      color: theme.activeOrange,
      fontWeight: 'bold',
    },
    termsContainer: {
      flexDirection: 'row',
      marginTop: 0,
      marginBottom: 10,
    },
    termsText: {
      color: theme.textColor,
      fontSize: 10,
    },
    termsButton: {
      color: theme.orange,
      fontSize: 10,
    },
    successContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.mainBackgroundColor,
    },
    successText: {
      fontSize: theme.titleFontSize,
      fontWeight: 'bold',
      color: theme.signUpTitlesColor,
    },
    tickImage: {
      width: 120,
      height: 88,
      marginBottom: 10,
    },
  });
  return styles;
};

export default useSignUpStyles;