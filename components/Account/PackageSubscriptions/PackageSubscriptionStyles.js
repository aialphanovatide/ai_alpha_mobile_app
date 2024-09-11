import {StyleSheet} from 'react-native';
import {useContext} from 'react';
import {AppThemeContext} from '../../../context/themeContext';

const usePackageSubscriptionStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    gradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    backgroundContainer: {
      backgroundColor: theme.mainBackgroundColor,
    },
    container: {
      flex: 1,
    },
    scrollViewContent: {
      paddingBottom: 160, // Add some bottom padding to avoid content being hidden behind the fixed footer
    },
    innerContainer: {
      flex: 1,
      width: theme.width,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: theme.mainBackgroundColor,
    },
    flex: {
      flex: 1,
    },
    mainTitle: {
      marginTop: 11,
      marginBottom: 5,
      marginLeft: 15,
      marginVertical: theme.titlesVerticalMargin,
      color: theme.titleColor,
      fontSize: theme.titleFontSize * 1.25,
      fontFamily: theme.fontSemibold,
      textAlign: 'center',
      flexDirection: 'row',
      alignSelf: 'flex-start',
    },
    description: {
      marginVertical: theme.boxesVerticalMargin,
      marginTop: 4,
      marginHorizontal: 16,
    },
    secondaryText: {
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.82,
      fontFamily: theme.font,
      lineHeight: 22,
      textAlign: 'left',
      marginRight: 29,
    },
    preTertiaryText: {
      color: theme.subscriptions.secondaryText,
      fontSize: theme.responsiveFontSize * 0.75,
      fontFamily: theme.font,
      lineHeight: 22,
      textAlign: 'left',
      marginRight: 10,
    },
    tertiaryText: {
      color: theme.subscriptions.secondaryText,
      fontSize: theme.responsiveFontSize * 0.75,
      fontFamily: theme.font,
      lineHeight: 15,
      textAlign: 'center',
      marginRight: 10,
      marginTop: 1,
    },
    textRow: {
      textAlign: 'center',
      flexDirection: 'row', // Arrange icon and text in a row
      alignItems: 'center', // Vertically center the items
      marginBottom: 5,
      marginRight: 10,
    },
    textCenteredRow: {
      textAlign: 'center',
      marginBottom: 5,
    },
    textRowContainer: {
      marginBottom: 15,
    },
    packagesContainer: {
      width: '100%',
      marginVertical: theme.boxesVerticalMargin,
      padding: 10,
    },
    itemContainer: {
      flex: 1,
      flexDirection: 'column', // Change to column
      alignItems: 'flex-start', // Align items to the start
      padding: 10,
      backgroundColor: theme.backgroundSubscriptionsModal,
      marginVertical: 5,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    selectedItem: {
      borderColor: theme.activeOrange,
    },
    itemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    circleContainer: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.activeOrange,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      marginRight: 8,
    },
    subCircleContainer: {
      width: 18,
      height: 18,
      borderRadius: 11,
      borderWidth: 1,
      borderColor: theme.activeOrange,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      marginRight: 8,
      marginLeft: 3,
    },
    tickImage: {
      width: '110%',
      height: '110%',
      position: 'absolute',
    },
    subTickImage: {
      width: '110%',
      height: '110%',
      position: 'absolute',
    },
    itemIcon: {
      width: 27,
      height: 22,
      marginRight: 10,
      marginLeft: 5,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    title: {
      color: theme.subscriptions.text,
      fontSize: theme.titleFontSize * 0.91,
      fontFamily: theme.fontSemibold,
      flex: 1,
    },
    priceContainer: {
      alignItems: 'flex-end',
    },
    priceText: {
      color: theme.subscriptions.text,
      fontSize: theme.responsiveFontSize * 1.1,
      fontFamily: theme.fontBold,
    },
    perMonthText: {
      color: theme.subscriptions.secondaryText,
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.font,
      textAlign: 'right',
    },
    linearGradient: {
      width: '100%',
      height: 50,
      borderRadius: 3,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
    },
    purchaseButton: {
      width: '100%',
      paddingVertical: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    purchaseButtonText: {
      color: '#FFFFFF',
      fontSize: theme.titleFontSize * 0.9,
      fontFamily: theme.fontSemibold,
    },
    alignStart: {
      alignSelf: 'flex-start',
      marginVertical: theme.boxesVerticalMargin,
    },
    smallTickIcon: {
      width: 11,
      height: 11,
      marginRight: 8,
    },
    fixedFooter: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: theme.mainBackgroundColor,
      padding: 10,
      alignItems: 'center',
    },
    footerTextContainer: {
      alignItems: 'center',
      marginTop: -5,
      marginBottom: 30,
    },
    subOptionsContainer: {
      marginTop: 10,
      marginLeft: 0,
      flexDirection: 'column', // Ensure sub options are stacked vertically
      alignItems: 'flex-start', // Align sub options to the start
    },
    subOption: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    subOptionText: {
      color: theme.subscriptions.text,
      fontSize: theme.responsiveFontSize * 0.75,
      fontFamily: theme.font,
      marginLeft: 9,
    },
    subOptionShowMore: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    subOptionTextShowMore: {
      color: theme.activeOrange,
      fontSize: theme.responsiveFontSize * 0.75,
      fontFamily: theme.font,
      paddingLeft: 37,
      textDecorationLine: 'underline',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '95%',
      backgroundColor: theme.backgroundSubscriptionsModal,
      padding: 20,
      borderRadius: 10,
      marginTop: -20,
    },
    modalOption: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 7,
      marginLeft: 15,
    },
    doneButton: {
      marginTop: 20,
      alignItems: 'center',
    },
    doneButtonText: {
      color: theme.activeOrange,
      fontSize: theme.responsiveFontSize * 0.97,
      fontFamily: theme.fontLight,
      textDecorationLine: 'underline',
    },
    modalTitle: {
      color: theme.subscriptions.text,
      fontSize: theme.titleFontSize * 0.8,
      fontFamily: theme.font,
      flex: 1,
    },
    subModalCircleContainer: {
      width: 18,
      height: 18,
      borderRadius: 11,
      borderWidth: 1,
      borderColor: theme.activeOrange,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      marginRight: 8,
    },
    tickModalImage: {
      width: '113%',
      height: '113%',
      position: 'absolute',
    },
    itemModalRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 10,
      paddingTop: 20,
    },
    modalByCategoryTitle: {
      color: theme.subscriptions.text,
      fontSize: theme.titleFontSize * 0.92,
      fontFamily: theme.fontSemibold,
      flex: 1,
    },
    textFounders: {
      color: theme.subscriptions.title,
      fontSize: theme.responsiveFontSize * 0.91,
      fontFamily: theme.fontUnboundedMedium,
      textAlign: 'center',
      lineHeight: 22,
      marginTop: 10,
    },
    bigTextFounders: {
      color: '#FF6C0D',
      fontSize: theme.responsiveFontSize * 1.3,
      fontFamily: theme.fontUnboundedMedium,
      textAlign: 'center',
      lineHeight: 32,
    },
    secondaryTextFounders: {
      color: theme.subscriptions.secondaryText,
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.font,
      lineHeight: 22,
      textAlign: 'center',
      margin: 25,
    },
    subscriptionImage: {
      width: 390,
      height: 270,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    textFoundersRow: {
      textAlign: 'center',
      alignSelf: 'center',
      flexDirection: 'row', // Arrange icon and text in a row
      alignItems: 'center', // Vertically center the items
      marginBottom: 5,
      marginRight: 10,
    },
  });
  return styles;
};

export default usePackageSubscriptionStyles;
