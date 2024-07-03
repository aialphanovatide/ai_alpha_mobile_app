import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useFundingRatesStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    mainSection: {
      width: '100%',
      backgroundColor: 'transparent',
      paddingTop: 36,
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
      height: 80,
      backgroundColor: theme.tableHeaderColor,
      alignItems: 'center',
    },
    exchangeHeader: {
      width: 100,
      height: 100,
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
      width: 30,
      height: 30,
      borderRadius: 15,
    },
    coinLogo: {
      width: 35,
      height: 35,
      borderRadius: 17.5,
      alignSelf: 'center',
    },
    dataRow: {
      flexDirection: 'row',
      backgroundColor: theme.boxesBackgroundColor,
      alignItems: 'center',
    },
    headerCell: {
      height: 60,
      width: 75,
      marginLeft: 12,
      paddingVertical: 10,
      justifyContent: 'center',
      fontSize: theme.responsiveFontSize,
      fontFamily: theme.fontSemibold,
    },
    dataCell: {
      width: 60,
      height: 60,
      paddingVertical: 10,
      marginHorizontal: 10,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.875,
      fontFamily: theme.fontMedium,
      alignItems: 'center',
      textAlign: 'center',
    },
    exchangeName: {
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.9,
      fontFamily: theme.fontMedium,
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
      textAlign: 'left',
      paddingLeft: 4,
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
