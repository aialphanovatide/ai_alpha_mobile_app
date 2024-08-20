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
      width: 200,
      height: 165,
      marginTop: 84,
      marginBottom: 12,
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
      flexDirection: 'row',
      marginTop: 5,
    },
    signUpText: {
      color: theme.textColor,
      fontFamily: theme.font,
    },
    signUpButton: {
      color: theme.orange,
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
      fontSize: 10,
    },
    termsButton: {
      color: theme.orange,
      fontFamily: theme.fontMedium,
      fontSize: 10,
    },
  });
  return styles;
};

export default useLoginFormStyles;
