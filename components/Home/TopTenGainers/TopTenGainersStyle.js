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
      marginVertical: 20,
      borderRadius: 4,
    },
    topTenGainersTitle: {
      padding: 10,
      paddingHorizontal: 16,
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
      fontFamily: theme.fontSemibold,
    },
    table: {
      paddingTop: 10,
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 4,
    },
    row: {
      flex: 1,
      width: '100%',
      marginVertical: 2.5,
      display: 'flex',
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: theme.secondaryGrayColor,
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
      fontSize: theme.responsiveFontSize,
      fontFamily: theme.fontSemibold,
      textAlign: 'left',
    },
    coinData: {
      color: theme.textColor,
      fontFamily: theme.fontMedium,
    },
    coinName: {
      fontSize: theme.responsiveFontSize * 1.125,
      color: theme.textColor,
      fontFamily: theme.fontBold,
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
      fontFamily: theme.fontBold,
    },
    greenNumber: {
      color: theme.priceUpColor,
      fontFamily: theme.fontSemibold,
    },
    redNumber: {
      color: theme.priceDownColor,
      fontFamily: theme.fontSemibold,
    },
    titleRow: {
      flexDirection: 'row',
    },
  });
  return styles;
};

export default useTopTenGainersStyles;
