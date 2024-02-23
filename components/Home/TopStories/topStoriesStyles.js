import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useTopStoriesStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    background: {
      width: '100%',
      backgroundColor: theme.mainBackgroundColor,
    },
    mainTitle: {
      fontWeight: 'bold',
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
    },
    titleStyles: {
      fontWeight: 'bold',
      color: theme.titleColor,
      marginBottom: 2,
      fontSize: theme.responsiveFontSize,
    },
    imageStyle: {
      width: 50,
      height: 50,
      borderRadius: 5,
      marginLeft: 10,
    },
    storyItem: {
      flex: 1,
      width: theme.width,
      backgroundColor: theme.boxesBackgroundColor,
      alignSelf: 'center',
      borderBottomColor: theme.boxesBorderColor,
      borderBottomWidth: 1,
    },
    description: {
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.8,
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
  });
  return styles;
};

export default useTopStoriesStyles;
