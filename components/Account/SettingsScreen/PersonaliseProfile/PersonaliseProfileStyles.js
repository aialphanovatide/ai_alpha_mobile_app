import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../context/themeContext';

const usePersonaliseProfileStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    root: {
      alignItems: 'center',
      backgroundColor: theme.mainBackgroundColor,
      padding: 10,
    },
    scrollview: {
      backgroundColor: theme.mainBackgroundColor,
      marginTop: 30,
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
      marginVertical: 24,
      marginBottom: 12,
      marginHorizontal: 22,
      color: theme.titleColor,
      fontSize: 25,
      fontFamily: theme.fontMedium,
    },
    inputContainer: {
      width: '100%',
    },
    title: {
      color: theme.textColor,
      textAlign: 'left',
      marginLeft: 15,
      fontFamily: theme.fontMedium,
      fontSize: 16,
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
    },
    imageContainer: {
      alignItems: 'center',
      marginBottom: 16,
    },
    userImage: {
      width: 92,
      height: 92,
      borderRadius: 46,
    },
    infoTitle: {
      color: theme.textColor,
      textAlign: 'left',
      marginLeft: 0,
      fontSize: 17,
      fontFamily: theme.fontSemibold,
    },
    infoText: {
      fontSize: 16,
      marginBottom: 10,
    },
    optionalLabel: {
      color: 'grey',
      fontSize: theme.responsiveFontSize * 0.75,
      marginLeft: 5,
      fontFamily: theme.font,
    },
    labelRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backgroundColor: {
      flex: 1,
      backgroundColor: theme.mainBackgroundColor,
    },
    resetPasswordContainer: {
      alignSelf: 'center',
      marginTop: 16,
    },
    sendMailButton: {
      color: '#FF6C0D',
      fontSize: 14,
      fontFamily: theme.font,
      textDecorationLine: 'underline',
      marginBottom: 80,
      alignSelf: 'flex-start',
    },
    dateContainer: {
      alignItems: 'left',
      backgroundColor: 'transparent',
      borderRadius: 5,
    },
    dateButton: {
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      justifyContent: 'center',
    },
    input: {
      fontSize: 16,
      color: '#000',
    },
    dateInput: {
      fontSize: 14,
      fontFamily: theme.font,
      color: theme.inputColor,
    },
    androidDateContainer: {
      width: '100%',
      paddingHorizontal: 12,
      marginTop: 5,
      marginBottom: 15,
      borderRadius: 5,
      backgroundColor: theme.loginInputBgColor,
    },
    backbuttonContainer: {
      marginHorizontal: 12,
    }
  });
  return styles;
};

export default usePersonaliseProfileStyles;
