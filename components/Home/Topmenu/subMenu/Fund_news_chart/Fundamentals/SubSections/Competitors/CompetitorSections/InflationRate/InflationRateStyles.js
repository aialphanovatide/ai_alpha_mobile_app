import {useContext} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const useInflationRateStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    mainContainer: {
      height: '100%',
    },
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
      fontFamily: theme.fontMedium,
    },
    activeText: {
      color: theme.subMenuTextColor,
      fontFamily: theme.fontSemibold,
    },
    container: {
      marginVertical: 8,
      marginHorizontal: 20,
      alignItems: 'center',
    },
    currentValue: {
      width: 70,
      marginVertical: 8,
      paddingHorizontal: 16,
      paddingVertical: 4,
      color: theme.textColor,
      fontFamily: theme.font,
      fontSize: 14,
      borderWidth: 1,
      borderColor: theme.secondaryGrayColor,
      borderRadius: 1,
      textAlign: 'center',
      alignSelf: 'center',
    },
    imageContainer: {
      marginVertical: 16,
      width: 300,
      height: 280,
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
