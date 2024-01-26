import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../context/themeContext';

const useMenuItemStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    buttonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 5,
    },
    button: {
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
      overflow: 'hidden',
      backgroundColor: theme.topMenuActiveBg,
    },
    buttonText: {
      maxWidth: 60,
      fontSize: theme.responsiveFontSize * 0.675,
      fontWeight: 'bold',
      color: theme.titleColor,
      textTransform: 'capitalize',
    },
    imageIcon: {
      flex: 1,
    },
    activeButton: {
      borderWidth: 2,
    },
  });
  return styles;
};

export default useMenuItemStyles;
