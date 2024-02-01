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
      marginTop: 2.5,
      marginHorizontal: 2.5,
      width: 20,
      height: 20,
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
