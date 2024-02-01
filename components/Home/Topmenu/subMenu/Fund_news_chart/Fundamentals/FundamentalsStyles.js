import {useContext} from 'react';
import {StyleSheet} from 'react-native';
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
      margin: theme.titlesVerticalMargin,
      fontWeight: 'bold',
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
    },
    subTitle: {
      margin: theme.boxesVerticalMargin,
      color: theme.titleColor,
      fontWeight: 'bold',
      fontSize: theme.responsiveFontSize,
    },
    subSectionContent: {
      flex: 1,
      marginVertical: theme.boxesVerticalMargin,
      padding: 10,
      backgroundColor: theme.secondaryBgColor,
      borderRadius: 5,
    },
    backgroundColor: {
      backgroundColor: theme.mainBackgroundColor,
    },
    subSection: {
      flex: 1,
      marginVertical: theme.boxesVerticalMargin,
    },
  });
  return styles;
};

export default useFundamentalsStyles;
