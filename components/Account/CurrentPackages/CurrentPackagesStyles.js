import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';
import {useContext} from 'react';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const useCurrentPackagesStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: theme.width,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    flex: {
      flex: 1,
    },
    logoContainer: {
      width: 150,
      height: 150,
      marginVertical: theme.boxesVerticalMargin,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      flex: 1,
    },
    mainTitle: {
      marginHorizontal: 16,
      marginVertical: theme.titlesVerticalMargin,
      color: theme.titleColor,
      fontSize: theme.titleFontSize * 1.25,
      fontFamily: theme.fontSemibold,
      textAlign: 'center',
      alignSelf: 'flex-start',
    },
    description: {
      marginVertical: theme.boxesVerticalMargin,
      marginTop: 4,
      marginHorizontal: 16,
    },
    text: {
      color: theme.subscriptions.title,
      fontSize: theme.responsiveFontSize * 0.9,
      fontFamily: theme.font,
      textAlign: 'left',
      lineHeight: 22,
    },
    bold: {
      fontFamily: theme.fontBold,
    },
    orange: {
      color: theme.orange,
      marginLeft: 2,
    },
    secondaryText: {
      color: theme.subscriptions.secondaryText,
      fontSize: theme.responsiveFontSize * 0.75,
      fontFamily: theme.font,
      lineHeight: 22,
    },
    reference: {
      top: 30,
      fontFamily: theme.fontItalic,
      fontSize: theme.responsiveFontSize * 0.7,
    },
    foundersReference: {
      color: theme.activeYellow,
    },
    textRow: {
      flexDirection: 'row',
    },
    foundersText: {
      marginTop: -3,
      marginLeft: 15,
      color: theme.subscriptions.foundersText,
    },
    purchaseButton: {
      width: '35%',
      marginTop: theme.boxesVerticalMargin * 2.5,
      padding: 4,
      paddingVertical: 12,
      borderRadius: 3,
      overflow: 'hidden',
      backgroundColor: theme.subscriptions.purchaseButtonBgColor,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    purchaseButtonText: {
      color: theme.subscriptions.purchaseButtonText,
      fontSize: theme.titleFontSize * 0.8,
      fontFamily: theme.fontMedium,
      textAlign: 'center',
    },
    itemContainer: {
      flex: 1,
      marginVertical: 4,
      padding: 10,
      backgroundColor: theme.subscriptions.boxesBgColor,
    },
    selectedItem: {
      borderWidth: 2,
      borderColor: theme.activeOrange,
    },
    foundersItem: {
      backgroundColor: theme.activeOrange,
    },
    selectedFounders: {
      borderWidth: 2,
      borderColor: theme.activeYellow,
    },
    row: {
      flexDirection: 'row',
      marginBottom: theme.boxesVerticalMargin * 0.5,
    },
    left: {
      position: 'absolute',
      top: 0,
      left: 50,
    },
    right: {
      position: 'absolute',
      top: 0,
      right: 4,
    },
    title: {
      margin: 8,
      marginTop: -3,
      marginLeft: 15,
      color: theme.subscriptions.text,
      fontSize: theme.titleFontSize * 0.8,
      fontFamily: theme.fontSemibold,
    },
    subCoin: {
        marginRight: 5,
    },
    subCoinContainer: {
        flexDirection: 'row',
        marginTop: 25,
        marginLeft: 10,
        alignItems: 'center',
      },
    itemDescriptionContainer: {
      paddingTop: 8,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    itemDescription: {
      marginHorizontal: 8,
      marginTop: 4,
      color: theme.subscriptions.text,
      fontFamily: theme.fontMedium,
      fontSize: theme.responsiveFontSize * 0.75,
      textAlign: 'left',
      lineHeight: 22,
    },
    packagesContainer: {
      flex: 1,
      width: theme.width,
      marginVertical: theme.boxesVerticalMargin,
      padding: 10,
    },
    hidden: {
      display: 'none',
    },
    seeMoreButton: {
      width: 50,
      height: 25,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    seeMoreIcon: {
      flex: 1,
      tintColor: theme.subscriptions.seeMoreColor,
    },
    alignStart: {
      alignSelf: 'flex-start',
      marginVertical: theme.boxesVerticalMargin,
    },
    itemIcon: {
      width: 40,
      height: 40,
      marginHorizontal: 8,
      justifyContent: 'center',
      borderRadius: 20,
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: theme.subscriptions.iconsBgColor,
    },
    image: {
      flex: 1,
    },
    foundersIcon: {
      width: 30,
      height: 30,
    },
    activePurchaseButton: {
      backgroundColor: theme.orange,
    },
    activePurchaseButtonText: {
      color: '#FFFFFF',
      fontFamily: theme.fontMedium,
      fontSize: theme.titleFontSize * 0.85,
    },
    button: {
      width: '35%',
      marginTop: theme.boxesVerticalMargin * 2.5,
      padding: 4,
      paddingVertical: 12,
      borderRadius: 3,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    buttonText: {
      fontSize: theme.titleFontSize * 0.8,
      fontFamily: theme.fontMedium,
      textAlign: 'center',
    },
    noPackagesContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noPackages: {
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: theme.responsiveFontSize,
      fontFamily: theme.fontBoldItalic,
      color: theme.secondaryTextColor,
      alignSelf: 'center',
    },
  });
  return styles;
};

export default useCurrentPackagesStyles;
