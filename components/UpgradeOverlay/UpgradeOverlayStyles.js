const {useContext} = require('react');
const {StyleSheet} = require('react-native');
const {AppThemeContext} = require('../../context/themeContext');

const useUpgradeOverlayStyles = () => {
  const {theme, isDarkMode} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    overlayContainer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'transparent',
      paddingTop: 36,
      justifyContent: 'center',
      zIndex: 10000,
    },
    overlayImage: {
      width: 390,
      height: 360,
      paddingHorizontal: 30,
      paddingBottom: 6,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    overlayContent: {
      flex: 1,
      padding: '25%',
      marginVertical: '25%',
      borderRadius: 5,
      alignItems: 'center',
    },
    analysisOverlayContent: {
      flex: 1,
      marginVertical: '25%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    upgradeButton: {
      marginTop: 16,
      backgroundColor: theme.orange,
      borderRadius: 4,
    },
    buttonText: {
      paddingVertical: 10,
      paddingHorizontal: 24,
      color: theme.buttonColor,
      fontFamily: theme.fontMedium,
      fontSize: theme.responsiveFontSize,
    },
    lockIcon: {
      width: 42,
      height: 42,
      overflow: 'hidden',
      tintColor: theme.lockIconColor,
    },
    secondLockIcon: {
      width: 40,
      height: 40,
      overflow: 'hidden',
      tintColor: theme.lockIconColor,
    },
    none: {
      display: 'none',
    },
    popUp: {
      width: theme.width * 0.6,
      padding: 10,
      backgroundColor: theme.boxesBackgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeContainer: {
      position: 'absolute',
      top: 5,
      right: 10,
      width: 25,
      height: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    close: {
      flex: 1,
    },
    popUpText: {
      marginVertical: theme.height * 0.08,
      marginHorizontal: theme.width * 0.01,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize,
      textAlign: 'center',
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
    linearGradient: {
      width: '100%',
      height: 50,
      borderRadius: 3,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
    },
    overlayTitle: {
      width: '100%',
      fontSize: 23,
      fontFamily: theme.fontSemibold,
      color: theme.upgradeOverlayTitleColor,
      textAlign: 'center',
    },
    overlayDescription: {
      width: '100%',
      fontSize: 14,
      fontFamily: theme.fontMedium,
      color: theme.upgradeOverlayTitleColor,
      textAlign: 'center',
    },
    absolute: {
      ...StyleSheet.absoluteFillObject,
    },
    chartsOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: isDarkMode ? '#33333380' : '#FFFFFF60',
    },
  });
  return styles;
};

export default useUpgradeOverlayStyles;
