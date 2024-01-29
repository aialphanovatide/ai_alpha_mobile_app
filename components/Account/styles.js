import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../context/themeContext';

const useAccountStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    backgroundColor: {
      backgroundColor: theme.mainBackgroundColor,
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
      marginVertical: theme.height * 0.1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemContainer: {
      position: 'relative',
      width: '90%',
      display: 'flex',
      flexDirection: 'row',
      marginVertical: 5,
      marginHorizontal: 15,
      padding: 15,
      backgroundColor: theme.boxesBackgroundColor,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
      alignItems: 'center',
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
      fontWeight: 'bold',
      fontSize: theme.responsiveFontSize,
      color: theme.textColor,
    },
    container: {
      flex: 1,
      width: theme.width,
      padding: theme.width * 0.06,
      alignItems: 'center',
    },
    alphaLogoContainer: {
      width: 150,
      height: 150,
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
    },
    image: {
      flex: 1,
    },
    username: {
      marginHorizontal: 10,
      padding: 10,
      fontSize: theme.titleFontSize * 0.925,
      color: theme.titleColor,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    row: {
      width: '80%',
      flexDirection: 'row',
    },
  });
  return styles;
};

export default useAccountStyles;
