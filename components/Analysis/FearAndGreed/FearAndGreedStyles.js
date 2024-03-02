import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useFearAndGreedStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    mainSection: {
      flex: 1,
      width: theme.width,
      height: theme.height * 0.8,
      backgroundColor: 'transparent',
      padding: 10,
      paddingTop: 36,
    },
    fearAndGreedWidgetContainer: {
      flex: 1,
      margin: theme.boxesVerticalMargin,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      backgroundColor: theme.boxesBackgroundColor,
    },
    container: {
      width: '100%',
      height: 250,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      overflow: 'hidden',
    },
    indexNumber: {
      marginVertical: 5,
      fontSize: theme.titleFontSize,
      textAlign: 'center',
      fontWeight: 'bold',
      color: theme.titleColor,
    },
    label: {
      textAlign: 'center',
      marginVertical: 2.5,
      color: '#242427',
      fontWeight: 'bold',
      fontSize: theme.responsiveFontSize * 1.1,
    },
    title: {
      marginTop: theme.titlesVerticalMargin,
      paddingHorizontal: 10,
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
      fontWeight: 'bold',
    },
    widget: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
      transform: [{translateY: -35}],
    },
    sectionDescription: {
      width: '100%',
      marginVertical: theme.boxesVerticalMargin,
      paddingHorizontal: 8,
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.textColor,
      textAlign: 'left',
      lineHeight: 20,
    },
  });
  return styles;
};

export default useFearAndGreedStyles;
