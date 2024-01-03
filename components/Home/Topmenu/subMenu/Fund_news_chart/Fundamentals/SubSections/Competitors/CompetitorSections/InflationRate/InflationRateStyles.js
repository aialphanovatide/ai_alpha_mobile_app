import {useContext} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const useInflationRateStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    yearSelectorContainer: {
      flexDirection: 'row',
      width: '75%',
      marginVertical: 10,
      padding: 2.5,
      alignSelf: 'center',
      backgroundColor: theme.inactiveMenuBgColor,
      borderRadius: 5,
      overflow: 'hidden',
    },
    selectorItem: {
      flex: 1,
      marginHorizontal: 5,
      backgroundColor: 'transparent',
      borderRadius: 5,
    },
    active: {
      backgroundColor: theme.activeWhite,
    },
    yearText: {
      color: '#F7F7F7',
      fontSize: theme.responsiveFontSize * 0.8,
      textAlign: 'center',
    },
    activeText: {
      color: theme.secondaryTextColor,
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
      marginVertical: 10,
      paddingVertical: 5,
      paddingHorizontal: 10,
      color: theme.textColor,
      fontWeight: 'bold',
      fontSize: theme.responsiveFontSize * 0.9,
      borderWidth: 1,
      borderColor: theme.textColor,
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
