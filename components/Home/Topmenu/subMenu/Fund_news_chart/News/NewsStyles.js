import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../context/themeContext';

const useNewsStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: theme.width,
      padding: 12,
      paddingBottom: 24,
    },
    backgroundColor: {
      backgroundColor: theme.mainBackgroundColor,
    },
    title: {
      marginHorizontal: 28,
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
      fontFamily: theme.fontSemibold,
    },
    itemContainer: {
      marginVertical: 5,
      marginHorizontal: 4,
      flexDirection: 'row',
      padding: 6,
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textContainer: {
      flex: 1,
      marginHorizontal: 10,
    },
    itemTitle: {
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.9,
      fontFamily: theme.fontSemibold,
      lineHeight: 22,
      textAlign: 'left',
    },
    summary: {
      fontSize: theme.responsiveFontSize * 0.825,
      color: theme.textColor,
      fontFamily: theme.fontMedium,
      margin: 4,
    },
    article: {
      flex: 1,
      width: theme.width,
      marginTop: 2.5,
      marginBottom: 10,
      backgroundColor: theme.boxesBackgroundColor,
      alignSelf: 'center',
      borderRadius: 2,
    },
    articleImage: {
      flex: 1,
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
      padding: 10,
      paddingBottom: '10%',
    },
    articleTitle: {
      marginVertical: theme.titlesVerticalMargin,
      marginHorizontal: 20,
      fontSize: theme.responsiveFontSize * 1.075,
      color: theme.textColor,
      fontFamily: theme.fontSemibold,
      textAlign: 'left',
      lineHeight: 22,
    },
    articleDate: {
      marginHorizontal: 20,
      textAlign: 'left',
      fontSize: theme.responsiveFontSize * 0.825,
      color: theme.secondaryTextColor,
      fontFamily: theme.fontMedium,
      lineHeight: 22,
    },
    articleSummary: {
      margin: 10,
      marginHorizontal: 20,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.85,
      fontFamily: theme.font,
      textAlign: 'left',
      lineHeight: 22,
    },
    filterContainer: {
      marginHorizontal: 4,
      marginVertical: 10,
      marginBottom: 15,
      flexDirection: 'row',
      backgroundColor: theme.subMenuBgColor,
    },
    filterButton: {
      width: '50%',
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeOption: {
      backgroundColor: theme.activeWhite,
      borderColor: theme.subMenuBgColor,
      borderWidth: 2,
    },
    filterText: {
      color: theme.subMenuTextColor,
      textTransform: 'capitalize',
      fontFamily: theme.fontMedium,
      fontSize: theme.responsiveFontSize * 0.8,
    },
    activeButtonText: {
      color: theme.subMenuTextColor,
      textTransform: 'capitalize',
      fontFamily: theme.fontSemibold,
      fontSize: theme.responsiveFontSize * 0.8,
    },
    marginVertical: {
      marginVertical: 10,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    emptyMessageContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyMessage: {
      margin: theme.boxesVerticalMargin,
      fontSize: theme.responsiveFontSize,
      color: theme.secondaryTextColor,
      alignSelf: 'center',
      fontFamily: theme.fontBoldItalic,
    },
    titleRow: {
      width: '100%',
      marginTop: 12,
      flexDirection: 'row',
    },
    zoomImageBackground: {
      backgroundColor: 'transparent',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
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
      width: '100%',
      height: '25%',
      backgroundColor: '#00000050',
      opacity: 0.8,
    },
  });
  return styles;
};

export default useNewsStyles;
