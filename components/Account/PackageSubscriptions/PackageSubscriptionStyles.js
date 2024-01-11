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
      color: theme.subscriptions.text,
      fontSize: theme.responsiveFontSize * 0.9,
      textAlign: 'center',
      marginVertical: 10,
      marginHorizontal: 5,
    },
    purchaseButton: {
      width: theme.width * 0.3,
      padding: 5,
      borderRadius: 5,
      overflow: 'hidden',
      backgroundColor: theme.subscriptions.purchaseButtonBgColor,
    },
    purchaseButtonText: {
      color: theme.subscriptions.purchaseButtonText,
      fontSize: theme.titleFontSize * 0.925,
      textAlign: 'center',
    },
    itemContainer: {
      flex: 1,
      marginVertical: 5,
      padding: 10,
      backgroundColor: theme.subscriptions.boxesBgColor,
    },
    row: {
      position: 'relative',
      flexDirection: 'row',
      marginVertical: 5,
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
      fontSize: theme.titleFontSize * 0.9,
    },
    itemDescriptionContainer: {
      marginTop: 20,
      marginBottom: 2.5,
      padding: 2.5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemDescription: {
      color: theme.subscriptions.text,
      fontSize: theme.responsiveFontSize * 0.8,
    },
    packagesContainer: {
      width: theme.width * 0.85,
      marginVertical: 10,
      paddingHorizontal: 10,
    }
  });
  return styles;
};

export default usePackageSubscriptionStyles;
