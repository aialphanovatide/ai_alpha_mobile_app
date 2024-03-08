import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../context/themeContext';

const useCoinMenuStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    menu: {
      justifyContent: 'space-between',
      borderRadius: 20,
      width: '96%',
      backgroundColor: theme.mainBackgroundColor,
    },
    subMenu: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
      borderRadius: 30,
      backgroundColor: theme.mainBackgroundColor,
    },
    subMenuButton: {
      width: '30%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      borderWidth: 1,
      borderColor: theme.inactiveColor,
      height: 30,
    },
    firstActiveButton: {
      backgroundColor: theme.activePurple,
      color: theme.activeWhite,
    },
    secondActiveButton: {
      backgroundColor: theme.activePink,
      color: theme.activeWhite,
    },
    thirdActiveButton: {
      backgroundColor: theme.activeBlack,
      color: theme.activeWhite,
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonImage: {
      width: 15,
      height: 15,
      marginRight: 8,
    },
    buttonText: {
      color: theme.inactiveColor,
      textTransform: 'uppercase',
      fontSize: theme.responsiveFontSize * 0.925,
      fontFamily: theme.fontMedium,
    },
    activeButtonText: {
      color: theme.activeWhite,
      fontFamily: theme.fontSemibold,
    },
  });
  return styles;
};

export default useCoinMenuStyles;
