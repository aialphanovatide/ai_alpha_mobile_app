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
      width: '100%',
      padding: 12,
    },
    itemContainer: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      marginVertical: 4,
      padding: 12,
      backgroundColor: theme.boxesBackgroundColor,
      alignItems: 'center',
      borderRadius: 3,
    },
    itemLogoContainer: {
      maxWidth: 26,
      height: 26,
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
      width: '100%',
      alignItems: 'center',
    },
    alphaLogoContainer: {
      width: 70,
      height: 70,
      marginVertical: theme.boxesVerticalMargin,
      marginTop: theme.titlesVerticalMargin,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
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
    mainView: {
      flex: 1,
      width: '100%',
      height: theme.height,
    },
    imageContainer: {
      alignItems: 'center',
    },
    gradient: {
      width: theme.width,
      height: 800,
      position: 'absolute',
      top: 0,
      left: 0,
    },
    userImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    socialMediaContainer: {
      width: '100%',
      marginVertical: 22,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopColor: theme.horizontalLineColor,
      borderBottomColor: theme.horizontalLineColor,
      borderTopWidth: 1,
      borderBottomWidth: 1,
    },
    buttonsContainer: {
      flexDirection: 'row',
      width: '100%',
      marginVertical: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    socialMediaButton: {
      marginHorizontal: 15,
    },
    socialLogo: {
      height: 32,
      width: 40,
      alignSelf: 'center',
    },
    socialMediaTitle: {
      color: theme.textColor,
      fontSize: 16,
      fontFamily: theme.fontMedium,
      textAlign: 'center',
    },
  });
  return styles;
};

export default useAccountStyles;
