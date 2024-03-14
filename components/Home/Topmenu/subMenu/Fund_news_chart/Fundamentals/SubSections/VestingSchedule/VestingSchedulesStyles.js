import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const useVestingShedulesStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.secondaryBoxesBgColor,
    },
    rowContainer: {
      flexDirection: 'row',
      marginVertical: 16,
      paddingHorizontal: 8,
      paddingVertical: 8,
    },
    subtitle: {
      marginHorizontal: 10,
      fontSize: theme.responsiveFontSize,
      color: theme.textColor,
      fontFamily: theme.fontSemibold,
    },
    tokenDataContainer: {
      flex: 1,
      width: '100%',
      paddingHorizontal: 10,
    },
    itemContainer: {
      flex: 1,
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: theme.secondaryGrayColor,
    },
    yearContainer: {
      maxWidth: '40%',
      marginVertical: 8,
      width: 'auto',
      flexDirection: 'row',
      padding: 8,
      paddingHorizontal: 16,
      backgroundColor: theme.secondaryGrayColor,
      borderRadius: 3,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    yearText: {
      marginHorizontal: 4,
      color: theme.whiteTextColor,
      fontSize: theme.responsiveFontSize * 0.85,
      fontFamily: theme.fontMedium,
    },
    bigText: {
      marginVertical: 8,
      fontSize: theme.responsiveFontSize * 1.5,
      color: theme.titleColor,
      fontFamily: theme.fontSemibold,
    },
    unlockIcon: {
      padding: 8,
      width: 25,
      height: 25,
      tintColor: theme.fundamentalsLockIcon,
    },
    calendarIcon: {
      width: 26,
      height: 26,
      marginRight: 4,
      alignSelf: 'flex-start',
      tintColor: theme.whiteTextColor,
    },
  });
  return styles;
};

export default useVestingShedulesStyles;
