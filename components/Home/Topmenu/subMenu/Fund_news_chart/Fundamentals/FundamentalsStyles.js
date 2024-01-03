import {useContext} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {AppThemeContext} from '../../../../../../context/themeContext';

const useFundamentalsStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      width: theme.width,
      paddingHorizontal: 10,
      paddingTop: 30,
      marginBottom: 80,
      backgroundColor: theme.mainBackgroundColor,
    },
    title: {
      margin: 10,
      fontWeight: 'bold',
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
    },
    subTitle: {
      margin: 10,
      color: theme.titleColor,
      fontWeight: 'bold',
      fontSize: theme.responsiveFontSize,
    },
    subSectionContent: {
      flex: 1,
      marginBottom: 20,
      padding: 10,
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 5,
    },
    backgroundColor: {
      backgroundColor: theme.mainBackgroundColor,
    },
  });
  return styles;
};

export default useFundamentalsStyles;
