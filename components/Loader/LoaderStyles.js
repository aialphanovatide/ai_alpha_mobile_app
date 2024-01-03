import {useContext} from 'react';
import {AppThemeContext} from '../../context/themeContext';

/* eslint-disable prettier/prettier */
const {StyleSheet} = require('react-native');

const useLoaderStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 10,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.75,
    },
  });
  return styles;
};

export default useLoaderStyles;
