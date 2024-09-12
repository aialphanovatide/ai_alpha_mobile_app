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
      backgroundColor: 'transparent',
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
    marginB: {
      marginBottom: 32,
    },
    menuItem: {
      width: '33.33%',
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 2,
      overflow: 'hidden',
    },
    menuItemText: {
      marginVertical: 4,
      textAlign: 'center',
      fontSize: theme.responsiveFontSize * 0.875,
      color: theme.subMenuTextColor,
      fontFamily: theme.fontMedium,
    },
    activeItem: {
      backgroundColor: theme.activeWhite,
      borderColor: theme.subMenuBgColor,
      borderWidth: 2,
      borderRadius: 2,
    },
    activeText: {
      fontFamily: theme.fontSemibold,
      color: theme.subMenuTextColor,
    },
    flex: {
      flex: 1,
    },
    linearBackground: {
      width: theme.width,
      height: 600,
      position: 'absolute',
      top: 0,
      left: 0,
    },
  });
  return styles;
};

export default useHomeStyles;
