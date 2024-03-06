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
    },
    arrowContainer: {
      margin: 4,
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
