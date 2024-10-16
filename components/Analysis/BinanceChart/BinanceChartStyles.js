import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useBinanceChartStyles = () => {
  const {theme, isDarkMode} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: 'transparent',
      paddingTop: 26,
    },
    container: {
      width: '100%',
      height: theme.height * 0.45,
      paddingHorizontal: 12,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'top',
      borderRadius: 4,
    },
    chart: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    backButtonWrapper: {
      marginHorizontal: 20,
    },
    analysisTitle: {
      marginHorizontal: 28,
      marginTop: theme.titlesVerticalMargin,
      marginVertical: theme.boxesVerticalMargin * 2,
      color: theme.titleColor,
      fontSize: 25,
      fontFamily: theme.fontMedium,
      textAlign: 'left',
    },
    chartBackgroundImage: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 10,
      left: '7.5%',
      width: 52,
      height: 44,
      opacity: 0.5,
      zIndex: -2,
      tintColor: '#A3A3A350',
    },
    timeframeContainer: {
      paddingHorizontal: 8,
      marginHorizontal: 16,
    },
    sectionDescription: {
      width: '90%',
      marginHorizontal: 28,
      marginBottom: 28,
      fontSize: 14,
      fontFamily: theme.font,
      color: theme.textColor,
      textAlign: 'left',
      lineHeight: 20,
    },
    chartsHorizontalButton: {
      width: 24,
      height: 24,
      position: 'absolute',
      bottom: 50,
      left: -160,
      tintColor: theme.textColor,
    },
    chartBackButton: {
      width: 35,
      height: 35,
      position: 'absolute',
      bottom: 280,
      right: 30,
      tintColor: theme.textColor,
    },
    chartsZoomIndicator: {
      width: 20,
      height: 24,
      position: 'absolute',
      bottom: 50,
      right: 80,
      tintColor: isDarkMode ? '#737373' : '#A3A3A3',
    },
  });
  return styles;
};

export default useBinanceChartStyles;
