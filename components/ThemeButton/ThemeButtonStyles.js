import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../context/themeContext';
import {useContext} from 'react';

const useThemeButtonStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    buttonContainer: {
      width: '90%',
      display: 'flex',
      flexDirection: 'row',
      marginVertical: 5,
      marginHorizontal: 15,
      padding: 15,
      backgroundColor: theme.boxesBackgroundColor,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
    },
    buttonLogoContainer: {
      width: 30,
      height: 30,
      marginHorizontal: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonLogo: {
      flex: 1,
      tintColor: theme.textColor,
    },
    name: {
      width: '60%',
      paddingVertical: '2.5%',
      paddingHorizontal: 10,
      fontWeight: 'bold',
      fontSize: theme.responsiveFontSize,
      color: theme.textColor,
    },
    switchContainer: {
      width: 20,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

  return styles;
};

export default useThemeButtonStyles;
