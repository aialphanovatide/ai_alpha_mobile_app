import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useBtcDominanceStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: theme.mainBackgroundColor,
      padding: 15,
    },
    container: {
      width: '100%',
      height: 300,
      marginVertical: '10%',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'top',
      backgroundColor: theme.boxesBackgroundColor,
    },
    chart: {
      width: '100%',
      height: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    analysisTitle: {
      marginTop: '3%',
      marginLeft: '3%',
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
  });
  return styles;
};

export default useBtcDominanceStyles;
