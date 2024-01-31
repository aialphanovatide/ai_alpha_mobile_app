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
      width: '100%',
      backgroundColor: theme.mainBackgroundColor,
    },
    detailsContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      // borderColor: 'dark',
      // borderWidth: 1,
      paddingVertical: 10,
    },
    detailsSubContainer: {
      flexDirection: 'row',
      width: '90%',
    },
    detailslabel: {
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
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      marginTop: 10,
    },
    timeFrameSubContainer: {
      flexDirection: 'row',
      width: '90%',
    },
    timeFrameButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.subMenuBgColor,
      paddingVertical: 3,
    },
    timeFrameActiveButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.subMenuTextColor,
      paddingVertical: 3,
      borderColor: theme.subMenuBgColor,
      borderWidth: 1,
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
      justifyContent: 'center',
      width: '100%',
      marginTop: 10,
    },
    rsButtonSubContainer: {
      flexDirection: 'row',
      width: '90%',
    },
    rsButton: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderWidth: 1,
      borderRadius: 2,
      margin: 5,
      backgroundColor: theme.secondaryBoxesBgColor,
    },
    rsButtonText: {
      textTransform: 'uppercase',
      fontSize: theme.responsiveFontSize * 0.8,
    },
    chartContainer: {
      justifyContent: 'top',
      alignItems: 'top',
      width: '100%',
      height: 300,
      // borderWidth: 2,
      // borderColor: 'black',
      backgroundColor: theme.boxesBackgroundColor,
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
      width: 50,
      height: 50,
    },
    alertMenuContainer: {
      paddingVertical: 5,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    alertMenuTitle: {
      marginVertical: theme.titlesVerticalMargin,
      fontSize: theme.titleFontSize,
      fontWeight: 'bold',
      color: theme.textColor,
    },
    alertMenuButtonContainer: {
      marginVertical: theme.boxesVerticalMargin,
      flexDirection: 'row',
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 4,
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
      textTransform: 'capitalize'
    },
    alertMenuInactiveText: {
      color: theme.subMenuTextColor,
      textTransform: 'capitalize',
    },
    alertListContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginVertical: 15,
      padding: '5%',
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
      flexDirection: 'row',
      backgroundColor: theme.boxesBackgroundColor,
      marginVertical: theme.boxesVerticalMargin,
      borderRadius: 2,
      padding: 8,
      flex: 1,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 2,
    },
    alertDetailsLeftContent: {
      flex: 1,
      marginHorizontal: '2.5%',
    },
    alertDetailsRightContent: {
      position: 'absolute',
      right: 12,
      top: 12,
    },
    alertDetailsTitle: {
      fontSize: theme.responsiveFontSize,
      fontWeight: 'bold',
      color: theme.textColor,
      padding: 2.5,
    },
    alertDetailsSubtitle: {
      fontSize: theme.responsiveFontSize,
      color: theme.textColor,
      padding: 5,
    },
    alertDetailsRightTitle: {
      fontSize: theme.responsiveFontSize * 0.8,
      fontWeight: 'bold',
      color: theme.textColor,
    },
  });
  return styles;
};

export default useChartsStyles;
