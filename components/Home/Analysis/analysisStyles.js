import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useHomeAnalysisStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    mainTitle: {
      marginTop: 24,
      marginBottom: 8,
      marginHorizontal: 16,
      color: theme.titleColor,
      fontSize: 16,
      fontFamily: theme.fontMedium,
    },
    titleStyles: {
      maxWidth: '80%',
      color: theme.titleColor,
      fontSize: 14,
      fontFamily: theme.fontMedium,
    },
    imageStyle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      marginLeft: 8,
      alignSelf: 'center',
    },
    item: {
      width: '100%',
      paddingLeft: 4,
      backgroundColor: theme.boxesBackgroundColor,
      alignSelf: 'center',
      alignItems: 'center',
      borderBottomColor: theme.boxesBorderColor,
      borderBottomWidth: 0.5,
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
      tintColor: theme.secondaryGrayColor,
    },
    emptyMessage: {
      margin: theme.boxesVerticalMargin,
      fontSize: 14,
      color: theme.secondaryTextColor,
      alignSelf: 'flex-start',
      fontFamily: theme.fontBoldItalic,
      textAlign: 'left',
    },
    background: {
      flex: 1,
    },
    analysisItemsContainer: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.mainBackgroundColor,
    },
    container: {
      flex: 1,
      width: theme.width,
      padding: 12,
      backgroundColor: theme.mainBackgroundColor,
    },
    article: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 4,
    },
    articleImageContainer: {
      position: 'relative',
      width: 360,
      height: 225,
      margin: 4,
      marginBottom: 0,
      alignSelf: 'center',
      overflow: 'hidden',
    },
    contentContainer: {
      width: '100%',
      padding: 14,
    },
    analysisArticleText: {
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
      backgroundColor: 'transparent',
    },
    hidden: {
      display: 'none',
      opacity: 0,
    },
    itemWrapper: {
      flex: 1,
      flexDirection: 'row',
      position: 'relative',
    },
    arrowContainer: {
      flex: 1,
      width: 30,
      height: 30,
      position: 'absolute',
      top: '20%',
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
    articleImage: {
      flex: 1,
    },
    overlayContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '75%',
      justifyContent: 'flex-end',
      alignItems: 'center',
      zIndex: 300,
    },
    overlayGradient: {
      ...StyleSheet.absoluteFillObject,
    },
    textContainer: {
      width: '100%',
      marginBottom: '45%',
      padding: 12,
      backgroundColor: theme.boxesBackgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      borderRadius: 5,
    },
    mainOverlayTitle: {
      marginVertical: 8,
      color: theme.textColor,
      fontSize: 16,
      fontFamily: theme.fontSemibold,
      textAlign: 'center',
      lineHeight: 25,
    },
    orangeText: {
      color: theme.orange,
    },
    overlayText: {
      color: theme.textColor,
      fontSize: 16,
      fontFamily: theme.font,
      textAlign: 'center',
      lineHeight: 25,
    },
    offeringText: {
      fontSize: theme.titleFontSize,
      textAlign: 'left',
    },
    zoomImageBackground: {
      backgroundColor: 'transparent',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      alignSelf: 'center',
    },
    unsubscribedButton: {
      width: 300,
      height: 35,
      marginVertical: 16,
      backgroundColor: theme.orange,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 4,
    },
    buttonText: {
      color: theme.activeWhite,
      fontSize: 14,
      fontFamily: theme.fontMedium,
      textAlign: 'center',
    },
    zoomIndicator: {
      position: 'absolute',
      bottom: 10,
      right: 20,
      width: 30,
      height: 30,
      tintColor: theme.textColor,
      zIndex: 1000,
    },
    zoomedImage: {
      width: 380,
      height: 380,
      alignSelf: 'center',
    },
    zoomImageDismissOverlay: {
      width: '100%',
      height: '25%',
      backgroundColor: '#00000050',
      opacity: 0.8,
    },
  });
  return styles;
};

export default useHomeAnalysisStyles;
