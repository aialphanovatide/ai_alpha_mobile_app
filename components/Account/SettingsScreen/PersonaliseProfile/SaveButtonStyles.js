import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { AppThemeContext } from '../../../../context/themeContext';

const useSaveButtonStyles = () => {
  const { theme } = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      paddingVertical: 15,
      paddingHorizontal: 10,
      marginTop: -40,
      marginBottom: 4,
      borderRadius: 4,
      alignItems: 'center',
      backgroundColor: theme.orange, // assuming default state color
      width: '100%',
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
      color: 'white',
    },
    textDisabled: {
      color: theme.personalizeProfileSaveButtonText,
    },
    disabled: {
      backgroundColor: theme.personalizeProfileSaveButtonBackground,
    },
  });
  return styles;
};

export default useSaveButtonStyles;
