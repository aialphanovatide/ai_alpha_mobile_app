import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useMarketNarrativeStyles = () => {
  const {theme, isDarkMode} = useContext(AppThemeContext);
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
      maxWidth: '65%',
      marginLeft: 8,
      color: theme.titleColor,
      fontSize: 16,
      fontFamily: theme.fontFigtreeSemibold,
    },
    imageStyle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      marginHorizontal: 8,
      alignSelf: 'center',
    },
    item: {
      width: '100%',
      paddingVertical: 8,
      paddingLeft: 4,
      borderRadius: 2,
      opacity: 1,
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
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
    },
    article: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 4,
    },
    articleImage: {
      flex: 1,
    },
    articleImageContainer: {
      position: 'relative',
      width: 380,
      height: 225,
      margin: 4,
      marginBottom: 0,
      alignSelf: 'center',
      overflow: 'hidden',
    },
    contentContainer: {
      width: '100%',
      padding: 14,
      paddingBottom: '10%',
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
      backgroundColor: 'transparent',
    },
    hidden: {
      display: 'none',
      opacity: 0,
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
      fontSize: 12,
      color: isDarkMode ? '#71717A' : '#A1A1AA',
      fontFamily: theme.fontFigtreeMedium,
    },
    articleFullImage: {
      width: theme.width,
      height: 350,
      alignSelf: 'center',
      overflow: 'hidden',
    },
    zoomImageBackground: {
      position: 'relative',
      backgroundColor: 'rgba(0,0,0,0.8)',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      alignSelf: 'center',
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
      flex: 1,
      backgroundColor: 'transparent',
    },
    zoomImageBg: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#00000050',
      opacity: 0.8,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    horizontalLine: {
      width: '90%',
      marginLeft: '5%',
      marginTop: 10,
      borderBottomWidth: 0.75,
      borderBottomColor: theme.secondaryGrayColor,
    },
    titleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
      marginBottom: 16,
    },
    topBarTitle: {
      marginHorizontal: 8,
      fontSize: 12,
      fontFamily: theme.fontFigtreeMedium,
      color: isDarkMode ? '#52525B' : '#D4D4D8',
      textTransform: 'uppercase',
    },
  });
  return styles;
};

export default useMarketNarrativeStyles;
