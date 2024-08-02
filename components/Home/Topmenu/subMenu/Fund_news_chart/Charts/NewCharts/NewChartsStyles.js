import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../context/themeContext';

const useNewChartsStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    flex: {
      flex: 1,
    },
    // Price styles
    titleRow: {
      width: '100%',
      flexDirection: 'row',
      marginTop: 16,
      paddingHorizontal: 12,
    },
    mainTitle: {
      fontSize: 25,
      fontFamily: theme.fontMedium,
      color: theme.titleColor,
      textAlign: 'center',
    },
    detailslabel: {
      marginLeft: 22,
      marginRight: 10,
      textTransform: 'uppercase',
      fontSize: theme.titleFontSize,
      color: theme.textColor,
      fontFamily: theme.fontSemibold,
    },
    lastPrice: {
      textTransform: 'uppercase',
      fontSize: theme.titleFontSize,
      marginLeft: 10,
      color: theme.textColor,
      fontFamily: theme.fontSemibold,
    },
    priceUpColor: {
      color: theme.priceUpColor,
    },
    priceDownColor: {
      color: theme.priceDownColor,
    },
    // Chart styles
    chart: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    chartContainer: {
      width: '100%',
      marginVertical: 8,
      alignItems: 'center',
    },
    chartBackgroundImage: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 50,
      left: 15,
      width: 52,
      height: 44,
      opacity: 0.8,
    },
    chartsZoomIndicator: {
      width: 28,
      height: 28,
      position: 'absolute',
      bottom: Platform.OS === 'android' ? 75 : 85,
      right: 75,
      tintColor: '#A3A3A3',
    },
    // Interval selector styles
    timeFrameContainer: {
      height: 28,
      marginLeft: 0,
      marginTop: 8,
      flexDirection: 'row',
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 2,
    },
    timeFrameButton: {
      width: 36,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
    },
    activeTimeFrame: {
      backgroundColor: theme.activeWhite,
      borderColor: theme.subMenuBgColor,
      borderWidth: 3,
    },
    timeFrameButtonText: {
      color: theme.subMenuTextColor,
      textTransform: 'uppercase',
      fontSize: 12,
      fontFamily: theme.font,
    },
    activeText: {
      fontFamily: theme.fontMedium,
    },
    // Pairing menu styles
    pairingsMenuContainer: {
      maxWidth: '100%',
      height: 28,
      marginVertical: 16,
      flexDirection: 'row',
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 2,
    },
    pairingButton: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
    },
    pairingActiveButton: {
      backgroundColor: theme.activeWhite,
      borderColor: theme.subMenuBgColor,
      borderWidth: 3,
    },
    refreshButton: {
      position: 'absolute',
      top: -160,
      left: 75,
      width: 18,
      height: 18,
      tintColor: theme.titleColor,
      alignSelf: 'center',
      zIndex: 10
    },
  });

  return styles;
};

export default useNewChartsStyles;
