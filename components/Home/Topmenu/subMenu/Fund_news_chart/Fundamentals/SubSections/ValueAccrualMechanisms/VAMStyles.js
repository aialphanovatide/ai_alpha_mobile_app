import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const useVAMStyles = () => {
  const {theme} = useContext(AppThemeContext);

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      alignSelf: 'center',
    },
    menuItemContainer: {
      width: theme.width * 0.435,
      height: 64,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    menuContainer: {
      flex: 1,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    menuItemName: {
      color: theme.fundamentalsMenuText,
      textAlign: 'center',
      fontSize: theme.responsiveFontSize * 0.8,
    },
    itemIcon: {
      width: 18,
      height: 18,
      marginTop: 5,
      marginBottom: 2,
      tintColor: theme.fundamentalsMenuText,
    },
    activeItem: {
      color: theme.orange,
      fontWeight: 'bold',
    },
    dataContainer: {
      width: '100%',
      flex: 1,
      marginVertical: theme.boxesVerticalMargin,
      justifyContent: 'flex-start',
    },
    dataTitle: {
      marginVertical: 4,
      marginHorizontal: 8,
      color: theme.titleColor,
      fontSize: theme.responsiveFontSize * 0.95,
      fontWeight: 'bold',
      padding: 5,
    },
    dataRow: {
      width: '100%',
      flexDirection: 'row',
      backgroundColor: theme.fundamentalsCompetitorsItemBg,
    },
    dataImageContainer: {
      width: 'auto',
      height: '100%',
    },
    dataImage: {
      alignSelf: 'flex-start',
    },
    dataText: {
      marginVertical: theme.boxesVerticalMargin,
      marginHorizontal: 8,
      padding: 4,
      flex: 1,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.8,
      lineHeight: 18,
      textAlign: 'left',
    },
    activeItemBgImage: {
      flex: 1,
    },
  });
  return styles;
};

export default useVAMStyles;
