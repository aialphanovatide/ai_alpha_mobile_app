import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useNavbarStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    iconContainer: {
      width: 40,
      height: 40,
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      flex: 1,
    },
    shadow: {
      position: 'absolute',
      top: -10,
      left: 0,
      right: 0,
      height: 10,
      backgroundColor: 'transparent',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.25,
      shadowRadius: 3,
      elevation: 5,
    },
    askAiButton: {
      width: 65,
      height: 65,
      borderRadius: 32.5,
      alignSelf: 'center',
      justifyContent: 'center',
    },
    buttonWrapper: {
      width: 78,
      height: 78,
      marginBottom: 38,
      borderRadius: 39,
      backgroundColor: 'transparent',
      justifyContent: 'center',
    },
    focusedButton: {
      borderWidth: 2,
      borderColor: '#FF6C0D',
    },
    buttonImage: {
      width: 38,
      height: 38,
      marginBottom: 4,
      alignSelf: 'center',
      tintColor: theme.askAiButtonColor,
    },
  });
  return styles;
};

export default useNavbarStyles;
