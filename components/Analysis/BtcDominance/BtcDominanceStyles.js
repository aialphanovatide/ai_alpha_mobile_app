import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useBtcDominanceStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: 'transparent',
      paddingTop: 36,
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
      top: 15,
      left: '7.5%',
      width: 60,
      height: 60,
      opacity: 0.8,
      zIndex: -10,
    },
    timeframeContainer: {
      flex: 1,
      maxHeight: '5%',
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
  });
  return styles;
};

export default useBtcDominanceStyles;
