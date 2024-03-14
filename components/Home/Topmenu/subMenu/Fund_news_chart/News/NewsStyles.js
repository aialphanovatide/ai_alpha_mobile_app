import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../context/themeContext';

const useNewsStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: theme.width,
      padding: 10,
    },
    backgroundColor: {
      backgroundColor: theme.mainBackgroundColor,
    },
    title: {
      marginVertical: 10,
      marginHorizontal: 10,
      fontWeight: 'bold',
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
    },
    itemContainer: {
      marginVertical: 5,
      flexDirection: 'row',
      padding: 10,
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 2,
    },
    image: {
      width: 80,
      height: 80,
      margin: 2.5,
      borderRadius: 5,
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
      fontWeight: 'bold',
      lineHeight: 22,
      textAlign: 'left',
    },
    summary: {
      fontSize: theme.responsiveFontSize * 0.825,
      color: theme.textColor,
      margin: 5,
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
      textAlign: 'left',
      fontWeight: 'bold',
      lineHeight: 22,
    },
    articleDate: {
      marginHorizontal: 20,
      textAlign: 'left',
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.textColor,
      fontWeight: 'bold',
      lineHeight: 22,
    },
    articleSummary: {
      margin: 10,
      marginHorizontal: 20,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.85,
      textAlign: 'left',
      lineHeight: 22,
    },
    filterContainer: {
      marginHorizontal: 8,
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
    },
    filterText: {
      color: theme.subMenuTextColor,
      textTransform: 'capitalize',
      fontWeight: 'bold',
      fontSize: theme.responsiveFontSize * 0.8,
    },
    activeButtonText: {
      color: theme.filterTextColor,
      textTransform: 'capitalize',
      fontWeight: 'bold',
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
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
  });
  return styles;
};

export default useNewsStyles;
