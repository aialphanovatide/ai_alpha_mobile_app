import React, {useContext} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useEthBtcStyles = () => {
  const {theme, isDarkMode} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: 'transparent',
      width: theme.width,
      paddingTop: 36,
    },
    container: {
      width: '100%',
      height: theme.height * 0.45,
      marginVertical: theme.boxesVerticalMargin,
      justifyContent: 'center',
      alignItems: 'top',
      borderRadius: 4,
    },
    chart: {
      width: '100%',
      height: '100%',
      margin: '0%',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    analysisTitle: {
      marginTop: theme.titlesVerticalMargin,
      marginVertical: theme.boxesVerticalMargin * 2,
      marginHorizontal: 28,
      color: theme.titleColor,
      fontSize: 25,
      fontFamily: theme.fontMedium,
      textAlign: 'left',
    },
    chartBackgroundImage: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: '10%',
      left: '7.5%',
      width: 52,
      height: 44,
      opacity: 0.5,
      tintColor: '#A3A3A350',
      zIndex: -2,
    },
    timeframeContainer: {
      flex: 1,
      width: '100%',
      maxHeight: '5%',
      paddingHorizontal: 12,
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
    backButtonWrapper: {
      marginHorizontal: 20,
    },
    chartsHorizontalButton: {
      width: 24,
      height: 24,
      position: 'absolute',
      bottom: Platform.OS === 'android' ? 77.5 : 85,
      left: 25,
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
      bottom: Platform.OS === 'android' ? 77.5 : 85,
      right: 80,
      tintColor: isDarkMode ? '#737373' : '#A3A3A3',
    },
  });
  return styles;
};

export default useEthBtcStyles;
