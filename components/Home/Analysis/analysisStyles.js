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
      backgroundColor: theme.boxesBackgroundColor,
    },
    description: {
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.textColor
    }
  });
  return styles;
};

export default useHomeAnalysisStyles;
