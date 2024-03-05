import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';
import {useContext} from 'react';

const useBackButtonStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    backButton: {
      fontFamily: 'prompt',
      fontSize: theme.responsiveFontSize,
      fontWeight: 'bold',
      color: theme.backbuttonColor,
      textDecorationLine: 'underline',
    },
    arrowContainer: {
      margin: 6,
      width: 12,
      height: 12,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    leftArrow: {
      flex: 1,
      tintColor: theme.backbuttonColor,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'flex-start'
    },
  });
  return styles;
};

export default useBackButtonStyles;
