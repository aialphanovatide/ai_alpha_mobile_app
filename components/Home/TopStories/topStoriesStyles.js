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
      opacity: 1,
      flexDirection: 'row',
      position: 'relative',
    },
    hidden: {
      display: 'none',
      opacity: 0,
    },
    mainTitle: {
      marginHorizontal: 16,
      marginTop: 24,
      marginBottom: 8,
      color: theme.titleColor,
      fontSize: 16,
      fontFamily: theme.fontMedium,
    },
    titleStyles: {
      maxWidth: '65%',
      marginLeft: 8,
      fontFamily: theme.font,
      color: theme.titleColor,
      marginBottom: 2,
      fontSize: 14,
    },
    imageStyle: {
      width: 60,
      height: 60,
      marginHorizontal: 8,
      borderRadius: 2,
    },
    storyItem: {
      // flexDirection: 'row',
      width: '100%',
      paddingVertical: 8,
      paddingLeft: 4,
      backgroundColor: theme.boxesBackgroundColor,
      // alignItems: 'center',
      alignSelf: 'center',
      // borderBottomColor: theme.boxesBorderColor,
      // borderBottomWidth: 0.75,
      borderRadius: 3,
      opacity: 1,
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
    horizontalLine: {
      width: '90%',
      marginLeft: '5%',
      borderBottomWidth: 0.75,
      borderBottomColor: theme.secondaryGrayColor,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    }
  });
  return styles;
};

export default useTopStoriesStyles;
