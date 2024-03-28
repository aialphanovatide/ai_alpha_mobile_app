import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../context/themeContext';

const useCryptoCalendarStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    cryptoCalendarTitle: {
      paddingVertical: 2.5,
      paddingHorizontal: 15,
      color: theme.titleColor,
      fontSize: theme.responsiveFontSize * 0.85,
    },
    container: {
      flex: 1,
      width: '100%',
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    loaderContainer: {
      flex: 1,
      width: theme.width - 20,
      minHeight: 160,
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentCenter: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    eventsContainer: {
      flex: 1,
      width: theme.width - 20,
    },
    calendarItem: {
      flex: 1,
      maxWidth: '100%',
      flexDirection: 'row',
      marginVertical: 4,
      paddingVertical: 8,
      paddingHorizontal: 4,
      borderRadius: 4,
      backgroundColor: theme.boxesBackgroundColor,
    },
    itemIconContainer: {
      width: 45,
      height: 45,
      marginHorizontal: 8,
    },
    itemIconImage: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 2,
      borderRadius: 22.5,
    },
    coinName: {
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.75,
      fontFamily: theme.fontMedium,
      textAlign: 'center',
    },
    itemInfo: {
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.font,
      color: theme.secondaryTextColor,
      marginHorizontal: 2.5,
    },
    topDataRow: {
      position: 'relative',
      paddingVertical: 5,
      marginVertical: 10,
      marginHorizontal: 20,
      flexDirection: 'row',
    },
    date: {
      position: 'absolute',
      right: '10%',
      flexDirection: 'row',
    },
    tags: {
      position: 'absolute',
      left: 5,
      flexDirection: 'row',
    },
    timeIconContainer: {
      marginHorizontal: 4,
      marginVertical: 2,
      width: 15,
      height: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    timeIcon: {
      flex: 1,
      tintColor: theme.textColor,
    },
    itemTitle: {
      paddingVertical: 10,
      marginHorizontal: theme.width * 0.05,
      fontFamily: theme.fontSemibold,
      fontSize: theme.responsiveFontSize,
      color: theme.titleColor,
    },
    dataColumn: {
      width: '90%',
    },
    cryptoFilter: {
      minHeight: 70,
      maxWidth: '100%',
      flexDirection: 'row',
      marginVertical: 10,
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 3,
    },
    cryptoItem: {
      width: theme.width * 0.175,
      marginVertical: 4,
      marginHorizontal: 4,
      padding: 2.5,
      borderRadius: 3,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    cryptoIconContainer: {
      width: 35,
      height: 35,
      margin: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cryptoIcon: {
      flex: 1,
    },
    activeCryptoItem: {
      backgroundColor: theme.activeWhite,
    },
    activeCryptoName: {
      color: theme.secondaryTextColor,
      fontFamily: theme.fontSemibold,
    },
    cryptoName: {
      fontSize: theme.responsiveFontSize * 0.6,
      color: theme.subMenuTextColor,
      fontFamily: theme.fontMedium,
      textAlign: 'center',
    },
    messageContainer: {
      width: '80%',
      marginVertical: theme.boxesVerticalMargin,
      marginHorizontal: 'auto',
      alignSelf: 'center',
    },
    emptyEventsMessage: {
      textAlign: 'center',
      color: theme.secondaryTextColor,
      fontSize: theme.responsiveFontSize * 0.9,
      fontFamily: theme.fontBoldItalic,
    },
    flex: {
      flex: 1,
      width: '100%',
    },
  });
  return styles;
};

export default useCryptoCalendarStyles;
