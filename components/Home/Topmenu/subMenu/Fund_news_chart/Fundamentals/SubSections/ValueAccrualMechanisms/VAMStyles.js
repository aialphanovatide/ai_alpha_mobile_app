import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const useVAMStyles = () => {
  const {theme} = useContext(AppThemeContext);

  const styles = StyleSheet.create({
    container: {
      width: theme.width - 30,
      alignSelf: 'center',
    },
    menuItemContainer: {
      width: theme.width * 0.45,
      height: 64,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    activeMenuContainer: {
      marginTop: 15,
      height: 75,
    },
    menuContainer: {
      width: '100%',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    menuItemName: {
      color: theme.fundamentalsMenuText,
      textAlign: 'center',
      fontSize: theme.responsiveFontSize * 0.8,
    },
    iconContainer: {
      width: 20,
      height: 20,
      marginTop: 5,
      alignSelf: 'center',
      justifyContent: 'flex-start'
    },
    itemIcon: {
      flex: 1,
      tintColor: theme.fundamentalsMenuText,
    },
    activeItem: {
      color: theme.orange,
      fontWeight: 'bold',
    },
    dataContainer: {
      marginVertical: 10,
    },
    dataTitle: {
      color: theme.titleColor,
      fontSize: theme.responsiveFontSize * 0.95,
      fontWeight: 'bold',
      padding: 5,
    },
    dataRow: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: theme.boxesBackgroundColor,
    },
    imageContainer: {
      width: 80,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dataImage: {
      flex: 1,
    },
    dataText: {
      flex: 1,
      padding: 10,
      margin: 10,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.85,
    },
    activeItemBgImage: {
      flex: 1,
    },
  });
  return styles;
};

export default useVAMStyles;
