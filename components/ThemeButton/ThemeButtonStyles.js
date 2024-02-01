import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../context/themeContext';
import {useContext} from 'react';

const useThemeButtonStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    buttonContainer: {
      position: 'relative',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      marginVertical: theme.boxesVerticalMargin,
      padding: 10,
      backgroundColor: theme.boxesBackgroundColor,
      alignItems: 'center',
      shadowColor: '#000',
      borderRadius: 2,
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
      paddingHorizontal: 5,
      fontWeight: 'bold',
      fontSize: theme.responsiveFontSize,
      color: theme.textColor,
    },
    switchContainer: {
      position:'absolute',
      right: 24,
      width: 25,
      height: 35,
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{scaleX: 0.8}, {scaleY: 0.8}],
      marginRight: 10,
    },
  });

  return styles;
};

export default useThemeButtonStyles;
