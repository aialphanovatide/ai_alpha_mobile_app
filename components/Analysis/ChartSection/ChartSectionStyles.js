import {useContext} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useChartSectionStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    mainSection: {
      flex: 1,
      width: theme.width,
      height: theme.height,
      backgroundColor: 'transparent',
      padding: 10,
      paddingTop: 36,
    },
    background: {
      flex: 1,
      backgroundColor: 'transparent',
      width: theme.width,
      paddingTop: 36,
      padding: 10,

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
      margin: '0%',
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
    },
    chartBackgroundImage: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 15,
      left: '7.5%',
      width: 60,
      height: 60,
      opacity: 0.8,
      zIndex: -2,
    },
    timeframeContainer: {
      flex: 1,
      width: '100%',
      maxHeight: '5%',
      padding: 10,
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
    backButtonWrapper: {
      marginHorizontal: 20,
    },
  });
  return styles;
};

export default useChartSectionStyles;
