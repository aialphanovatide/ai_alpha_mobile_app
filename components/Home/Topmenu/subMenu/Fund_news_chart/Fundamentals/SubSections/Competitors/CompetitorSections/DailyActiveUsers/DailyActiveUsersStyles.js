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
      fontSize: theme.responsiveFontSize * 0.825,
      color: theme.orange,
    },
    row: {
      position: 'relative',
      marginVertical: theme.boxesVerticalMargin,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoContainer: {
      marginLeft: 22,
      width: 28,
      height: 28,
      borderRadius: 14,
    },
    usersContainer: {
      flexDirection: 'row',
      width: '100%',
      padding: theme.boxesVerticalMargin,
      backgroundColor: theme.boxesBackgroundColor,
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
      fontSize: theme.responsiveFontSize * 0.9,
      fontWeight: 'bold',
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
