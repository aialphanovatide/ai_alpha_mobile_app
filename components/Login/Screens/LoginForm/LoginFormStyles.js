import {StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {AppThemeContext} from '../../../../context/themeContext';

const useLoginFormStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    flex: {flex: 1},
    root: {
      alignItems: 'center',
      padding: 20,
    },
    background: {
      flex: 1,
    },
    scrollview: {
      backgroundColor: theme.mainBackgroundColor,
    },
    logo: {
      width: '55%',
      height: theme.height * 0.3,
      marginTop: 0,
    },
    labelContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    errorLabel: {
      color: theme.priceDownColor,
      fontSize: 12,
      marginLeft: 8,
    },
    inputContainer: {
      alignSelf: 'stretch',
      marginBottom: 10,
    },
    title: {
      color: theme.titleColor,
      textAlign: 'left',
      marginLeft: 0,
      fontFamily: theme.fontSemibold,
      fontSize: theme.responsiveFontSize,
    },
    signUpContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 5,
    },
    signUpText: {
      color: theme.secondaryTextColor,
      fontFamily: theme.font,
    },
    signUpButton: {
      color: theme.orange,
      fontFamily: theme.fontMedium,
    },
    termsContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 35,
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
  });
  return styles;
};

export default useLoginFormStyles;
