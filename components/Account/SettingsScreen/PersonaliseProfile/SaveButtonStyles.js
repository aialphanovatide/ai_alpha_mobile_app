import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../context/themeContext';

const useSaveButtonStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      paddingVertical: 15,
      paddingHorizontal: 10,
      marginTop: -40,
      marginBottom: 4,
      borderRadius: 4,
      alignItems: 'center',
      backgroundColor: theme.orange, // assuming default state color
      width: 150,
    },
    pressed: {
      opacity: 0.75,
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontFamily: theme.fontMedium,
      fontSize: 15,
    },
    textEnabled: {
      color: theme.subscriptions.activeButtonText, // color when the button is clickable
    },
    textDisabled: {
      color: theme.inactiveButtonText, // color when the button is disabled
    },
    disabled: {
      backgroundColor: theme.subscriptions.purchaseButtonBgColor, // style for the disabled container
    },
  });
  return styles;
};

export default useSaveButtonStyles;
