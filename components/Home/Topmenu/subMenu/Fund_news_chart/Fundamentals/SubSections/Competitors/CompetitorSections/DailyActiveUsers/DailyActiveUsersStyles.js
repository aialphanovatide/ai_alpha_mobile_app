import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';
import {useContext} from 'react';

const useDailyActiveUsersStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      marginVertical: 8,
    },
    dailyActiveUsersItem: {
      marginVertical: theme.boxesVerticalMargin,
    },
    label: {
      marginHorizontal: 4,
      textAlign: 'center',
      fontSize: theme.responsiveFontSize * 0.9,
      color: theme.textColor,
      fontFamily: theme.fontSemibold,
    },
    labelOrange: {
      marginHorizontal: 40,
      textAlign: 'center',
      fontSize: theme.titleFontSize,
      fontFamily: theme.fontSemibold,
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
      alignItems: 'center',
      borderBottomColor: theme.secondaryGrayColor,
      borderBottomWidth: 1,
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
      marginLeft: 0,
      fontSize: 16,
      fontFamily: theme.font,
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
