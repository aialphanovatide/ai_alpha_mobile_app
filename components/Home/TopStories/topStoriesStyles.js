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
      marginVertical: 5,
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 2,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 3,
      },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 3,
      alignSelf: 'center',
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
