import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../context/themeContext';

const useAccountStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    backgroundColor: {
      flex: 1,
    },
    page: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'space-between',
      padding: 36,
      color: theme.textColor,
    },
    headline: {
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
      fontFamily: theme.fontSemibold,
      paddingVertical: 8,
      marginTop: 50,
    },
    text: {
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.fontMedium,
      textTransform: 'capitalize',
    },
    userIdentifier: {
      color: theme.textColor,
    },
    greenColor: {
      color: theme.priceUpColor,
    },
    redColor: {
      color: theme.priceDownColor,
    },
    rightArrowContainer: {
      position: 'absolute',
      right: 24,
      width: 12,
      height: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rightArrow: {
      flex: 1,
      tintColor: theme.secondaryTextColor,
    },
    optionsContainer: {
      marginVertical: theme.boxesVerticalMargin,
      width: theme.width,
      padding: 10,
    },
    itemContainer: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      marginVertical: 4,
      padding: 12,
      backgroundColor: theme.boxesBackgroundColor,
      alignItems: 'center',
      borderRadius: 2,
    },
    itemLogoContainer: {
      width: 30,
      height: 30,
      marginHorizontal: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemLogo: {
      flex: 1,
      tintColor: theme.textColor,
    },
    itemName: {
      width: '60%',
      paddingVertical: '2.5%',
      paddingHorizontal: 10,
      fontFamily: theme.fontMedium,
      fontSize: theme.responsiveFontSize,
      color: theme.textColor,
    },
    container: {
      flex: 1,
      width: theme.width,
      alignItems: 'center',
    },
    alphaLogoContainer: {
      width: 150,
      height: 150,
      marginVertical: theme.boxesVerticalMargin,
      marginTop: theme.titlesVerticalMargin,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      flex: 1,
    },
    username: {
      margin: theme.boxesVerticalMargin,
      marginTop: 0,
      fontSize: theme.responsiveFontSize * 1.2,
      fontFamily: theme.fontSemibold,
      color: theme.titleColor,
      textAlign: 'center',
    },
    row: {
      width: '80%',
      flexDirection: 'row',
    },
    gradient: {
      flex: 1,
      width: theme.width,
      height: theme.height,
    },
  });
  return styles;
};

export default useAccountStyles;
