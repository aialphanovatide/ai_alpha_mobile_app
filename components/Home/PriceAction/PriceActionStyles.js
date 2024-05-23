/* eslint-disable prettier/prettier */
import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const usePriceActionStyles = () => {
  const {theme} = useContext(AppThemeContext);

  const styles = StyleSheet.create({
    priceActionContainer: {
      width: '100%',
      marginTop: 8,
      marginBottom: 64,
      paddingBottom: 30,
      overflow: 'hidden',
    },
    title: {
      marginVertical: 8,
      paddingHorizontal: 16,
      color: theme.titleColor,
      fontSize: 21.3333,
      fontFamily: theme.fontSemibold,
    },
    tableContainer: {
      flex: 1,
      height: theme.height * 0.3,
      marginVertical: 10,
      backgroundColor: theme.boxesBackgroundColor,
      borderColor: theme.secondaryGrayColor,
      overflow: 'hidden',
      borderRadius: 2,
      justifyContent: 'center',
    },
    tableScrollView: {
      flex: 1,
      height: '100%',
    },
    headerRow: {
      flexDirection: 'row',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.secondaryGrayColor,
    },
    logoContainer: {
      flex: 1,
      marginTop: 5,
      marginLeft: 5,
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    coinLogo: {
      width: 20,
      height: 20,
      borderRadius: 10,
    },
    headerCell: {
      flex: 1,
      marginHorizontal: 5,
      padding: 5,
      fontSize: theme.responsiveFontSize * 0.9,
      fontFamily: theme.fontMedium,
      color: theme.inactiveTextColor,
      textAlign: 'center',
      verticalAlign: 'middle',
    },
    dataRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: theme.secondaryGrayColor,
    },
    borderless: {
      borderBottomWidth: 0,
      borderBottomColor: 'transparent',
    },
    dataCell: {
      flex: 1,
      padding: 5,
      marginRight: 20,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.75,
      textAlign: 'center',
      verticalAlign: 'middle',
      fontFamily: theme.fontMedium,
    },
    greenNumber: {
      color: theme.priceUpColor,
      fontFamily: theme.fontMedium,
    },
    redNumber: {
      color: theme.priceDownColor,
      fontFamily: theme.fontMedium,
    },
    displayNone: {
      display: 'none',
    },
    categoriesContainer: {
      paddingVertical: 10,
      backgroundColor: theme.boxesBackgroundColor,
      overflow: 'hidden',
      borderTopWidth: 1,
      borderColor: theme.boxesBorderColor,
    },
    category: {
      marginHorizontal: 10,
      color: theme.secondaryTextColor,
    },
    row: {
      flexDirection: 'row',
    },
    emptyMessage: {
      margin: '5%',
      fontSize: theme.responsiveFontSize * 0.85,
      color: theme.secondaryTextColor,
      fontFamily: theme.fontBoldItalic,
      overflow: 'hidden',
      textAlign: 'center',
    },
    alignCenter: {
      alignSelf: 'center',
    },
    categoryIconContainer: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      borderRadius: 15,
      backgroundColor: theme.topMenuActiveBg,
    },
    categoryIcon: {
      flex: 1,
      width: 30,
      height: 30,
    },
    categoryWrapper: {
      marginHorizontal: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleRow: {
      flexDirection: 'row',
    },
  });
  return styles;
};

export default usePriceActionStyles;
