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
    },
    detailsContainer: {
      flex: 1,
      marginVertical: theme.titlesVerticalMargin,
      marginBottom: 8,
      flexDirection: 'row',
      width: '100%',
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
    shortTimeFrame: {
      width: '45%',
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
      width: '50%',
    },
    rsButton: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderWidth: 1,
      borderRadius: 4,
      margin: 4,
      backgroundColor: theme.secondaryBoxesBgColor,
    },
    rsButtonText: {
      textTransform: 'capitalize',
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.supportAndResistanceText,
      fontFamily: theme.font,
    },
    activeRsButtonText: {
      color: theme.supportAndResistanceText,
      fontFamily: theme.fontMedium,
    },
    chartsRow: {
      flex: 1,
      flexDirection: 'row',
      marginBottom: 16,
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
      borderRadius: 2,
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
      padding: 8,
      alignItems: 'center',
      borderRadius: 2,
    },
    alertMenuContainer: {
      paddingVertical: 6,
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
      flexDirection: 'row',
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 2,
    },
    alertMenuButton: {
      width: '33.33%',
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
      // justifyContent: 'center',
      // alignItems: 'center',
      width: '100%',
      marginVertical: 15,
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    alertsTextMessage: {
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: theme.responsiveFontSize,
      fontFamily: theme.fontBoldItalic,
      color: theme.secondaryTextColor,
      alignSelf: 'center',
    },
    alertDetailsContainer: {
      position: 'relative',
      minHeight: 80,
      flexDirection: 'row',
      backgroundColor: theme.boxesBackgroundColor,
      marginVertical: 4,
      borderRadius: 2,
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
      alignItems: 'flex-end'
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
  });
  return styles;
};

export default useChartsStyles;
