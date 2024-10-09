import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../context/themeContext';

const useCoinMenuStyles = () => {
  const {theme, isDarkMode} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    menu: {
      justifyContent: 'space-between',
      borderRadius: 20,
      width: '96%',
      backgroundColor: theme.mainBackgroundColor,
      marginTop: 8,
      marginBottom: 12,
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
      borderColor: '#A3A3A3',
      height: 30,
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonImage: {
      width: 16,
      height: 16,
      marginRight: 8,
      tintColor: '#A3A3A3',
    },
    buttonText: {
      color: '#A3A3A3',
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
      top: -8,
      right: '47.5%',
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
