import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';
import {useContext} from 'react';

const useBackButtonStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    backButton: {
      fontFamily: theme.fontSemibold,
      fontSize: theme.responsiveFontSize,
      color: theme.backbuttonColor,
      textDecorationColor: theme.backbuttonColor,
    },
    arrowContainer: {
      width: 12,
      height: 12,
      margin: 6,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    leftArrow: {
      tintColor: theme.backbuttonColor,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
  });
  return styles;
};

export default useBackButtonStyles;
