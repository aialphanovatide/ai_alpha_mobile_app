const {useContext} = require('react');
const {StyleSheet} = require('react-native');
const {AppThemeContext} = require('../../context/themeContext');

const useUpgradeOverlayStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    overlayContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.upgradeOverlayBgColor,
    },
    overlayContent: {
      padding: 20,
      borderRadius: 5,
      alignItems: 'center',
    },
    upgradeButton: {
      marginTop: 20,
      backgroundColor: theme.orange,
      borderRadius: 10,
    },
    buttonText: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      color: theme.buttonColor,
      fontWeight: 'bold',
      fontSize: theme.responsiveFontSize,
    },
    lockContainer: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    lockIcon: {
      flex: 1,
    },
  });
  return styles;
};

export default useUpgradeOverlayStyles;
