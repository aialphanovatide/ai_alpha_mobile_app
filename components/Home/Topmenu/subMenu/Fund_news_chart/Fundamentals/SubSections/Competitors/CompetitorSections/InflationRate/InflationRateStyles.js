import {useContext} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const useInflationRateStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    yearSelectorContainer: {
      flexDirection: 'row',
      width: '70%',
      marginVertical: 10,
      padding: 2.5,
      alignSelf: 'center',
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 2,
      overflow: 'hidden',
    },
    selectorItem: {
      flex: 1,
      marginHorizontal: 2,
      backgroundColor: 'transparent',
      borderRadius: 2,
    },
    active: {
      backgroundColor: theme.activeWhite,
    },
    yearText: {
      color: theme.subMenuTextColor,
      fontSize: theme.responsiveFontSize * 0.8,
      textAlign: 'center',
    },
    activeText: {
      color: theme.subMenuTextColor,
      fontWeight: 'bold',
    },
    container: {
      flex: 1,
      marginVertical: 10,
      marginHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    currentValue: {
      width: '30%',
      marginVertical: 10,
      paddingVertical: 8,
      paddingHorizontal: 16,
      color: theme.textColor,
      fontWeight: 'bold',
      fontSize: theme.responsiveFontSize * 0.9,
      borderWidth: 1,
      borderColor: theme.secondaryGrayColor,
      textAlign: 'center',
      alignSelf: 'center',
    },
    imageContainer: {
      width: 300,
      height: 450,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inflationImage: {
      flex: 1,
    },
  });
  return styles;
};

export default useInflationRateStyles;
