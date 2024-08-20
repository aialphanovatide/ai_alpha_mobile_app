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
    },
    buttonText: {
      maxWidth: '100%',
      fontSize: 13.33333,
      color: theme.titleColor,
      textTransform: 'capitalize',
      textAlign: 'center',
      fontFamily: theme.fontMedium,
    },
    imageIcon: {
      flex: 1,
      width: 60,
      height: 60,
    },
    activeButton: {
      borderWidth: 2,
    },
  });
  return styles;
};

export default useMenuItemStyles;
