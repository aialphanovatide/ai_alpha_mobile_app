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
      marginVertical: 12,
      overflow: 'visible',
    },
    subMenu: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
      borderRadius: 30,
      backgroundColor: theme.fundamentalsCompetitorsItemBg,
      overflow: 'visible',
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
      width: 18,
      height: 18,
      marginRight: 8,
    },
    buttonText: {
      color: theme.secondaryTextColor,
      textTransform: 'uppercase',
      fontSize: 13.33333,
      fontFamily: theme.fontMedium,
    },
    activeButtonText: {
      color: theme.whiteTextColor,
      fontFamily: theme.fontSemibold,
    },
    activeCoinIndicator: {
      position: 'absolute',
      top: -15,
      right: 20,
      width: 25,
      height: 12,
      alignSelf: 'center',
      tintColor: theme.fundamentalsCompetitorsItemBg,
      zIndex: 1000
    }
  });
  return styles;
};

export default useCoinMenuStyles;
