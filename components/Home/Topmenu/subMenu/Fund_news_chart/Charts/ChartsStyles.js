import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../context/themeContext';

const useChartsStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: 'transparent',
    },
    scroll: {
      width: theme.width,
      backgroundColor: 'transparent',
      paddingHorizontal: 10,
      paddingBottom: 10,
    },
    detailsContainer: {
      flex: 1,
      marginVertical: theme.titlesVerticalMargin,
      marginBottom: 0,
      flexDirection: 'row',
      width: '100%',
      // borderWidth: 2,
      // borderColor: '#282828'
    },
    detailslabel: {
      marginHorizontal: 10,
      textTransform: 'uppercase',
      fontSize: theme.titleFontSize,
      color: theme.textColor,
      fontFamily: theme.fontSemibold,
    },
    lastPrice: {
      textTransform: 'uppercase',
      fontSize: theme.titleFontSize,
      marginLeft: 10,
      color: theme.textColor,
      fontFamily: theme.fontSemibold,
    },
    timeFrameContainer: {
      flex: 1,
      maxWidth: '40%',
      marginVertical: 4,
      flexDirection: 'row',
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 2,
    },
    timeFrameButton: {
      width: '25%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
    },
    timeFrameActiveButton: {
      width: '25%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.activeWhite,
      borderColor: theme.subMenuBgColor,
      borderWidth: 2,
      borderRadius: 4,
    },
    timeFrameButtonText: {
      color: theme.subMenuTextColor,
      textTransform: 'uppercase',
      fontSize: theme.responsiveFontSize * 0.825,
      fontFamily: theme.fontMedium,
    },
    timeFrameActiveButtonText: {
      color: theme.subMenuTextColor,
      textTransform: 'uppercase',
      fontFamily: theme.fontSemibold,
      fontSize: theme.responsiveFontSize * 0.825,
    },
    rsButtonContainer: {
      flexDirection: 'row',
      width: '100%',
      flexWrap: 'wrap',
      marginTop: 10,
      alignItems: 'flex-start',
    },
    rsButton: {
      paddingHorizontal: 4,
      paddingVertical: 4,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      margin: 1.5,
      width: '24%',
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
      width: 370,
      flexDirection: 'column',
      marginBottom: 16,
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
      justifyContent: 'top',
      alignItems: 'top',
      width: '100%',
      height: 300,
      position: 'relative'
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
      // borderColor: 'black',
      // borderWidth: 2
    },
    chartBackgroundImage: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: '5%',
      left: '5%',
      width: 60,
      height: 60,
      opacity: 0.8,
    },
    chartsWrapper: {
      flex: 1,
      padding: 0,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 2,
    },
    alertMenuContainer: {
      paddingVertical: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    alertMenuTitle: {
      marginVertical: theme.titlesVerticalMargin,
      marginHorizontal: 10,
      fontSize: theme.titleFontSize,
      color: theme.textColor,
      alignSelf: 'flex-start',
      fontFamily: theme.fontSemibold,
    },
    alertMenuButtonContainer: {
      width: '65%',
      marginVertical: theme.boxesVerticalMargin * 2.8,
      padding: 1,
      paddingHorizontal: 2,
      flexDirection: 'row',
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 2,
    },
    alertMenuButton: {
      paddingHorizontal: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    alertMenuActiveButton: {
      backgroundColor: theme.activeWhite,
      borderColor: theme.subMenuBgColor,
      borderWidth: 2,
      borderRadius: 4,
    },
    alertMenuActiveText: {
      fontFamily: theme.fontMedium,
      color: theme.subMenuTextColor,
      textTransform: 'capitalize',
      fontSize: theme.responsiveFontSize * 0.8,
    },
    alertMenuInactiveText: {
      fontFamily: theme.font,
      color: theme.subMenuTextColor,
      textTransform: 'capitalize',
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
      minHeight: 300
    },
    alertsTextMessage: {
      fontSize: theme.responsiveFontSize,
      fontFamily: theme.fontBoldItalic,
      color: theme.secondaryTextColor,
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
      flexDirection: 'row'
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
      flexDirection: 'row',
    },
    fibonacciContainer: {
      position: 'relative',
    },
    pairingsMenuContainer: {
      flex: 1,
      maxWidth: '100%',
      marginVertical: 4,
      marginTop: 8,
      flexDirection: 'row',
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 2,
    },
    pairingButton: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
    },
    pairingActiveButton: {
      backgroundColor: theme.activeWhite,
      borderColor: theme.subMenuBgColor,
      borderWidth: 2,
    },
    pairingButtonText: {
      color: theme.subMenuTextColor,
      textTransform: 'uppercase',
      fontSize: theme.responsiveFontSize * 0.9,
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
    }
  });
  return styles;
};

export default useChartsStyles;
