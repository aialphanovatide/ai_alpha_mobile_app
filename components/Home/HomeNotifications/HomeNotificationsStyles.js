import {useContext} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useHomeNotificationsStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    mainSection: {
      flex: 1,
      width: theme.width,
      backgroundColor: 'transparent',
      paddingHorizontal: 10,
    },
    background: {
      flex: 1,
      backgroundColor: 'transparent',
      width: theme.width,
      paddingHorizontal: 10,
    },
    container: {
      width: '100%',
      marginVertical: theme.boxesVerticalMargin,
      borderRadius: 4,
    },
    title: {
      marginTop: theme.titlesVerticalMargin,
      marginHorizontal: 28,
      color: theme.titleColor,
      fontSize: 25,
      fontFamily: theme.fontMedium,
      textAlign: 'left',
    },
    backButtonWrapper: {
      marginHorizontal: 20,
      marginTop: 36,
    },
    timeframeContainer: {
      flex: 1,
      width: '100%',
      padding: 4,
    },
    sectionDescription: {
      width: '90%',
      marginHorizontal: 28,
      marginBottom: 28,
      fontSize: 14,
      fontFamily: theme.font,
      color: theme.textColor,
      textAlign: 'left',
      lineHeight: 20,
    },
    activeRsButtonText: {
      color: '#fff',
      fontFamily: theme.fontMedium,
    },
    bellImage: {
      width: 23,
      height: 26,
      tintColor: theme.textColor,
    },
    notificationsButton: {
      position: 'absolute',
      top: '15%',
      right: '5%',
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2002,
    },
    timeFrameContainer: {
      height: 32,
      marginVertical: 8,
      flexDirection: 'row',
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 2,
    },
    timeFrameButton: {
      width: 36,
      padding: 4,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
    },
    timeFrameActiveButton: {
      width: 36,
      padding: 4,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.activeWhite,
      borderColor: theme.subMenuBgColor,
      borderWidth: 3,
      borderRadius: 4,
    },
    timeFrameButtonText: {
      color: theme.subMenuTextColor,
      fontSize: 12,
      fontFamily: theme.font,
    },
    timeFrameActiveButtonText: {
      color: theme.subMenuTextColor,
      fontFamily: theme.fontMedium,
      fontSize: 12,
    },
    notificationItem: {
      flexDirection: 'row',
      width: '100%',
      height: 60,
      marginVertical: 12,
      padding: 10,
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    imageContainer: {
      flex: 1,
      width: '10%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemImage: {
      width: 35,
      height: 35,
      borderRadius: 17.5,
      marginRight: 16,
    },
    itemContent: {
      width: '90%',
      flexDirection: 'column',
    },
    textRow: {
      width: '100%',
      marginBottom: 4,
      flexDirection: 'row',
      position: 'relative',
    },
    row: {
      flexDirection: 'row',
      width: '80%',
    },
    secondaryText: {
      fontSize: 12,
      color: theme.secondaryTextColor,
      fontFamily: theme.font,
      textTransform: 'capitalize',
    },
    itemTitle: {
      fontSize: 14,
      marginBottom: 2,
      fontFamily: theme.fontMedium,
      color: theme.textColor,
    },
    itemDescription: {
      fontSize: 12,
      color: theme.textColor,
      fontFamily: theme.font,
    },
    redDot: {
      width: 4,
      height: 4,
      marginHorizontal: 4,
      borderRadius: 2,
      backgroundColor: '#E93334',
      alignSelf: 'center',
    },
    divider: {
      width: '75%',
      marginVertical: 8,
      alignSelf: 'center',
      borderBottomColor: theme.secondaryGrayColor,
      borderBottomWidth: 1,
    },
  });
  return styles;
};

export default useHomeNotificationsStyles;
