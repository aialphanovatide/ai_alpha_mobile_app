import {StyleSheet} from 'react-native';
import {useContext} from 'react';
import {AppThemeContext} from '../../../../context/themeContext';

const useCalendarSubMenuStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    menuContainer: {
      marginVertical: theme.boxesVerticalMargin,
      flexDirection: 'row',
      alignSelf: 'center',
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 4,
    },
    menuItem: {
      width: '47.25%',
      backgroundColor: 'transparent',
      borderRadius: 4,
      overflow: 'hidden',
    },
    menuItemText: {
      marginVertical: 5,
      textAlign: 'center',
      fontSize: theme.responsiveFontSize * 0.75,
      fontFamily: theme.font,
      color: theme.secondaryTextColor,
    },
    activeItem: {
      backgroundColor: theme.activeWhite,
      borderColor: theme.subMenuBgColor,
      borderWidth: 2,
      borderRadius: 4,
    },
    activeText: {
      fontFamily: theme.fontMedium,
      color: theme.subMenuTextColor,
    },
  });
  return styles;
};

export default useCalendarSubMenuStyles;
