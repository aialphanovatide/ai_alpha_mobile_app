/* eslint-disable prettier/prettier */
import { useContext } from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import { AppThemeContext } from '../../../context/themeContext';

const useTopTenGainersStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    topTenGainersContainer: {
      height: 400,
      width: theme.width,
      paddingHorizontal: 10,
      marginVertical: 20,
    },
    topTenGainersTitle: {
      paddingVertical: 10,
      paddingHorizontal: 5,
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
      fontWeight: 'bold',
    },
    table: {
      paddingTop: 10,
      backgroundColor: theme.boxesBackgroundColor,
    },
    row: {
      width: '100%',
      height: 80,
      marginVertical: 2.5,
      display: 'flex',
      flexDirection: 'row',
      borderBottomWidth: 2,
      borderBottomColor: theme.boxesBorderColor,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    logoContainer: {
      width: 50,
      height: 50,
      marginRight: 25,
      alignSelf: 'flex-start',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
    },
    coinLogo: {
      width: '100%',
      height: '100%',
      borderRadius: 25,
    },
    coinDataContainer: {
      flex: 1,
      marginTop: 20,
      marginRight: 30,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    coinPosition: {
      marginRight: 10,
      paddingHorizontal: 5,
      paddingVertical: 10,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    coinData: {
      color: theme.textColor,
    },
    coinName: {
      fontSize: theme.responsiveFontSize,
      color: theme.textColor,
      fontWeight: 'bold',
    },
    coinNumbersContainer: {
      position: 'relative',
      right: 0,
      top: 0,
      flex: 1,
      marginLeft: 20,
      paddingHorizontal: 20,
      paddingVertical: 5,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    coinNumber: {
      textAlign: 'right',
      color: theme.secondaryTextColor,
      fontWeight: 'bold',
    },
    greenNumber: {
      color: theme.priceUpColor,
    },
    redNumber: {
      color: theme.priceDownColor,
    },
  });
  return styles;
};

export default useTopTenGainersStyles;
