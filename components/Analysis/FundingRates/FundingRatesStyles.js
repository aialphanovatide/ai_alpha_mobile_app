import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useFundingRatesStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    mainSection: {
      width: '100%',
      backgroundColor: 'transparent',
      paddingTop: 24,
      paddingHorizontal: 12,
    },
    titleContainer: {
      flexDirection: 'row',
      paddingHorizontal: 28,
      marginTop: theme.titlesVerticalMargin,
      marginVertical: theme.boxesVerticalMargin * 2,
    },
    title: {
      color: theme.titleColor,
      fontSize: 25,
      fontFamily: theme.fontMedium,
      textAlign: 'left',
    },
    tableContainer: {
      alignSelf: 'center',
      width: '100%',
      marginVertical: 16,
      marginBottom: 64,
      borderRadius: 4,
    },
    tableHeader: {
      width: '100%',
      flexDirection: 'row',
      marginBottom: 10,
      backgroundColor: 'transparent',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    exchangeHeader: {
      width: 80,
      height: 75,
      marginLeft: 0 ,
      marginRight: 10,
      alignItems: 'center',
      backgroundColor: theme.tableHeaderColor,
    },
    alignCenter: {
      alignItems: 'center',
    },
    logoContainer: {
      width: 30,
      height: 30,
      marginVertical: 5,
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    exchangeLogo: {
      width: 24,
      height: 24,
      borderRadius: 12,
    },
    coinLogo: {
      width: 24,
      height: 24,
      borderRadius: 12,
      alignSelf: 'center',
    },
    dataRow: {
      flexDirection: 'row',
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    headerCell: {
      height: 70,
      width: '23.5%',
      paddingHorizontal: 10,
      paddingTop: 10,
      paddingBottom: 6,
      justifyContent: 'center',
      fontSize: theme.responsiveFontSize,
      fontFamily: theme.fontSemibold,
    },
    headerBg: {
      backgroundColor: theme.tableHeaderColor,
    },
    dataCell: {
      width: '23.5%',
      height: 30,
      color: theme.textColor,
      fontSize: 14,
      fontFamily: theme.fontMedium,
      alignItems: 'center',
      textAlign: 'center',
      // backgroundColor: theme.boxesBackgroundColor,
    },
    exchangeName: {
      marginTop: 4,
      color: theme.textColor,
      fontSize: 12,
      fontFamily: theme.font,
      textAlign: 'center',
      alignSelf: 'center',
    },
    priceUp: {
      color: theme.priceUpColor,
    },
    priceDown: {
      color: theme.priceDownColor,
    },
    naText: {
      textAlign: 'center',
      color: theme.secondaryTextColor
    },
    sectionDescription: {
      width: '90%',
      marginHorizontal: 28,
      fontSize: 14,
      fontFamily: theme.font,
      color: theme.textColor,
      textAlign: 'left',
      lineHeight: 20,
    },
    readMoreButton: {
      marginHorizontal: 8,
      flex: 1,
    },
    readMoreText: {
      fontSize: theme.responsiveFontSize * 0.8,
      color: '#7B7BFF',
      lineHeight: 24,
      textDecorationLine: 'underline',
      textDecorationColor: '#7B7BFF',
      fontFamily: theme.fontSemibold,
    },
    loaderWrapper: {
      flex: 1,
      marginBottom: '50%',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    backButtonWrapper: {
      marginHorizontal: 20,
    },
  });
  return styles;
};

export default useFundingRatesStyles;
