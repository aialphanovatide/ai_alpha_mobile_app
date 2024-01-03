import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';
import {useContext} from 'react';

const useBackButtonStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    backButtonContainer: {
      marginHorizontal: 5,
      paddingHorizontal: 5,
      paddingVertical: 10,
    },
    backButton: {
      fontSize: theme.width * 0.045,
      fontWeight: 'bold',
      color: theme.backbuttonColor,
      textDecorationLine: 'underline',
    },
  });
  return styles;
};

export default useBackButtonStyles;
