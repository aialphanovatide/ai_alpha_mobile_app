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
    storiesItemsContainer: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.mainBackgroundColor,
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
      marginHorizontal: 16,
      marginVertical: 18,
      color: theme.titleColor,
      fontSize: 16,
      fontFamily: theme.fontSemibold,
    },
    titleStyles: {
      maxWidth: '85%',
      fontFamily: theme.fontMedium,
      color: theme.titleColor,
      marginBottom: 2,
      fontSize: 14,
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
      borderBottomWidth: 0.5,
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
      fontSize: 14,
      color: theme.secondaryTextColor,
      alignSelf: 'flex-start',
      fontFamily: theme.fontBoldItalic,
      textAlign: 'left',
    },
  });
  return styles;
};

export default useTopStoriesStyles;
