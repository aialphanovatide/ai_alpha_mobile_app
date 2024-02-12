import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const useDappsStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    itemContainer: {
      flex: 1,
      flexDirection: 'row',
      padding: 10,
    },
    logoContainer: {
      width: 50,
      height: 56,
      justifyContent: 'flex-start',
      alignItems: 'center',
      overflow: 'visible',
    },
    logo: {
      flex: 1,
      marginBottom: '20%',
    },
    disabled: {
      tintColor: theme.dAppsInactiveItem,
    },
    mainImageContainer: {
      height: 300,
      marginVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    mainImage: {
      flex: 1,
    },
    dataContainer: {
      margin: theme.boxesVerticalMargin,
      padding: 10,
      backgroundColor: theme.boxesBackgroundColor,
    },
    title: {
      marginVertical: theme.boxesVerticalMargin,
      marginHorizontal: 12,
      fontSize: theme.titleFontSize,
      textTransform: 'capitalize',
      color: theme.textColor,
      fontWeight: 'bold',
    },
    text: {
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.textColor,
      lineHeight: 16,
    },
    description: {
      marginHorizontal: 10,
      marginBottom: 10,
    },
    row: {
      marginVertical: 4,
      marginHorizontal: 10,
      width: '70%',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    strong: {
      fontWeight: 'bold',
    },
  });
  return styles;
};

export default useDappsStyles;
