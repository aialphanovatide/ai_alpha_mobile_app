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
      paddingTop: 36,
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
    }
  });
  return styles;
};

export default useBtcFundingRatesStyles;
