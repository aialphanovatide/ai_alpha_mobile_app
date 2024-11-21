import {StyleSheet} from 'react-native';
import {useContext} from 'react';
import {AppThemeContext} from '../../../context/themeContext';

const useNewNotificationsStyles = () => {
  const {theme, isDarkMode} = useContext(AppThemeContext);

  return StyleSheet.create({
    container: {
      flex: 1,
      width: theme.width,
      backgroundColor: theme.mainBackgroundColor,
      paddingHorizontal: 10,
      paddingTop: 24,
      paddingBottom: 10,
    },
    mainContainer: {
      alignContent: 'center',
      fontFamily: theme.fontSemibold,
    },
    backButtonContainer: {},
    title: {
      marginTop: theme.titlesVerticalMargin,
      marginHorizontal: 16,
      fontSize: 25,
      color: theme.titleColor,
      fontFamily: theme.fontMedium,
    },
    subtitle: {
      fontSize: theme.responsiveFontSize,
      color: theme.titleColor,
      lineHeight: 22,
      fontFamily: theme.font,
    },
    itemContainer: {
      position: 'relative',
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      padding: 6,
      marginVertical: 4,
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 2,
    },
    itemName: {
      marginRight: 20,
      marginLeft: 16,
      fontSize: 14,
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
      marginLeft: 8,
      paddingTop: 14,
      backgroundColor: isDarkMode
        ? 'transparent'
        : theme.notificationsSwitchColor,
    },
    horizontalLine: {
      width: '100%',
      borderBottomColor: theme.notificationsHorizontalLineColor,
      borderBottomWidth: 1,
      alignSelf: 'flex-end',
    },
    switch: {
      marginBottom: 5,
      transform: [{scaleX: 0.85}, {scaleY: 0.85}],
    },
    allNotificationsItem: {
      width: '95%',
      marginVertical: 8,
      padding: 8,
      paddingVertical: 15,
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 2,
      alignSelf: 'center',
    },
    itemsContainer: {
      width: '95%',
      paddingVertical: 8,
      paddingHorizontal: 4,
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
      marginLeft: 14,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      borderRadius: 15,
    },
    timeIntervalNumber: {
      fontSize: 12,
      color: theme.subMenuTextColor,
      fontFamily: theme.fontMedium,
      paddingHorizontal: 4,
      paddingVertical: 2,
      marginHorizontal: 2,
    },
    timeIntervalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 2,
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 2,
    },
    timeIntervalItem: {
      borderColor: theme.subMenuBgColor,
      borderRadius: 4,
      borderWidth: 2,
    },
    activeTimeIntervalItem: {
      backgroundColor: theme.activeWhite,
    },
    activeTimeIntervalNumber: {
      color: theme.subMenuTextColor,
    },
    arrowContainer: {
      position: 'absolute',
      right: 14,
    },
    arrow: {
      width: 14,
      height: 14,
      tintColor: theme.secondaryGrayColor,
    },
    expandedItem: {
      position: 'relative',
      width: '100%',
      padding: 6,
      marginVertical: 4,
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 2,
    },
    switchRow: {
      width: '100%',
      padding: 4,
      marginVertical: 4,
    },
    optionTitle: {
      fontFamily: theme.font,
      color: theme.textColor,
      fontSize: 14,
    }
  });
};

export default useNewNotificationsStyles;
