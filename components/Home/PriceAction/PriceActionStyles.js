/* eslint-disable prettier/prettier */
import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const usePriceActionStyles = () => {
  const {theme} = useContext(AppThemeContext);

  const styles = StyleSheet.create({
    priceActionContainer: {
      width: theme.width,
      marginVertical: 15,
      paddingBottom: 30,
      overflow: 'hidden',
    },
    title: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
      fontWeight: 'bold',
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
      width: 20,
      height: 20,
      marginTop: 5,
      marginLeft: 5,
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    coinLogo: {
      width: '100%',
      height: '100%',
    },
    headerCell: {
      flex: 1,
      marginHorizontal: 5,
      padding: 5,
      fontWeight: 'bold',
      fontSize: theme.responsiveFontSize * 0.9,
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
    },
    greenNumber: {
      color: theme.priceUpColor,
    },
    redNumber: {
      color: theme.priceDownColor,
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
      fontStyle: 'italic',
      fontWeight: 'bold',
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
