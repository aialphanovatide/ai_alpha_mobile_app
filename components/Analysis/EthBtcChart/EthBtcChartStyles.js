import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useEthBtcStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: theme.mainBackgroundColor,
      width: theme.width,
      padding: 10,
    },
    container: {
      width: '100%',
      height: 400,
      marginVertical: theme.boxesVerticalMargin,
      justifyContent: 'top',
      alignItems: 'top',
      backgroundColor: theme.boxesBackgroundColor,
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
      marginVertical: theme.titlesVerticalMargin,
      fontSize: theme.titleFontSize,
      color: theme.titleColor,
      fontWeight: 'bold',
    },
    backgroundImage: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      width: 50,
      height: 50,
    },
    timeframeContainer: {
      flex: 1,
      width: '100%',
      maxHeight: '5%',
    },
  });
  return styles;
};

export default useEthBtcStyles;
