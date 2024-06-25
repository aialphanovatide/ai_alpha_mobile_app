import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../context/themeContext';

const useMacroEconomicCalendarStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    cryptoCalendarTitle: {
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
      width: '100%',
    },
    calendarItem: {
      flex: 1,
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
      marginTop: '5%',
      marginHorizontal: 8,
      alignSelf: 'flex-start',
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
      marginRight: 8,
      flexDirection: 'row',
    },
    date: {
      position: 'absolute',
      right: '10%',
      flexDirection: 'row',
    },
    hour: {
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
      width: '80%',
      paddingVertical: 10,
      marginHorizontal: 8,
      fontFamily: theme.fontSemibold,
      fontSize: theme.responsiveFontSize,
      color: theme.titleColor,
    },
    dataColumn: {
      width: '90%',
    },
    countriesFilter: {
      minHeight: 70,
      width: '100%',
      flexDirection: 'row',
      marginVertical: 8,
      marginHorizontal: 12,
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 3,
      alignSelf: 'center',
      justifyContent: 'space-evenly',
    },
    countryItem: {
      flex: 1,
      minWidth: theme.width * 0.29,
      marginVertical: 4,
      marginHorizontal: 4,
      padding: 2.5,
      borderRadius: 3,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    countryIconContainer: {
      width: 35,
      height: 35,
      margin: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    countryIcon: {
      flex: 1,
    },
    activeCountry: {
      backgroundColor: theme.activeWhite,
    },
    activeCountryName: {
      color: theme.subMenuTextColor,
      fontFamily: theme.fontSemibold,
    },
    countryName: {
      fontSize: theme.responsiveFontSize * 0.7,
      color: theme.secondaryTextColor,
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
      flexDirection: 'row',
      width: '100%',
    },
    dataText: {
      fontSize: theme.responsiveFontSize,
      fontFamily: theme.font,
      color: theme.textColor,
      marginHorizontal: 4,
    },
    row: {
      flexDirection: 'row',
      width: '90%',
      marginRight: 8,
      justifyContent: 'space-between',
    },
  });
  return styles;
};

export default useMacroEconomicCalendarStyles;
