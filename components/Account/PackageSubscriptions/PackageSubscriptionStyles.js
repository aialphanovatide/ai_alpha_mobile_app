import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';
import {useContext} from 'react';

const usePackageSubscriptionStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.subscriptions.subscriptionsBgColor,
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
      fontWeight: 'bold',
      textAlign: 'center',
      alignSelf: 'flex-start',
    },
    description: {
      color: theme.subscriptions.title,
      fontSize: theme.responsiveFontSize * 0.9,
      textAlign: 'justify',
      marginVertical: theme.boxesVerticalMargin,
      marginHorizontal: 8,
    },
    purchaseButton: {
      width: '35%',
      marginTop: theme.boxesVerticalMargin * 2.5,
      padding: 4,
      borderRadius: 4,
      overflow: 'hidden',
      backgroundColor: theme.subscriptions.purchaseButtonBgColor,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    purchaseButtonText: {
      color: theme.subscriptions.purchaseButtonText,
      fontSize: theme.titleFontSize * 0.715,
      textAlign: 'center',
    },
    itemContainer: {
      flex: 1,
      marginVertical: 4,
      padding: 10,
      backgroundColor: theme.subscriptions.boxesBgColor,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
      borderRadius: 4,
    },
    row: {
      position: 'relative',
      flexDirection: 'row',
      marginBottom: theme.boxesVerticalMargin * 2,
    },
    left: {
      position: 'absolute',
      top: 0,
      left: 4,
    },
    right: {
      position: 'absolute',
      top: 0,
      right: 4,
    },
    title: {
      margin: 8,
      color: theme.subscriptions.text,
      fontSize: theme.titleFontSize * 0.8,
      fontWeight: 'bold',
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
      fontSize: theme.responsiveFontSize * 0.75,
      textAlign: 'left',
      lineHeight: 22,
    },
    packagesContainer: {
      width: theme.width,
      marginVertical: theme.boxesVerticalMargin,
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
    },
    itemIcon: {
      position: 'absolute',
      top: 4,
      left: '24%',
      width: 30,
      height: 30,
      justifyContent: 'center',
      borderRadius: 15,
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: theme.subscriptions.boxesBgColor,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    image: {
      flex: 1,
    },
    activePurchaseButton: {
      backgroundColor: theme.orange
    },
    activePurchaseButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    }
  });
  return styles;
};

export default usePackageSubscriptionStyles;