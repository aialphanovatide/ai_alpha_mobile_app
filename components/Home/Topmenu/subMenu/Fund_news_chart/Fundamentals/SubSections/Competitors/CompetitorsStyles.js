import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const useCompetitorsStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    menuContainer: {
      flex: 1,
      flexDirection: 'row',
      marginHorizontal: 10,
    },
    menuItemContainer: {
      width: 100,
      height: '90%',
      paddingVertical: 10,
      paddingHorizontal: 5,
      marginHorizontal: 5,
      borderRadius: 5,
      backgroundColor: theme.boxesBackgroundColor,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconContainer: {
      width: 15,
      height: 15,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemIcon: {
      flex: 1,
      tintColor: theme.fundamentalsMenuText,
    },
    menuItemName: {
      padding: 5,
      color: theme.fundamentalsMenuText,
      textAlign: 'center',
      fontSize: theme.responsiveFontSize * 0.9,
    },
    activeItem: {
      color: theme.orange,
      fontWeight: 'bold',
    },
    competitorSection: {
      flex: 1,
      marginVertical: 10,
    },
    title: {
      color: theme.titleColor,
      fontSize: theme.responsiveFontSize * 0.95,
      fontWeight: 'bold',
      padding: 5,
    },
  });
  return styles;
};

export default useCompetitorsStyles;
