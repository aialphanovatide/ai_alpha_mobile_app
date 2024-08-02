import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../context/themeContext';

const usePersonaliseProfileStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    root: {
      alignItems: 'center',
      backgroundColor: theme.mainBackgroundColor,
      padding: 20,
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
      marginVertical: '5%',
      marginLeft: '6%',
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
      fontFamily: theme.fontSemibold,
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
    },
    imageContainer: {
        alignItems: 'center',
    },
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    infoTitle:{
        color: theme.textColor,
        textAlign: 'left',
        marginLeft: 0,
        fontSize: 17,
        fontFamily: theme.fontSemibold,
    },
    infoText:{
        fontSize:16,
        marginBottom:10,
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
      marginTop: 20,
    },
    sendMailButton: {
      color: '#FF6C0D',
      fontSize: theme.responsiveFontSize * 0.85,
      textDecorationLine: 'underline',
      marginBottom: 80,
    },
    dateContainer:{
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
  });
  return styles;
};

export default usePersonaliseProfileStyles;
