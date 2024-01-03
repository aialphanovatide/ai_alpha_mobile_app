import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../context/themeContext';
import {useContext} from 'react';

const useThemeButtonStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    buttonContainer: {
      position: 'absolute',
      bottom: 5,
      left: 5,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      borderRadius: 30,
      borderWidth: 2,
      borderColor: theme.inactiveGray,
      backgroundColor: theme.boxesBackgroundColor,
      zIndex: 100,
    },
    buttonSymbol: {
      fontSize: theme.responsiveFontSize,
    },
  });

  return styles;
};

export default useThemeButtonStyles;
