import {useContext} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../context/themeContext';

const useChartsStyles = () => {
  const {theme, isDarkMode} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: 'transparent',
    },
    scroll: {
      width: theme.width,
      backgroundColor: 'transparent',
      paddingHorizontal: 12,
      paddingBottom: 10,
    },
    detailsContainer: {
      flex: 1,
      marginTop: 24,
      marginBottom: 0,
      flexDirection: 'row',
      width: '100%',
    },
    detailslabel: {
      marginLeft: 22,
      marginRight: 10,
      textTransform: 'uppercase',
      fontSize: theme.titleFontSize,
      color: theme.textColor,
      fontFamily: theme.fontSemibold,
    },
    lastPrice: {
      textTransform: 'uppercase',
      fontSize: 24,
      marginTop: -6,
      marginLeft: 10,
      color: theme.textColor,
      fontFamily: theme.font,
    },
    timeFrameContainer: {
      height: 28,
      marginVertical: 8,
      flexDirection: 'row',
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 2,
      // marginRight: 20,
    },
    timeFrameButton: {
      width: 36,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
    },
    timeFrameActiveButton: {
      width: 36,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.activeWhite,
      borderColor: theme.subMenuBgColor,
      borderWidth: 3,
      borderRadius: 4,
    },
    activeTimeFrame: {
      backgroundColor: theme.activeWhite,
      borderColor: theme.subMenuBgColor,
      borderWidth: 3,
    },
    timeFrameButtonText: {
      color: theme.subMenuTextColor,
      textTransform: 'uppercase',
      fontSize: 12,
      fontFamily: theme.font,
    },
    activeText: {
      fontFamily: theme.fontMedium,
    },
    rsButtonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      alignSelf: 'flex-start',
    },
    rsButton: {
      paddingHorizontal: 4,
      paddingVertical: 4,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      margin: 1.5,
      width: '25%',
      backgroundColor: theme.secondaryBoxesBgColor,
    },
    rsButtonText: {
      textTransform: 'capitalize',
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.supportAndResistanceText,
      fontFamily: theme.font,
    },
    activeRsButtonText: {
      color: '#fff',
      fontFamily: theme.fontMedium,
    },
    chartsRow: {
      flex: 1,
      width: '100%',
      marginBottom: 8,
      marginTop: 10,
      justifyContent: 'flex-start',
    },
    lineLabel: {
      flex: 1,
      padding: 4,
      borderRadius: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    chartContainer: {
      width: '100%',
      height: theme.height * 0.45,
      marginVertical: 8,
      justifyContent: 'center',
      alignItems: 'top',
      borderRadius: 4,
    },
    loaderContainer: {
      flex: 1,
      width: '100%',
      minHeight: theme.height,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.mainBackgroundColor,
    },
    chart: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    chartBackgroundImage: {
      width: 52,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: '8.5%',
      left: '2%',
      opacity: 0.5,
      tintColor: '#A3A3A350',
    },
    chartMainContainer: {
      width: '100vw',
      height: '100vh',
    },
    chartsWrapper: {
      flex: 1,
      padding: 0,
      width: '100%',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 2,
    },
    chartsHorizontalButtonContainer: {
      position: 'absolute',
      bottom: 50,
      left: 25,
      width: 90,
      height: 90,
    },
    chartsHorizontalButton: {
      width: 24,
      height: 24,
      position: 'relative',
      bottom: Platform.OS === 'android' ? 100 : 120,
      left: Platform.OS === 'android' ? 10 : 10,
      tintColor: theme.textColor,
      zIndex: 1,
    },
    chartsZoomIndicator: {
      width: 20,
      height: 24,
      position: 'absolute',
      bottom: Platform.OS === 'android' ? 85 : 100,
      right: 65,
      tintColor: isDarkMode ? '#737373' : '#A3A3A3',
    },
    chartBackButton: {
      width: 35,
      height: 35,
      position: 'absolute',
      bottom: 280,
      right: 30,
      tintColor: theme.textColor,
    },
    alertMenuContainer: {
      paddingVertical: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    alertMenuTitle: {
      marginHorizontal: 22,
      fontSize: 16,
      color: theme.textColor,
      alignSelf: 'flex-start',
      fontFamily: theme.fontSemibold,
    },
    alertMenuButtonContainer: {
      marginVertical: theme.boxesVerticalMargin,
      flexDirection: 'row',
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 2,
    },
    alertMenuButton: {
      padding: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    alertMenuActiveButton: {
      backgroundColor: theme.activeWhite,
      borderColor: theme.subMenuBgColor,
      borderWidth: 2,
      borderRadius: 3,
    },
    alertMenuActiveText: {
      fontFamily: theme.fontMedium,
      color: theme.subMenuTextColor,
      textTransform: 'uppercase',
      fontSize: theme.responsiveFontSize * 0.8,
    },
    alertMenuInactiveText: {
      fontFamily: theme.font,
      color: theme.subMenuTextColor,
      textTransform: 'uppercase',
      fontSize: theme.responsiveFontSize * 0.8,
    },
    alertListContainer: {
      width: '100%',
      marginBottom: 15,
      minHeight: 50,
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 300,
    },
    alertsTextMessage: {
      margin: theme.boxesVerticalMargin,
      fontSize: 14,
      color: theme.secondaryTextColor,
      alignSelf: 'flex-start',
      fontFamily: theme.fontBoldItalic,
      textAlign: 'left',
    },
    alertDetailsContainer: {
      position: 'relative',
      minHeight: 80,
      flexDirection: 'row',
      backgroundColor: theme.boxesBackgroundColor,
      marginVertical: 4,
      borderRadius: 5,
      padding: 6,
      paddingVertical: 8,
      flex: 1,
    },
    alertDetailsLeftContent: {
      flex: 1,
      margin: 2,
    },
    alertsRow: {
      position: 'relative',
      flexDirection: 'row',
    },
    dateRow: {
      flexDirection: 'row',
    },
    alertsDateContainer: {
      marginVertical: 4,
      paddingTop: 4,
      justifyContent: 'space-between',
    },
    alertsSecondaryData: {
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
    alertDetailsRightContent: {
      position: 'absolute',
      right: 12,
      margin: 4,
    },
    alertDetailsTitle: {
      marginHorizontal: 4,
      fontFamily: theme.fontSemibold,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.95,
      lineHeight: 18,
    },
    noHorizontalMargin: {
      marginHorizontal: 0,
    },
    alertDetailsSubtitle: {
      maxWidth: '70%',
      marginHorizontal: 4,
      color: theme.textColor,
      fontFamily: theme.font,
      fontSize: theme.responsiveFontSize * 0.85,
      lineHeight: 21,
    },
    alertDetailsRightTitle: {
      marginVertical: 4,
      fontSize: theme.responsiveFontSize * 0.9,
      fontFamily: theme.fontSemibold,
      color: theme.textColor,
    },
    alertsPriceAndWord: {
      position: 'absolute',
      top: 0,
      right: 0,
      margin: 4,
      padding: 2,
      alignItems: 'flex-end',
    },
    price: {
      fontSize: theme.responsiveFontSize * 0.9,
      fontFamily: theme.fontSemibold,
    },
    priceUpColor: {
      color: theme.priceUpColor,
    },
    priceDownColor: {
      color: theme.priceDownColor,
    },
    titleRow: {
      width: '100%',
      marginVertical: theme.boxesVerticalMargin,
      flexDirection: 'row',
    },
    fibonacciContainer: {
      position: 'relative',
    },
    pairingsMenuContainer: {
      flex: 1,
      maxWidth: '100%',
      height: 28,
      marginVertical: 4,
      marginTop: 8,
      flexDirection: 'row',
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 2,
    },
    pairingButton: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
    },
    pairingActiveButton: {
      backgroundColor: theme.activeWhite,
      borderColor: theme.subMenuBgColor,
      borderWidth: 3,
    },
    pairingButtonText: {
      color: theme.subMenuTextColor,
      textTransform: 'uppercase',
      fontSize: 12,
      fontFamily: theme.fontMedium,
    },
    pairingActiveText: {
      fontFamily: theme.fontSemibold,
    },
    menuRow: {
      width: '100%',
      flexDirection: 'row',
    },
    column: {
      flexDirection: 'column',
    },
    capitalize: {
      textTransform: 'capitalize',
    },
    flexRow: {
      flexDirection: 'row',
    },
    refreshButton: {
      width: 20,
      height: 20,
      marginLeft: 10,
      tintColor: isDarkMode ? '#FFFFFF' : '#4D4D4D',
    },
  });
  return styles;
};

export default useChartsStyles;
