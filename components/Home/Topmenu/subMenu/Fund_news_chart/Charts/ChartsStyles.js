import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../context/themeContext';

const useChartsStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: theme.mainBackgroundColor,
    },
    scroll: {
      width: theme.width,
      backgroundColor: theme.mainBackgroundColor,
      paddingHorizontal: 10,
    },
    detailsContainer: {
      flex: 1,
      marginVertical: theme.titlesVerticalMargin,
      flexDirection: 'row',
      width: '100%',
    },
    detailslabel: {
      marginHorizontal: 10,
      textTransform: 'uppercase',
      fontSize: theme.responsiveFontSize,
      fontWeight: 'bold',
      color: theme.textColor,
    },
    lastPrice: {
      textTransform: 'uppercase',
      fontSize: theme.responsiveFontSize,
      marginLeft: 10,
      fontWeight: 'bold',
      color: theme.textColor,
    },
    timeFrameContainer: {
      flex: 1,
      flexDirection: 'row',
      marginTop: theme.boxesVerticalMargin,
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 2,
    },
    timeFrameButton: {
      flex: 1,
      width: '25%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
    },
    timeFrameActiveButton: {
      flex: 1,
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
      fontSize: theme.responsiveFontSize * 0.8,
    },
    timeFrameActiveButtonText: {
      color: theme.secondaryTextColor,
      textTransform: 'uppercase',
      fontWeight: 'bold',
      fontSize: theme.responsiveFontSize * 0.8,
    },
    rsButtonContainer: {
      flexDirection: 'row',
      width: '100%',
      marginTop: 8,
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
      color: theme.textColor,
    },
    activeRsButtonText: {
      color: theme.activeSRButtonColor,
    },
    chartContainer: {
      justifyContent: 'top',
      alignItems: 'top',
      width: '100%',
      height: 300,
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 2,
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
      width: 60,
      height: 60,
      opacity: 0.8,
    },
    chartsWrapper: {
      flex: 1,
      padding: 8,
      marginVertical: theme.boxesVerticalMargin,
      backgroundColor: theme.boxesBackgroundColor,
      alignItems: 'center',
      borderRadius: 2,
    },
    alertMenuContainer: {
      paddingVertical: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    alertMenuTitle: {
      marginVertical: theme.titlesVerticalMargin,
      marginHorizontal: 10,
      fontSize: theme.titleFontSize,
      fontWeight: 'bold',
      color: theme.textColor,
      alignSelf: 'flex-start',
    },
    alertMenuButtonContainer: {
      marginVertical: theme.boxesVerticalMargin,
      flexDirection: 'row',
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 2,
    },
    alertMenuButton: {
      width: '33.33%',
      padding: 5,
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
      fontWeight: 'bold',
      color: theme.filterTextColor,
      textTransform: 'capitalize',
      fontSize: theme.responsiveFontSize * 0.8,
    },
    alertMenuInactiveText: {
      color: theme.subMenuTextColor,
      textTransform: 'capitalize',
      fontSize: theme.responsiveFontSize * 0.8,
    },
    alertListContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginVertical: 15,
    },
    alertsTextMessage: {
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: theme.responsiveFontSize,
      fontWeight: 'bold',
      fontStyle: 'italic',
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
      padding: 4,
      flex: 1,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 1,
    },
    alertDetailsLeftContent: {
      flex: 1,
      margin: 2,
    },
    alertsRow: {
      flexDirection: 'row',
      marginHorizontal: 8,
    },
    alertDetailsRightContent: {
      position: 'absolute',
      right: 12,
      margin: 4,
    },
    alertDetailsTitle: {
      marginHorizontal: 4,
      fontSize: theme.responsiveFontSize * 0.9,
      fontWeight: 'bold',
      color: theme.textColor,
      lineHeight: 22,
    },
    alertDetailsSubtitle: {
      marginHorizontal: 10,
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.textColor,
      lineHeight: 22,
    },
    alertDetailsRightTitle: {
      marginVertical: 4,
      fontSize: theme.responsiveFontSize * 0.8,
      fontWeight: 'bold',
      color: theme.textColor,
    },
  });
  return styles;
};

export default useChartsStyles;
