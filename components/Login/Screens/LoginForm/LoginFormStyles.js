import {StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {AppThemeContext} from '../../../../context/themeContext';

const useLoginFormStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    root: {
      alignItems: 'center',
      padding: 20,
    },
    scrollview: {
      backgroundColor: theme.mainBackgroundColor,
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
      alignSelf: 'stretch',
      marginBottom: 10,
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
      marginTop: 5,
    },
    signUpText: {
      color: theme.textColor,
    },
    signUpButton: {
      color: theme.activeOrange,
      fontWeight: 'bold',
    },
  });
  return styles;
};

export default useLoginFormStyles;
