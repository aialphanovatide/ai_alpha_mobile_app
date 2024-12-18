import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../context/themeContext';

const useAlertsStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    gradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    mainContainer: {
      flex: 1,
    },
    background: {
      flex: 1,
      padding: 10,
    },
    title: {
      margin: 12,
      marginHorizontal: 24,
      fontSize: theme.titleFontSize,
      fontFamily: theme.fontSemibold,
      color: theme.titleColor,
      alignSelf: 'flex-start',
    },
    noAlertsContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noAlerts: {
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: theme.responsiveFontSize,
      fontFamily: theme.fontBoldItalic,
      color: theme.secondaryTextColor,
      alignSelf: 'center',
    },
    itemsContainer: {
      position: 'relative',
      minHeight: 90,
      flexDirection: 'row',
      backgroundColor: theme.boxesBackgroundColor,
      marginVertical: 4,
      borderRadius: 2,
      padding: 6,
      paddingVertical: 8,
      flex: 1,
    },
    leftContent: {
      flex: 1,
      margin: 2,
    },
    itemsTitle: {
      marginHorizontal: 4,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.9,
      fontFamily: theme.fontSemibold,
      lineHeight: 22,
    },
    noHorizontalMargin: {
      marginHorizontal: 0,
    },
    subtitle: {
      maxWidth: '70%',
      marginHorizontal: 4,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.font,
      lineHeight: 22,
    },
    rightContent: {
      position: 'absolute',
      right: 12,
      margin: 4,
    },
    rightTitle: {
      marginHorizontal: 4,
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.fontSemibold,
      color: theme.textColor,
      lineHeight: 22,
    },
    price: {
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.fontSemibold,
    },
    buttonContainer: {
      flexDirection: 'row',
      marginVertical: theme.boxesVerticalMargin,
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 2,
      alignSelf: 'center',
    },
    button: {
      padding: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeButton: {
      backgroundColor: theme.activeWhite,
      borderColor: theme.subMenuBgColor,
      borderWidth: 2,
      borderRadius: 4,
    },
    activeText: {
      color: theme.subMenuTextColor,
      fontSize: theme.responsiveFontSize * 0.875,
      textTransform: 'uppercase',
      fontFamily: theme.fontMedium,
    },
    inactiveText: {
      color: theme.subMenuTextColor,
      fontSize: theme.responsiveFontSize * 0.875,
      textTransform: 'uppercase',
      fontFamily: theme.font,
    },
    row: {
      flexDirection: 'row',
    },
    priceAndStateWord: {
      position: 'absolute',
      top: 0,
      right: 0,
      margin: 4,
      padding: 2,
      alignItems: 'flex-end',
    },
    dateContainer: {
      marginVertical: 4,
      paddingTop: 4,
      justifyContent: 'space-between',
    },
    secondaryData: {
      fontSize: theme.responsiveFontSize * 0.75,
      fontFamily: theme.fontMedium,
      color: theme.secondaryTextColor,
    },
    dateIcon: {
      width: 14,
      height: 14,
      alignSelf: 'center',
      marginHorizontal: 4,
      tintColor: theme.secondaryTextColor,
    },
    column: {
      flex: 1,
      flexDirection: 'column',
    },
  });
  return styles;
};

export default useAlertsStyles;
