import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';
import {useContext} from 'react';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const useCurrentPackagesStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.mainBackgroundColor,
    },
    flex: {
      flex: 1,
    },
    backgroundContainer: {
      flex: 1,
    },
    alignStart: {
      alignSelf: 'flex-start',
      marginVertical: theme.boxesVerticalMargin,
    },
    scrollViewContent: {
      paddingVertical: 16,
    },
    innerContainer: {
      paddingHorizontal: 20,
    },
    mainTitle: {
      fontSize: 24,
      marginBottom: 16,
      marginTop: 16,
      color: theme.titleColor,
      fontFamily: theme.fontSemibold,
    },
    packagesContainer: {
      marginVertical: 16,
    },
    itemContainer: {
      borderWidth: 1,
      borderRadius: 8,
      borderColor: '#FF6C0D',
      padding: 16,
      marginBottom: 8,
    },
    itemRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    circleContainer: {
      width: 1,
      height: 1,
      borderRadius: 12,
      backgroundColor: '#FFA500', // Orange color for active
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    tickImage: {
      width: 20,
      height: 20,
    },
    itemIcon: {
      width: 30,
      height: 25,
      marginRight: 16,
      marginLeft: 8,
    },
    title: {
      flex: 1,
      fontSize: 18,
      fontWeight: '600',
      fontFamily: theme.fontSemibold,
      color: theme.titleColor,
    },
    priceContainer: {
      alignItems: 'flex-end',
    },
    priceText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.titleColor,
    },
    perMonthText: {
      fontSize: 12,
      color: '#888',
    },
    subOptionsContainer: {
      marginTop: 8,
      paddingHorizontal: 8,
    },
    subOption: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 4,
      paddingHorizontal: 8,
      backgroundColor: 'transparent',
      borderRadius: 4,
      marginBottom: 4,
    },
    subCircleContainer: {
      backgroundColor: 'transparent',
      width: 0,
      height: 0,
      borderRadius: 10,
      backgroundColor: '#FFA500', // Orange color for sub-option
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    subTickImage: {
      width: 15,
      height: 15,
    },
    subOptionText: {
      fontSize: 14,
      color: '#555',
    },
    noPackagesText: {
      fontSize: 16,
      color: '#777',
      textAlign: 'center',
      marginTop: 20,
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
      marginBottom: 20,
    },
    preSecondaryTextFounders: {
      color: theme.titleColor,
      fontSize: theme.responsiveFontSize * 0.80,
      fontFamily: theme.font,
      lineHeight: 18,
      textAlign: 'center',
      marginRight: 15,
      marginLeft: 15,
    },
    secondaryTextFounders: {
      color: theme.subscriptions.secondaryText,
      fontSize: theme.responsiveFontSize * 0.80,
      fontFamily: theme.font,
      lineHeight: 18,
      textAlign: 'center',
      marginRight: 15,
      marginLeft: 15,
    },
    subscriptionImage: {
      width:390,
      height:270,
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
    purchaseButton: {
      width: '100%',
      paddingVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FF6C0D',
      borderRadius: 3,
      marginBottom: 20,
    },
    purchaseButtonText: {
      color: '#FFFFFF',
      fontSize: theme.titleFontSize * 0.7,
      fontFamily: theme.fontSemibold,
    },
  });
  return styles;
};

export default useCurrentPackagesStyles;
