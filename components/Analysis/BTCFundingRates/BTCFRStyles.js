import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useBtcFundingRatesStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    mainSection: {
      flex: 1,
      height: theme.height,
      backgroundColor: 'transparent',
      padding: 10,
      paddingTop: 36,
    },
    titleContainer: {
      flexDirection: 'row',
      padding: 10,
    },
    title: {
      paddingVertical: 2.5,
      paddingHorizontal: 15,
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
      fontFamily: theme.fontSemibold,
    },
    tableContainer: {
      flex: 1,
      flexDirection: 'row',
      alignSelf: 'center',
      width: theme.width - 30,
      marginVertical: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
    },
    tableHeader: {
      backgroundColor: theme.tableHeaderColor,
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
    dataRow: {
      backgroundColor: theme.boxesBackgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerCell: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
      paddingHorizontal: theme.width * 0.05,
      fontSize: theme.responsiveFontSize,
      fontFamily: theme.fontSemibold,
    },
    dataCell: {
      flex: 1,
      height: 30,
      paddingHorizontal: 40,
      paddingVertical: 20,
      marginVertical: 20,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize,
      fontFamily: theme.fontMedium,
    },
    exchangeName: {
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 1.05,
      fontFamily: theme.fontMedium,
    },
    priceUp: {
      color: theme.priceUpColor,
    },
    priceDown: {
      color: theme.priceDownColor,
    },
    sectionDescription: {
      width: '100%',
      paddingHorizontal: 8,
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.textColor,
      textAlign: 'left',
      fontFamily: theme.fontMedium,
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
  });
  return styles;
};

export default useBtcFundingRatesStyles;
