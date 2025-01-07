/* eslint-disable prettier/prettier */
import {useContext} from 'react';
import {StyleSheet, Platform} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useTopTenGainersStyles = () => {
  const {theme, isDarkMode} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    topTenGainersContainer: {
      height: 400,
      width: Platform.OS === 'ios' ? '100%' : theme.width,
      borderRadius: 4,
    },
    topTenGainersTitle: {
      marginTop: 24,
      marginBottom: 8,
      paddingHorizontal: 16,
      color: theme.titleColor,
      fontSize: 16,
      fontFamily: theme.fontMedium,
    },
    table: {
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 4,
    },
    row: {
      width: '100%',
      marginVertical: 2.5,
      display: 'flex',
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingVertical: 10,
      alignItems: 'flex-start',
    },
    logoContainer: {
      width: 30,
      height: 30,
      marginRight: 18,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
    },
    coinLogo: {
      flex: 1,
      width: 30,
      height: 30,
      borderRadius: 15,
    },
    coinDataContainer: {
      flex: 1,
      marginRight: 30,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    positionContainer: {
      width: 30,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    coinPosition: {
      color: theme.textColor,
      fontSize: 14,
      fontFamily: theme.fontSemibold,
      textAlign: 'left',
    },
    coinData: {
      color: theme.textColor,
      fontFamily: theme.font,
      fontSize: 12,
    },
    coinName: {
      fontSize: 14,
      color: theme.textColor,
      fontFamily: theme.fontSemibold,
    },
    coinNumbersContainer: {
      flex: 1,
      marginLeft: 20,
      paddingRight: 8,
      paddingLeft: 20,
      justifyContent: 'center',
    },
    coinNumber: {
      textAlign: 'right',
      color: theme.secondaryTextColor,
      fontFamily: theme.fontSemibold,
      fontSize: 14,
    },
    greenNumber: {
      color: theme.priceUpColor,
      fontFamily: theme.fontMedium,
      fontSize: 12,
    },
    redNumber: {
      color: theme.priceDownColor,
      fontFamily: theme.fontMedium,
      fontSize: 12,
    },
    titleRow: {
      marginVertical: 4,
      flexDirection: 'row',
    },
    horizontalLine: {
      width: '90%',
      marginLeft: '5%',
      borderBottomWidth: 0.75,
      borderBottomColor: theme.secondaryGrayColor,
    },
    scrollBarContainer: {
      height: '96%',
      marginBottom: 4,
      marginRight: Platform.OS === 'ios' ? 0 : 10,
      alignSelf: 'center',
      alignItems: 'center',
      width: 7,
      backgroundColor: isDarkMode ? '#73737330' : '#D4D4D430',
    },
    scrollBar: {
      width: 4,
      borderRadius: 2,
      backgroundColor: isDarkMode ? '#737373' : '#D4D4D4',
    },
    // New section styles
    itemsContainer: {
      flexDirection: 'row',
      borderRadius: 4,
      paddingHorizontal: 8,
      paddingVertical: 10,
    },
    container: {
      flex: 1,
      marginVertical: 16,
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
    },
    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
    topBarTitle: {
      fontSize: 12,
      fontFamily: theme.fontFigtreeMedium,
      color: isDarkMode ? '#52525B' : '#D4D4D8',
    },
    itemContainer: {
      width: 170,
      height: 60,
      marginHorizontal: 6,
      padding: 10,
      paddingLeft: 4,
      flexDirection: 'row',
    },
    itemPosition: {
      marginRight: 4,
      fontFamily: theme.fontFigtreeSemibold,
      fontSize: 20,
      color: '#71717A',
    },
    icon: {
      width: 25,
      height: 25,
      borderRadius: 12.5,
      marginHorizontal: 6,
    },
    dataRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    itemName: {
      maxWidth: '65%',
      marginRight: 4,
      fontFamily: theme.fontFigtreeSemibold,
      fontSize: 14,
      color: isDarkMode ? '#FAFAFA' : '#0A0A0A',
      textTransform: 'capitalize',
    },
    itemSymbol: {
      fontFamily: theme.fontFigtree,
      fontSize: 12,
      color: '#71717A',
      textTransform: 'uppercase',
    },
    price: {
      fontFamily: theme.fontFigtreeSemibold,
      fontSize: 14,
      color: isDarkMode ? '#FAFAFA' : '#0A0A0A',
    },
    column: {
      flex: 1,
      flexDirection: 'column',
    },
    priceChangeContainer: {
      marginLeft: 6,
      flexDirection: 'row',
      padding: 2,
      borderRadius: 2,
      alignSelf: 'center',
      alignItems: 'center',
    },
    priceChange: {
      fontFamily: theme.fontFigtree,
      fontSize: 10,
    },
    incrementBackground: {
      backgroundColor: isDarkMode ? '#002E23' : '#CFFCE5',
    },
    decrementBackground: {
      backgroundColor: isDarkMode ? '#440B0B' : '#FEF1F1',
    },
    increment: {
      color: '#09C283',
    },
    decrement: {
      color: '#E93334',
    },
  });
  return styles;
};

export default useTopTenGainersStyles;
