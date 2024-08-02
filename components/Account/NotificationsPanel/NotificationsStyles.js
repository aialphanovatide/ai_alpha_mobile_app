import {StyleSheet} from 'react-native';
import {useContext} from 'react';
import {AppThemeContext} from '../../../context/themeContext';

const useNotificationsStyles = () => {
  const {theme, isDarkMode} = useContext(AppThemeContext);

  return StyleSheet.create({
    container: {
      flex: 1,
      width: theme.width,
      backgroundColor: theme.mainBackgroundColor,
      padding: 10,
    },
    mainContainer: {
      alignContent: 'center',
      fontFamily: theme.fontSemibold,
    },
    backButtonContainer: {
    },
    title: {
      marginTop: theme.titlesVerticalMargin,
      marginHorizontal: 16,
      fontSize: 25,
      color: theme.titleColor,
      fontFamily: theme.fontMedium,
    },
    subtitle: {
      marginVertical: 4,
      marginBottom: -5,
      marginHorizontal: 37,
      marginLeft: 23,
      fontSize: theme.responsiveFontSize,
      color: theme.titleColor,
      lineHeight: 22,
      fontFamily: theme.font,
    },
    itemContainer: {
      position: 'relative',
      width: '90%',
      padding: 1,
      flexDirection: 'row',
      alignSelf: 'center',
      fontFamily: theme.fontSemibold,
    },
    itemName: {
      marginRight: 20,
      marginLeft: 20,
      fontSize: 16,
      color: theme.textColor,
      lineHeight: 22,
      alignSelf: 'center',
      fontFamily: theme.font,
    },
    allNotificationsItemName: {
      marginLeft: 5,
      fontSize: 16,
      color: theme.textColor,
      lineHeight: 22,
      alignSelf: 'flex-start',
      fontFamily: theme.font,
    },
    rightContent: {
      flexDirection: 'row',
      position: 'absolute',
      right: 4,
      top: 4,
      fontFamily: theme.fontSemibold,
    },
    switchContainer: {
      width: 45,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginLeft: 20,
      backgroundColor: isDarkMode
        ? 'transparent'
        : theme.notificationsSwitchColor,
    },
    allNotificationsSwitchContainer: {
      width: 45,
      height: 40,
      borderRadius: 10,
      paddingTop: 7,
      backgroundColor: isDarkMode
        ? 'transparent'
        : theme.notificationsSwitchColor,
    },
    horizontalLine: {
      width: '80%',
      borderBottomColor: theme.secondaryItemColor,
      borderBottomWidth: 1,
      alignSelf: 'flex-end',
      marginRight: 15,
    },
    switch: {
      transform: [{scaleX: 0.85}, {scaleY: 0.85}],
    },
    allNotificationsItem: {
      width: '100%',
      marginVertical: 8,
      padding: 8,
      paddingVertical: 15,
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 2,
      alignSelf: 'center',
    },
    itemsContainer: {
      width: '100%',
      paddingVertical: 8,
      paddingHorizontal: 4,
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 2,
      alignContent: 'center',
      alignSelf: 'center',
    },
    row: {
      width: '100%',
      flexDirection: 'row',
      marginVertical: theme.boxesVerticalMargin,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      fontFamily: theme.fontSemibold,
    },
    iconImage: {
      width: 30,
      height: 30,
      marginLeft: -15,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      borderRadius: 15,
    },
  });
};

export default useNotificationsStyles;
