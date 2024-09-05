/* eslint-disable prettier/prettier */
import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useTopTenLosersStyles = () => {
  const {theme, isDarkMode} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    topTenGainersContainer: {
      height: 400,
      width: theme.width,
      marginBottom: 24,
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
      flex: 1,
      width: '100%',
      marginVertical: 2.5,
      display: 'flex',
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 10,
      alignItems: 'flex-start',
    },
    logoContainer: {
      width: 30,
      height: 30,
      marginRight: 25,
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
      marginRight: 4,
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
      paddingHorizontal: 20,
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
      width: '85%',
      marginLeft: '5%',
      borderBottomWidth: 0.5,
      borderBottomColor: theme.secondaryGrayColor,
    },
    scrollBarContainer: {
      height: '96%',
      marginBottom: 4,
      marginRight: 10,
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
    itemsContainer: {
      flex: 1,
      flexDirection: 'row',
      paddingRight: 14,
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 4,
    },
  });
  return styles;
};

export default useTopTenLosersStyles;
