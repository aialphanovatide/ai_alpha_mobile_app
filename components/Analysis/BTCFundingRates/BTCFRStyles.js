import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useBtcFundingRatesStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    mainSection: {
      flex: 1,
      height: theme.height,
      backgroundColor: theme.mainBackgroundColor,
      padding: 10,
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
      fontWeight: 'bold',
    },
    tableContainer: {
      flex: 1,
      flexDirection: 'row',
      alignSelf: 'center',
      width: theme.width - 30,
      marginVertical: 20,
      alignItems: 'center',
      justifyContent: 'center',
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
      width: '100%',
      height: '100%',
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
    },
    dataCell: {
      flex: 1,
      height: 30,
      paddingHorizontal: 40,
      paddingVertical: 20,
      marginVertical: 20,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize,
    },
    exchangeName: {
      color: theme.textColor,
      fontSize: theme.responsiveFontSize,
      fontWeight: 'bold',
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
      fontWeight: 'bold',
    },
  });
  return styles;
};

export default useBtcFundingRatesStyles;
