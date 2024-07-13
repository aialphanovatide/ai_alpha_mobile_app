import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useLegalStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    backgroundColor: {
      flex: 1,
      width: '100%',
      backgroundColor: 'transparent',
    },
    backButtonContainer: {
      marginHorizontal: 20,
    },
    title: {
      marginHorizontal: 26,
      marginTop: 18,
      color: theme.titleColor,
      fontSize: 25,
      fontFamily: theme.fontMedium,
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
      width: '70%',
      paddingVertical: '2.5%',
      paddingHorizontal: 10,
      fontSize: theme.responsiveFontSize * 0.95,
      fontFamily: theme.fontMedium,
      color: theme.textColor,
    },
    container: {
      flex: 1,
      width: theme.width,
      alignItems: 'center',
      backgroundColor: theme.mainBackgroundColor,
    },
    image: {
      flex: 1,
    },
    row: {
      width: '80%',
      flexDirection: 'row',
    },
    paddingV: {
      paddingVertical: 24,
    },
  });
  return styles;
};

export default useLegalStyles;
