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
      marginVertical: theme.titlesVerticalMargin * 0.5,
      fontWeight: 'bold',
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
    },
    subTitle: {
      margin: theme.boxesVerticalMargin,
      marginHorizontal: theme.boxesVerticalMargin * 2,
      color: theme.titleColor,
      fontWeight: 'bold',
      fontSize: theme.responsiveFontSize,
    },
    subSectionContent: {
      flex: 1,
      marginVertical: theme.boxesVerticalMargin,
      backgroundColor: theme.secondaryBgColor,
      borderRadius: 4,
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
