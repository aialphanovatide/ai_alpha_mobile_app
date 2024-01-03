import { useContext } from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import { AppThemeContext } from '../../../../../../../../context/themeContext';

const useRevenueModelStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectorContainer: {
      flex: 1,
      flexDirection: 'row',
      paddingVertical: 10,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    itemContainer: {
      flexDirection: 'row',
      margin: 2.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemButton: {
      width: 20,
      height: 20,
      margin: 2.5,
      borderRadius: 5,
      overflow: 'hidden',
    },
    itemName: {
      fontSize: theme.responsiveFontSize * 0.7,
      fontWeight: 'bold',
    },
    chartContainer: {
      marginHorizontal: 10,
    },
    charts: {
      flexDirection: 'row',
      padding: 10,
    },
    dataRow: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dataContainer: {
      marginHorizontal: '17.5%',
    },
    text: {
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.8,
      textAlign: 'center',
      alignSelf: 'center',
    },
    year: {
      fontSize: theme.responsiveFontSize,
      fontWeight: 'bold',
      color: theme.textColor,
    },
    percentageValue: {
      fontSize: theme.titleFontSize,
      fontWeight: 'bold',
      textAlign: 'center',
      alignSelf: 'center',
      color: theme.textColor
    },
    inactive: {
      backgroundColor: theme.inactiveMenuBgColor,
    },
    inactiveText: {
      color: theme.inactiveMenuBgColor,
    },
  });
  return styles;
};

export default useRevenueModelStyles;
