import {useContext} from 'react';
import {AppThemeContext} from '../../context/themeContext';

/* eslint-disable prettier/prettier */
const {StyleSheet} = require('react-native');

const useLoaderStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    loaderContainer: {
      flex: 1,
      width: '100%',
      minHeight: theme.height * 0.25,
      padding: '25%',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      // backgroundColor: theme.mainBackgroundColor,
    },
    loadingText: {
      marginTop: 10,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.75,
    },
    centeredContainer: {
      ...StyleSheet.absoluteFillObject,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.mainBackgroundColor,
    },
    fullViewContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 20,
    },
    loader: {
      width: 40,
      height: 40,
    },
  });
  return styles;
};

export default useLoaderStyles;
