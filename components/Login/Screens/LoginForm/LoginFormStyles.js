import {StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {AppThemeContext} from '../../../../context/themeContext';

const useLoginFormStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: theme.mainBackgroundColor,
    },
    root: {
      alignItems: 'center',
      padding: 20,
    },
    scrollview: {
      backgroundColor: 'transparent',
    },
    logo: {
      width: '50%',
      height: theme.height * 0.3,
      marginTop: 10,
      marginBottom: 10,
      maxHeight: 120,
      maxWidth: 220,
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
      paddingHorizontal: 10,
      alignSelf: 'stretch',
      marginBottom: theme.boxesVerticalMargin,
    },
    title: {
      color: theme.titleColor,
      textAlign: 'left',
      marginLeft: 0,
      fontWeight: 'bold',
      fontSize: theme.responsiveFontSize,
    },
    signUpContainer: {
      flexDirection: 'row',
      marginTop: 4,
    },
    signUpText: {
      color: theme.textColor,
      fontWeight: 'bold',
      fontSize: theme.responsiveFontSize,
    },
    signUpButton: {
      color: theme.activeOrange,
      fontWeight: 'bold',
      fontSize: theme.responsiveFontSize,
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
  });
  return styles;
};

export default useLoginFormStyles;
