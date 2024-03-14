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
    },
    backgroundColor: {
      backgroundColor: theme.mainBackgroundColor,
    },
    title: {
      marginVertical: 10,
      marginHorizontal: 10,
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
      padding: 10,
      backgroundColor: theme.boxesBackgroundColor,
      alignSelf: 'center',
      borderRadius: 2,
    },
    articleImage: {
      width: theme.width,
      height: 350,
      alignSelf: 'center',
      overflow: 'hidden',
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
      fontFamily: theme.fontSemibold,
      lineHeight: 22,
    },
    articleSummary: {
      margin: 10,
      marginHorizontal: 20,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.85,
      fontFamily: theme.fontMedium,
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
      width: '33.33%',
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
      flexDirection: 'row',
    },
  });
  return styles;
};

export default useNewsStyles;
