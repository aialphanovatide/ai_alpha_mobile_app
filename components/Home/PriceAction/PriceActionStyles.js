/* eslint-disable prettier/prettier */
import {useContext} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const usePriceActionStyles = () => {
  const {theme} = useContext(AppThemeContext);

  const styles = StyleSheet.create({
    priceActionContainer: {
      height: 'auto',
      width: theme.width,
      marginVertical: 15,
      paddingBottom: 30,
      paddingHorizontal: 10,
      overflow: 'hidden',
    },
    title: {
      paddingVertical: 10,
      paddingHorizontal: 5,
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
      fontWeight: 'bold',
    },
    tableContainer: {
      height: 500,
      marginVertical: 10,
      backgroundColor: theme.boxesBackgroundColor,
      borderColor: theme.boxesBorderColor,
      overflow: 'hidden',
      borderRadius: 6,
      justifyContent:'center'
    },
    tableScrollView: {
      flex: 1,
      height: '100%',
    },
    headerRow: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: theme.boxesBorderColor,
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
      borderBottomColor: theme.boxesBorderColor,
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
      height: '15%',
      backgroundColor: theme.boxesBackgroundColor,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.boxesBorderColor,
    },
    category: {
      marginHorizontal: 10,
      color: theme.secondaryTextColor,
    },
    active: {
      backgroundColor: theme.subMenuBgColor,
    },
    activeText: {
      fontWeight: 'bold',
      color: theme.textColor,
    },
    categoriesTitle: {
      flex: 1,
      paddingTop: 5,
      fontWeight: 'bold',
      fontSize: theme.responsiveFontSize * 0.9,
      color: theme.textColor,
      textAlign: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.boxesBorderColor,
    },
    row: {
      flexDirection: 'row',
    },
    emptyMessage: {
      marginHorizontal: '5%',
      padding: 10,
      fontSize: theme.responsiveFontSize,
      color: theme.textColor,
      borderWidth: 1,
      borderColor: theme.textColor,
      borderRadius: 10,
      overflow: 'hidden',
      textAlign: 'center',
    },
    alignCenter: {
      alignSelf: 'center',
    },
  });
  return styles;
};

export default usePriceActionStyles;
