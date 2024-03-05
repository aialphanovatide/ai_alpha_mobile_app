import {useContext} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useHomeAnalysisStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    mainTitle: {
      fontWeight: 'bold',
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
    },
    titleStyles: {
      fontWeight: 'bold',
      color: theme.titleColor,
      fontSize: theme.responsiveFontSize,
      marginBottom: 2,
    },
    imageStyle: {
      width: 50,
      height: 50,
      borderRadius: 5,
      marginLeft: 10,
    },
    item: {
      width: theme.width,
      backgroundColor: theme.boxesBackgroundColor,
      overflow: 'hidden',
      alignSelf: 'center',
    },
    itemPreview: {
      flex: 1,
      backgroundColor: theme.boxesBackgroundColor,
    },
    description: {
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.textColor,
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
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
    background: {
      flex: 1,
      backgroundColor: theme.mainBackgroundColor,
    },
    container: {
      flex: 1,
      width: theme.width,
      padding: 10,
    },
    analysisArticleImage: {
      width: 'auto',
      height: 'auto',
      minHeight: 100,
      maxHeight: 250,
      margin: 8,
      marginVertical: theme.boxesVerticalMargin,
    },
    analysisArticleText: {
      fontSize: theme.responsiveFontSize * 0.825,
      color: theme.textColor,
      marginVertical: theme.boxesVerticalMargin,
      lineHeight: 16,
    },
    title: {
      fontSize: theme.titleFontSize,
      color: theme.titleColor,
      marginVertical: theme.titlesVerticalMargin * 0.8,
      marginHorizontal: 8,
      lineHeight: 22,
      fontWeight: 'bold',
    },
    backButtonWrapper: {
      marginHorizontal: 4,
      marginVertical: 8,
    },
    aboutIconContainer: {
      flex: 1,
      position: 'relative',
      marginTop: '5%',
    },

  });
  return styles;
};

export default useHomeAnalysisStyles;
