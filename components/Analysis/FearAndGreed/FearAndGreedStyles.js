import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useFearAndGreedStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    mainSection: {
      flex: 1,
      width: theme.width,
      backgroundColor: 'transparent',
      padding: 10,
      paddingTop: 36,
    },
    scrollView: {
      flex: 1,
    },
    fearAndGreedWidgetContainer: {
      paddingTop: 32,
      margin: theme.boxesVerticalMargin,
      borderRadius: 4,
      backgroundColor: theme.boxesBackgroundColor,
    },
    container: {
      width: '100%',
      height: 250,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      overflow: 'hidden',
    },
    indexNumber: {
      marginVertical: 5,
      fontSize: theme.titleFontSize,
      textAlign: 'center',
      fontFamily: theme.fontMedium,
      color: theme.titleColor,
    },
    label: {
      textAlign: 'center',
      marginVertical: 2.5,
      color: '#242427',
      fontFamily: theme.fontMedium,
      fontSize: theme.responsiveFontSize * 1.1,
    },
    title: {
      marginTop: theme.titlesVerticalMargin,
      paddingHorizontal: 10,
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
      fontFamily: theme.fontSemibold,
    },
    widget: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
      transform: [{translateY: -35}],
    },
    sectionDescription: {
      width: '100%',
      marginVertical: theme.boxesVerticalMargin,
      paddingHorizontal: 8,
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.fontMedium,
      color: theme.textColor,
      textAlign: 'left',
      lineHeight: 20,
    },
    referencesContainer: {
      flex: 1,
      marginVertical: theme.titlesVerticalMargin,
      width: '100%',
      margin: 8,
      borderRadius: 6,
    },
    subTitle: {
      marginTop: theme.boxesVerticalMargin,
      paddingHorizontal: 16,
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
      fontFamily: theme.fontMedium,
    },
    referenceItem: {
      flex: 1,
      width: '95%',
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 6,

    },
    referenceImage: {
      minHeight: 196,
      height: 'auto',
      width: '100%',
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
    },
    referenceTitle: {
      marginTop: 14,
      marginBottom: 4,
      marginHorizontal: 16,
      fontFamily: theme.fontMedium,
      fontSize: theme.responsiveFontSize,
      color: theme.textColor,
      textAlign: 'left',
    },
    textContainer: {
      margin: 4,
      marginHorizontal: 14,
      justifyContent: 'center',
      alignItems: 'center',
    },
    descriptionText: {
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.font,
      color: theme.textColor,
      lineHeight: 22,
    },
    line: {
      width: '90%',
      borderTopColor: theme.secondaryTextColor,
      borderTopWidth: 1,
      margin: 16,
    },
  });
  return styles;
};

export default useFearAndGreedStyles;
