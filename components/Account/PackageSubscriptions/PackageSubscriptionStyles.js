import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';
import {useContext} from 'react';

const usePackageSubscriptionStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.subscriptions.subscriptionsBgColor,
    },
    logoContainer: {
      width: 80,
      height: 80,
      marginVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      flex: 1,
    },
    description: {
      color: theme.subscriptions.title,
      fontSize: theme.responsiveFontSize * 0.9,
      textAlign: 'center',
      marginVertical: 10,
      marginHorizontal: 5,
    },
    purchaseButton: {
      width: '35%',
      marginVertical: 10,
      padding: 5,
      borderRadius: 5,
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
      marginVertical: 5,
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
    },
    row: {
      position: 'relative',
      flexDirection: 'row',
      marginVertical: 15,
    },
    left: {
      position: 'absolute',
      top: 0,
      left: 2.5,
    },
    right: {
      position: 'absolute',
      top: 0,
      right: 2.5,
    },
    title: {
      color: theme.subscriptions.text,
      fontSize: theme.titleFontSize * 0.8,
    },
    itemDescriptionContainer: {
      marginTop: 20,
      marginBottom: 2.5,
      padding: 2.5,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    itemDescription: {
      color: theme.subscriptions.text,
      fontSize: theme.responsiveFontSize * 0.75,
      textAlign: 'left',
    },
    packagesContainer: {
      width: theme.width * 0.9125,
      marginVertical: 10,
      paddingHorizontal: 10,
    },
    hidden: {
      display: 'none',
    },
    seeMoreButton: {
      width: 40,
      height: 40,
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
  });
  return styles;
};

export default usePackageSubscriptionStyles;
