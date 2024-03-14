import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useEthBtcStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: 'transparent',
      width: theme.width,
      padding: 10,
      paddingTop: 36
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
      marginHorizontal: 10,
      fontSize: theme.titleFontSize,
      color: theme.titleColor,
      fontFamily: theme.fontSemibold,
    },
    chartBackgroundImage: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 15,
      left: '7.5%',
      width: 60,
      height: 60,
      opacity: 0.8,
      zIndex: -2,
    },
    timeframeContainer: {
      flex: 1,
      width: '100%',
      maxHeight: '5%',
    },
    sectionDescription: {
      width: '100%',
      marginVertical: theme.boxesVerticalMargin,
      paddingHorizontal: 8,
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.fontMedium,
      color: theme.textColor,
      textAlign: 'left',
      lineHeight: 20,
    },
  });
  return styles;
};

export default useEthBtcStyles;
