/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../context/themeContext';
import {useContext} from 'react';

const useHomeStyles = () => {
  const {theme} = useContext(AppThemeContext);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
    },
    marginWrapper: {
      flex: 1,
      marginVertical: theme.boxesMarginVertical,
      backgroundColor: theme.mainBackgroundColor,
    },
    menuContainer: {
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: theme.subMenuBgColor,
    },
    paddingH: {
      paddingHorizontal: 10,
    },
    menuItem: {
      width: '33.33%',
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 6,
      overflow: 'hidden',
    },
    menuItemText: {
      marginVertical: 4,
      textAlign: 'center',
      fontSize: theme.responsiveFontSize * 0.825,
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
      color: theme.subMenuTextColor,
    },
    flex: {
      flex: 1,
    },
  });
  return styles;
};

export default useHomeStyles;
