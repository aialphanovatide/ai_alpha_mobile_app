import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';
import {useContext} from 'react';

const useDailyActiveUsersStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    dailyActiveUsersItem: {
      flex: 1,
      marginVertical: theme.boxesVerticalMargin,
    },
    label: {
      marginHorizontal: 4,
      textAlign: 'center',
      fontSize: theme.responsiveFontSize * 0.825,
      color: theme.textColor,
    },
    labelOrange: {
      marginHorizontal: 24,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: theme.titleFontSize * 0.85,
    },
    row: {
      position: 'relative',
      marginVertical: theme.boxesVerticalMargin,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoContainer: {
      width: 30,
      height: 30,
      marginHorizontal: 10,
      borderRadius: 15,
    },
    usersContainer: {
      flexDirection: 'row',
      width: '100%',
      padding: theme.boxesVerticalMargin,
      backgroundColor: theme.fundamentalsCompetitorsItemBg,
      alignItems: 'center',
    },
    userImageContainer: {
      height: 48,
      width: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
    },
    userImage: {
      flex: 1,
      tintColor: theme.thirdBoxesBgColor,
    },
    itemName: {
      color: theme.inactiveTextColor,
      marginHorizontal: 10,
      fontSize: theme.responsiveFontSize * 0.875,
    },
    image: {
      flex: 1,
    },
    dataContainer: {
      flex: 1,
      padding: 10,
      backgroundColor: theme.boxesBackgroundColor,
    },
    noVerticalMargin: {
      marginVertical: 0,
    },
  });
  return styles;
};

export default useDailyActiveUsersStyles;
