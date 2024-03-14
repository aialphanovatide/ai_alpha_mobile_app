import {StyleSheet} from 'react-native';
import {useContext} from 'react';
import {AppThemeContext} from '../../../context/themeContext';

const useNotificationsStyles = () => {
  const {theme, isDarkMode} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: theme.width,
      backgroundColor: theme.mainBackgroundColor,
      padding: 10,
    },
    title: {
      marginVertical: theme.titlesVerticalMargin,
      marginHorizontal: 8,
      fontSize: theme.titleFontSize,
      fontWeight: 'bold',
      color: theme.titleColor,
      lineHeight: 22,
    },
    subtitle: {
      marginVertical: 4,
      marginHorizontal: 8,
      fontSize: theme.responsiveFontSize,
      fontWeight: 'bold',
      color: theme.titleColor,
      lineHeight: 22,
    },
    itemContainer: {
      position: 'relative',
      width: '100%',
      flexDirection: 'row',
      padding: 4,
    },
    itemName: {
      marginHorizontal: 12,
      fontSize: theme.responsiveFontSize,
      color: theme.textColor,
      lineHeight: 22,
      alignSelf: 'center'
    },
    rightContent: {
      flexDirection: 'row',
      position: 'absolute',
      right: 4,
      top: 4,
    },
    switchContainer: {
      width: 45,
      height: 25,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: isDarkMode
        ? 'transparent'
        : theme.notificationsSwitchColor,
    },
    horizontalLine: {
      width: '95%',
      borderBottomColor: theme.secondaryItemColor,
      borderBottomWidth: 1,
      alignSelf: 'center',
    },
    switch: {
      flex: 1,
    },
    allNotificationsItem: {
      width: '100%',
      marginVertical: 8,
      padding: 8,
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 2,
    },
    itemsContainer: {
      width: '100%',
      paddingVertical: 8,
      paddingHorizontal: 4,
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 2,
    },
    row: {
      width: '100%',
      flexDirection: 'row',
      marginVertical: theme.boxesVerticalMargin,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    iconImage: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      borderRadius: 15,
    }
  });
  return styles;
};

export default useNotificationsStyles;
