import {useContext} from 'react';
import {AppThemeContext} from '../../context/themeContext';

const {StyleSheet, Platform} = require('react-native');

const useSplashScreenStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    linearGradient: {
      flex: 1,
    },
    container: {
      width: theme.width,
      height: theme.height,
      alignItems: 'center',
      justifyContent: 'center',
    },
    alphaLogo: {
        width: 100,
        height: 86,
        marginBottom: Platform.OS === 'ios' ? 100 : 0,
    }
  });
  return styles;
};

export default useSplashScreenStyles;
