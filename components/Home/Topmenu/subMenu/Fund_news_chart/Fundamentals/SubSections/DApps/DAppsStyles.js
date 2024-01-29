import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const useDappsStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    itemContainer: {
      flex: 1,
      flexDirection: 'row',
      margin: 2.5,
      padding: 2.5,
      backgroundColor: theme.thirdBoxesBgColor,
    },
    logoContainer: {
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      borderRadius: 5,
      backgroundColor: theme.boxesBackgroundColor,
      margin: 5,
    },
    logo: {
      flex: 1,
    },
    disabled: {
      tintColor: theme.thirdBoxesBgColor,
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
      margin: 10,
      padding: 10,
      backgroundColor: theme.boxesBackgroundColor,
    },
    title: {
      marginVertical: 5,
      fontSize: theme.titleFontSize,
      textTransform: 'capitalize',
      color: theme.textColor,
      fontWeight: 'bold',
    },
    text: {
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.textColor,
    },
    description: {
      marginBottom: 10,
    },
    row: {
      marginHorizontal: 5,
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
