import {useContext} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useTopStoriesStyles = () => {
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
      backgroundColor: theme.boxesBackgroundColor,
    },
    description: {
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.8,
    },
    arrowDown: {
      width: 15,
      height: 15,
      tintColor: theme.textColor,
    },
    emptyMessage: {
      margin: '10%',
      padding: '5%',
      fontSize: theme.titleFontSize,
      color: theme.titleColor,
      borderRadius: 10,
      alignSelf: 'center',
      borderColor: theme.textColor,
      borderWidth: 2,
      fontWeight: 'bold',
    },
  });
  return styles;
};

export default useTopStoriesStyles;
