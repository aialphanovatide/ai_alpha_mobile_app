import {useContext} from 'react';
import {StyleSheet, Dimensions, Platform} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useChartSectionStyles = () => {
  const {theme, isDarkMode} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    mainSection: {
      flex: 1,
      width: Platform.OS === 'ios' ? '100%' : theme.width,
      backgroundColor: 'transparent',
      paddingHorizontal: 10,
    },
    background: {
      flex: 1,
      backgroundColor: 'transparent',
      width: Platform.OS === 'ios' ? '100%' : theme.width,
      paddingHorizontal: 10,
    },
    container: {
      width: '100%',
      height: theme.height * 0.45,
      marginVertical: theme.boxesVerticalMargin,
      justifyContent: 'center',
      alignItems: 'top',
      borderRadius: 4,
    },
    chart: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    title: {
      marginTop: theme.titlesVerticalMargin,
      marginVertical: theme.boxesVerticalMargin * 2,
      marginHorizontal: 28,
      color: theme.titleColor,
      fontSize: 25,
      fontFamily: theme.fontMedium,
      textAlign: 'left',
    },
    backButtonWrapper: {
      marginHorizontal: 20,
      marginTop: 36,
    },
    chartBackgroundImage: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: '10%',
      left: '7.5%',
      width: 52,
      height: 44,
      opacity: 0.5,
      zIndex: -2,
      tintColor: '#A3A3A350',
    },
    timeframeContainer: {
      flex: 1,
      width: '100%',
      padding: 4,
    },
    sectionDescription: {
      width: '90%',
      marginHorizontal: 28,
      marginBottom: 28,
      fontSize: 14,
      fontFamily: theme.font,
      color: theme.textColor,
      textAlign: 'left',
      lineHeight: 20,
    },
    rsButtonContainer: {
      marginVertical: 8,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    rsButton: {
      paddingHorizontal: 4,
      paddingVertical: 4,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      margin: 1.5,
      width: '25%',
      backgroundColor: theme.secondaryBoxesBgColor,
    },
    rsButtonText: {
      textTransform: 'capitalize',
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.supportAndResistanceText,
      fontFamily: theme.font,
    },
    activeRsButtonText: {
      color: '#fff',
      fontFamily: theme.fontMedium,
    },
    chartsHorizontalButton: {
      width: 24,
      height: 24,
      position: 'absolute',
      bottom: 75,
      left: '10%',
      tintColor: theme.textColor,
      zIndex: 10,
    },
    chartBackButton: {
      width: 35,
      height: 35,
      position: 'absolute',
      bottom: 280,
      right: 30,
      tintColor: theme.textColor,
    },
    chartsZoomIndicator: {
      width: 20,
      height: 24,
      position: 'absolute',
      bottom: Platform.OS === 'android' ? 75 : 85,
      right: 80,
      tintColor: isDarkMode ? '#737373' : '#A3A3A3',
    },
    refreshButton: {
      position: 'absolute',
      top: 5,
      left: 25,
      width: 18,
      height: 18,
      tintColor: theme.titleColor,
      alignSelf: 'center',
      zIndex: 10,
    },
  });
  return styles;
};

export default useChartSectionStyles;
