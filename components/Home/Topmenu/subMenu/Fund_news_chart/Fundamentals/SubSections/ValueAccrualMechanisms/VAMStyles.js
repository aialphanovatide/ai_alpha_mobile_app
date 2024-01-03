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
      margin: 5,
      backgroundColor: theme.boxesBackgroundColor,
      alignItems: 'center',
    },
    menuContainer: {
      width: '100%',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    menuItemName: {
      marginVertical: 5,
      color: theme.secondaryTextColor,
      textAlign: 'center',
    },
    iconContainer: {
      width: 20,
      height: 20,
      margin: 5,
      alignSelf: 'center',
    },
    itemIcon: {
      flex: 1,
      tintColor: theme.secondaryTextColor,
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
  });
  return styles;
};

export default useVAMStyles;
