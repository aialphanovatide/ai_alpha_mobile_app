import React, {useContext} from 'react';
import {AppThemeContext} from '../../../../../../../context/themeContext';
import {Platform, StyleSheet} from 'react-native';

const useChartWidgetStyles = () => {
  const {theme, isDarkMode} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: 360,
      height: 340,
      marginRight: 16,
    },
    chartsHorizontalButton: {
      width: 24,
      height: 24,
      position: 'relative',
      bottom: Platform.OS === 'android' ? 100 : 120,
      left: Platform.OS === 'android' ? 10 : 10,
      tintColor: theme.textColor,
      zIndex: 1,
    },
    chartsZoomIndicator: {
      width: 20,
      height: 24,
      position: 'absolute',
      bottom: Platform.OS === 'android' ? 85 : 100,
      right: 65,
      tintColor: isDarkMode ? '#737373' : '#A3A3A3',
    },
    chartBackButton: {
      width: 35,
      height: 35,
      position: 'absolute',
      bottom: 280,
      right: 30,
      tintColor: theme.textColor,
    },
  });
  return styles;
};

export default useChartWidgetStyles;
