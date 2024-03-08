import {StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {AppThemeContext} from '../../../context/themeContext';

const useDeleteAccountStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = {
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.mainBackgroundColor,
    },
    backButtonContainer: {
      margin: '10%',
      alignSelf: 'flex-start',
    },
    text: {
      marginTop: '40%',
      marginBottom: '5%',
      fontFamily: theme.fontMedium,
      fontSize: theme.titleFontSize,
      color: theme.textColor,
    },
  };
  return styles;
};

export default useDeleteAccountStyles;
