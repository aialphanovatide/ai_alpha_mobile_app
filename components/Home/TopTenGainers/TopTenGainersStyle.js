/* eslint-disable prettier/prettier */
import {useContext} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useTopTenGainersStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    topTenGainersContainer: {
      height: 400,
      width: theme.width,
      paddingHorizontal: 10,
      marginVertical: 20,
      borderRadius: 4,
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
      flex: 1,
      width: '100%',
      marginVertical: 2.5,
      display: 'flex',
      flexDirection: 'row',
      borderBottomWidth: 2,
      borderBottomColor: theme.boxesBorderColor,
      paddingHorizontal: 20,
      paddingVertical: 10,
      alignItems: 'flex-start',
    },
    logoContainer: {
      width: 30,
      height: 30,
      marginRight: 25,
      alignSelf: 'flex-start',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
    },
    coinLogo: {
      flex: 1,
      borderRadius: 15,
    },
    coinDataContainer: {
      flex: 1,
      marginRight: 30,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    coinPosition: {
      marginRight: 7.5,
      paddingHorizontal: 5,
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
      flex: 1,
      marginLeft: 20,
      paddingHorizontal: 20,
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