const {useContext} = require('react');
const {StyleSheet} = require('react-native');
const {AppThemeContext} = require('../../context/themeContext');

const useUpgradeOverlayStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    overlayContainer: {
      flex: 1,
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.upgradeOverlayBgColor,
    },
    overlayImage: {
      flex: 1,
      padding: '25%',
      justifyContent: 'center',
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
  });
  return styles;
};

export default useUpgradeOverlayStyles;
