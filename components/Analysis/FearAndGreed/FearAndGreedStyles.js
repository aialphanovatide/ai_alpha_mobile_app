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
      backgroundColor: theme.mainBackgroundColor,
    },
    fearAndGreedWidgetContainer: {
      flex: 1,
      marginHorizontal: theme.width * 0.04,
      marginVertical: theme.height * 0.04,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: theme.secondaryBoxesBgColor,
    },
    container: {
      width: 360,
      height: 250,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
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
      paddingVertical: 2.5,
      paddingHorizontal: 15,
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
  });
  return styles;
};

export default useFearAndGreedStyles;
