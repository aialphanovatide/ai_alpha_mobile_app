import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import { AppThemeContext } from '../../../context/themeContext';

const useLegalStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    backgroundColor: {
      flex: 1,
      backgroundColor: theme.mainBackgroundColor,
    },
    page: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'space-between',
      padding: 36,
      color: theme.textColor,
    },
    title: {
      marginVertical: '5%',
      marginLeft: '6%',
      color: theme.titleColor,
      fontSize: 25,
      fontWeight: 'bold',
    },
    headline: {
      color: theme.titleColor,
      fontFamily: 'ArialRoundedMTBold',
      fontSize: theme.titleFontSize,
      paddingVertical: 8,
      marginTop: 50,
    },
    text: {
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.8,
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
      width: 20,
      height: 20,
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
      shadowColor: '#000',
      borderRadius: 2,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,

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
      width: '70%',
      paddingVertical: '2.5%',
      paddingHorizontal: 10,
      fontWeight: 'bold',
      fontSize: theme.responsiveFontSize * 0.9,
      color: theme.textColor,
    },
    container: {
      flex: 1,
      width: theme.width,
      alignItems: 'center',
      backgroundColor: theme.mainBackgroundColor,
    },
    alphaLogoContainer: {
      width: 150,
      height: 150,
      marginVertical: theme.boxesVerticalMargin,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      flex: 1,
    },
    username: {
      margin: theme.boxesVerticalMargin,
      fontSize: theme.responsiveFontSize,
      color: theme.titleColor,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    row: {
      width: '80%',
      flexDirection: 'row',
    },
    paddingV: {
      paddingVertical: 24,
    }
  });
  return styles;
};

export default useLegalStyles;
