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
    },
    menuItemContainer: {
      width: theme.width * 0.3,
      height: theme.height * 0.15,
      marginHorizontal: 4,
      borderRadius: 4,
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
      marginVertical: theme.boxesVerticalMargin,
    },
    title: {
      margin: theme.titlesVerticalMargin,
      color: theme.titleColor,
      fontSize: theme.responsiveFontSize * 0.95,
      fontWeight: 'bold',
    },
  });
  return styles;
};

export default useCompetitorsStyles;
