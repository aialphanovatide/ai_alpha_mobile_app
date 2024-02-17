import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useBtcDominanceStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: theme.mainBackgroundColor,
      padding: 10,
    },
    container: {
      width: '100%',
      height: theme.height * 0.45,
      marginVertical: theme.boxesVerticalMargin,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'top',
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 4,
    },
    chart: {
      width: '100%',
      height: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    analysisTitle: {
      marginTop: theme.titlesVerticalMargin,
      marginHorizontal: 10,
      fontSize: theme.titleFontSize,
      color: theme.titleColor,
      fontWeight: 'bold',
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
      width: '100%',
      maxHeight: '5%',
    },
    sectionDescription: {
      width: '100%',
      marginVertical: theme.boxesVerticalMargin,
      paddingHorizontal: 8,
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.textColor,
      textAlign: 'left',
    },
  });
  return styles;
};

export default useBtcDominanceStyles;
