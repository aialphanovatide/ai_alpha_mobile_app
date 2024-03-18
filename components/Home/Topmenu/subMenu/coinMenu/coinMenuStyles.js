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
      marginBottom: 16,
    },
    subMenu: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
      borderRadius: 30,
      backgroundColor: theme.fundamentalsCompetitorsItemBg,
    },
    subMenuButton: {
      width: '30%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      borderWidth: 1,
      borderColor: theme.secondaryTextColor,
      height: 30,
    },
    firstActiveButton: {
      backgroundColor: theme.activePurple,
      color: theme.activeWhite,
      borderColor: theme.activePurple,
    },
    secondActiveButton: {
      backgroundColor: theme.activePink,
      color: theme.activeWhite,
      borderColor: theme.activePink,
    },
    thirdActiveButton: {
      backgroundColor: theme.activeBlack,
      borderColor: theme.activeBlack,
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
      color: theme.secondaryTextColor,
      textTransform: 'uppercase',
      fontSize: theme.responsiveFontSize * 0.925,
      fontFamily: theme.fontMedium,
    },
    activeButtonText: {
      color: theme.whiteTextColor,
      fontFamily: theme.fontSemibold,
    },
  });
  return styles;
};

export default useCoinMenuStyles;
