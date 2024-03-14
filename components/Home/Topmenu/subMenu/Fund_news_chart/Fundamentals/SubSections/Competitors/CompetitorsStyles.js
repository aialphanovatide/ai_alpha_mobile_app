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
      margin: 4,
      borderRadius: 4,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconContainer: {
      position: 'absolute',
      top: 12,
      width: 'auto',
      height: 20,
      margin: 5,
    },
    itemIcon: {
      flex: 1,
      tintColor: theme.fundamentalsMenuText,
    },
    menuItemName: {
      minHeight: 25,
      padding: 5,
      color: theme.fundamentalsMenuText,
      textAlign: 'center',
      fontSize: theme.responsiveFontSize * 0.8,
      lineHeight: 22,
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
      margin: theme.titlesVerticalMargin * 0.5,
      marginHorizontal: theme.titlesVerticalMargin,
      color: theme.titleColor,
      fontSize: theme.responsiveFontSize * 0.95,
      fontWeight: 'bold',
    },
  });
  return styles;
};

export default useCompetitorsStyles;
