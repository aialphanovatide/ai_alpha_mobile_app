import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const useVestingShedulesStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    rowContainer: {
      flexDirection: 'row',
      paddingHorizontal: 5,
      paddingVertical: 10,
    },
    subtitle: {
      marginHorizontal: 10,
      fontSize: theme.responsiveFontSize,
      color: theme.textColor,
    },
    tokenDataContainer: {
      flex: 1,
      width: '100%',
      paddingHorizontal: 10,
      backgroundColor: theme.secondaryBoxesBgColor,
    },
    yearContainer: {
      margin: 5,
      width: '30%',
      flexDirection: 'row',
      padding: 10,
      backgroundColor: theme.secondaryTextColor,
      borderRadius: 5,
    },
    yearText: {
      marginHorizontal: 5,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.8,
    },
    bigText: {
      padding: 12.5,
      fontSize: theme.responsiveFontSize * 1.5,
      color: theme.titleColor,
      fontWeight: 'bold',
    },
    unlockIconContainer: {
      width: 25,
      height: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    unlockIcon: {
      flex: 1,
      tintColor: theme.secondaryTextColor,
    },
    calendarIconContainer: {
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    calendarIcon: {
      flex: 1,
      tintColor: theme.textColor,
    },
  });
  return styles;
};

export default useVestingShedulesStyles;
