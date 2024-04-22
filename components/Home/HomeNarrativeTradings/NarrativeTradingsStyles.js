import {useContext} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useHomeNarrativeTradingStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    mainTitle: {
      marginHorizontal: 16,
      marginVertical: theme.boxesVerticalMargin,
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
      fontFamily: theme.fontSemibold,
    },
    titleStyles: {
      maxWidth: '70%',
      marginHorizontal: 6,
      color: theme.titleColor,
      fontSize: theme.responsiveFontSize,
      marginBottom: 2,
      fontFamily: theme.fontSemibold,
    },
    imageStyle: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginHorizontal: 8,
      alignSelf: 'center',
    },
    item: {
      flexDirection: 'row',
      width: '100%',
      paddingVertical: 14,
      backgroundColor: theme.boxesBackgroundColor,
      alignItems: 'center',
      borderBottomColor: theme.boxesBorderColor,
      borderBottomWidth: 1,
      borderRadius: 2,
    },
    itemPreview: {
      flex: 1,
      backgroundColor: theme.boxesBackgroundColor,
    },
    description: {
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.textColor,
      fontFamily: theme.fontMedium,
    },
    arrowDown: {
      width: 15,
      height: 15,
      marginTop: 10,
      tintColor: theme.textColor,
    },
    emptyMessage: {
      margin: theme.boxesVerticalMargin,
      fontSize: theme.responsiveFontSize,
      color: theme.secondaryTextColor,
      alignSelf: 'center',
      fontFamily: theme.fontBoldItalic,
    },
    background: {
      flex: 1,
    },
    container: {
      flex: 1,
      width: '100%',
      paddingVertical: 12,
      backgroundColor: theme.mainBackgroundColor,
    },
    article: {
      flex: 1,
      width: '100%',
      paddingVertical: 4,
      paddingHorizontal: 16,
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 4,
    },
    articleImage: {
      width: 'auto',
      height: 'auto',
      minHeight: 100,
      maxHeight: 250,
      margin: 8,
      marginVertical: theme.boxesVerticalMargin,
    },
    articleText: {
      fontSize: theme.responsiveFontSize * 0.825,
      color: theme.textColor,
      marginVertical: theme.boxesVerticalMargin,
      lineHeight: 16,
      fontFamily: theme.fontMedium,
    },
    title: {
      fontSize: theme.titleFontSize,
      color: theme.titleColor,
      marginVertical: theme.titlesVerticalMargin * 0.8,
      marginHorizontal: 8,
      lineHeight: 22,
      fontFamily: theme.fontSemibold,
    },
    backButtonWrapper: {
      margin: 16,
    },
    aboutIconContainer: {
      flex: 1,
      position: 'relative',
      marginTop: '5%',
    },
    itemsContainer: {
      width: '100%',
      paddingVertical: 4,
      backgroundColor: 'transparent',
    },
    hidden: {
      display: 'none',
    },
    itemWrapper: {
      flexDirection: 'row',
      position: 'relative',
    },
    arrowContainer: {
      flex: 1,
      width: 30,
      height: 30,
      position: 'absolute',
      top: 20,
      right: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    articleDate: {
      marginTop: 16,
      textAlign: 'left',
      fontSize: theme.responsiveFontSize * 0.825,
      color: theme.secondaryTextColor,
      fontFamily: theme.fontSemibold,
      lineHeight: 22,
    },
    seeAllButton: {
      width: '100%',
      padding: 8,
      paddingHorizontal: 12,
      backgroundColor: theme.boxesBackgroundColor,
      alignItems: 'flex-end',
    },
    seeAllText: {
      color: theme.secondaryTextColor,
      fontSize: theme.responsiveFontSize * 0.825,
      textDecorationLine: 'underline',
      textDecorationColor: theme.secondaryTextColor,
      fontFamily: theme.fontMedium,
    },
    articleFullImage: {
      width: theme.width,
      height: 350,
      alignSelf: 'center',
      overflow: 'hidden',
    },
  });
  return styles;
};

export default useHomeNarrativeTradingStyles;
