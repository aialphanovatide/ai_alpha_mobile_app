import {StyleSheet} from 'react-native';
import {useContext} from 'react';
import {AppThemeContext} from '../../../../context/themeContext';

const useCalendarSubMenuStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    menuContainer: {
      alignSelf: 'center',
      width: '90%',
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: theme.subMenuBgColor,
    },
    menuItem: {
      width: '50%',
      height: 20,
      backgroundColor: 'transparent',
      marginHorizontal: 2,
      borderRadius: 2.5,
      overflow: 'hidden',
    },
    menuItemText: {
      textAlign: 'center',
      fontSize: theme.responsiveFontSize * 0.75,
      color: theme.subMenuTextColor,
      fontWeight: 'bold',
    },
    activeItem: {
      backgroundColor: theme.activeWhite,
      borderColor: theme.subMenuBgColor,
      borderWidth: 2,
      borderRadius: 5,
    },
    activeText: {
      fontWeight: 'bold',
      color: theme.filterTextColor,
    },
  });
  return styles;
};

export default useCalendarSubMenuStyles;
