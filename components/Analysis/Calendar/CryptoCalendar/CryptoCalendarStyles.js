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
      width: theme.width - 20,
      backgroundColor: theme.mainBackgroundColor,
    },
    contentCenter: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    eventsContainer: {
      flex: 1,
    },
    calendarItem: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      marginHorizontal: '5%',
      marginVertical: 5,
      padding: 10,
      backgroundColor: theme.secondaryBoxesBgColor,
    },
    itemIconContainer: {
      width: 60,
      height: 45,
      marginRight: '5%',
    },
    itemIconImage: {
      width: '90%',
      height: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 2.5,
      marginVertical: 2,
      borderRadius: 27.5,
    },
    coinName: {
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.75,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    itemInfo: {
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.secondaryItemColor,
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
      width: 25,
      height: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    timeIcon: {
      flex: 1,
      tintColor: theme.secondaryItemColor,
    },
    itemTitle: {
      paddingVertical: 10,
      marginHorizontal: theme.width * 0.05,
      fontSize: theme.responsiveFontSize,
      color: theme.titleColor,
      fontWeight: 'bold',
    },
    dataColumn: {
      width: '90%',
    },
    cryptoFilter: {
      minHeight: 80,
      flexDirection: 'row',
      margin: 10,
      paddingVertical: 5,
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 5,
    },
    cryptoItem: {
      width: theme.width * 0.125,
      marginVertical: 2.5,
      marginHorizontal: 5,
      padding: 2.5,
      borderRadius: 5,
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
    },
    cryptoName: {
      fontSize: theme.responsiveFontSize * 0.7,
      color: theme.subMenuTextColor,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    messageContainer: {
      width: '80%',
      marginVertical: 20,
      marginHorizontal: 'auto',
      alignSelf: 'center',
      borderRadius: 10,
      borderColor: theme.textColor,
      borderWidth: 2,
    },
    emptyEventsMessage: {
      textAlign: 'center',
      padding: 10,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.9,
      fontWeight: 'bold',
    },
  });
  return styles;
};

export default useCryptoCalendarStyles;
