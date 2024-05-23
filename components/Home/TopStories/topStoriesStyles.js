import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useTopStoriesStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    storiesContainer: {
      width: '100%',
      backgroundColor: 'transparent',
    },
    margin: {
      marginTop: 8,
      marginBottom: 16,
    },
    storyWrapper: {
      flex: 1,
      flexDirection: 'row',
      position: 'relative',
    },
    hidden: {
      display: 'none',
    },
    mainTitle: {
      fontFamily: theme.fontSemibold,
      color: theme.titleColor,
      fontSize: 21.3333,
    },
    titleStyles: {
      maxWidth: '85%',
      fontFamily: theme.fontSemibold,
      color: theme.titleColor,
      marginBottom: 2,
      fontSize: theme.responsiveFontSize,
    },
    imageStyle: {
      width: 50,
      height: 50,
      borderRadius: 2,
      marginLeft: 10,
    },
    storyItem: {
      flex: 1,
      width: '100%',
      paddingLeft: 8,
      backgroundColor: theme.boxesBackgroundColor,
      alignSelf: 'center',
      borderBottomColor: theme.boxesBorderColor,
      borderBottomWidth: 1,
      borderRadius: 3,
    },
    description: {
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.font,
    },
    arrowDown: {
      width: 15,
      height: 15,
      marginTop: 10,
      tintColor: theme.secondaryGrayColor,
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
    emptyMessage: {
      margin: theme.boxesVerticalMargin,
      fontSize: theme.responsiveFontSize,
      color: theme.secondaryTextColor,
      alignSelf: 'center',
      fontFamily: theme.fontBoldItalic,
    },
  });
  return styles;
};

export default useTopStoriesStyles;
