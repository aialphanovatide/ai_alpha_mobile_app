import {StyleSheet} from 'react-native';
import {useContext} from 'react';
import {AppThemeContext} from '../../../../context/themeContext';

const useCalendarSubMenuStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    menuContainer: {
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: theme.subMenuBgColor,
    },
    menuItem: {
      width: '50%',
      backgroundColor: 'transparent',
      borderRadius: 8,
      overflow: 'hidden',
    },
    menuItemText: {
      marginVertical: 5,
      textAlign: 'center',
      fontSize: theme.responsiveFontSize * 0.75,
      color: theme.subMenuTextColor,
      fontWeight: 'bold',
    },
    activeItem: {
      backgroundColor: theme.activeWhite,
      borderColor: theme.subMenuBgColor,
      borderWidth: 2,
      borderRadius: 4,
    },
    activeText: {
      fontWeight: 'bold',
      color: theme.filterTextColor,
    },
  });
  return styles;
};

export default useCalendarSubMenuStyles;