import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';
import {useContext} from 'react';

const useCirculatingSupplyStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    progressBarContainer: {
      padding: 10,
      alignItems: 'center',
    },
    progressBar: {
      height: 15,
      width: '100%',
      marginVertical: 4,
      borderWidth: 2,
      backgroundColor: theme.secondaryGrayColor,
      borderColor: theme.secondaryGrayColor,
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: theme.orange,
    },
    infinityBar: {
      borderRightWidth: 0,
      borderLeftWidth: 0,
    },
    referenceLabel: {
      width: '40%',
      marginHorizontal: 12,
      paddingVertical: 2,
      fontSize: theme.responsiveFontSize * 0.75,
      lineHeight: 20,
      borderRadius: 4,
      color: theme.whiteTextColor,
      fontFamily: theme.fontMedium,
      textAlign: 'center'
    },
    symbolLabel: {
      paddingHorizontal: 10,
      paddingVertical: 2,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.font,
      borderColor: theme.textColor,
      borderWidth: 1,
      textAlign: 'left',
    },
    noMargin: {
      marginHorizontal: 0,
    },
    noPaddingH: {
      paddingHorizontal: 0,
    },
    labelRight: {
      marginHorizontal: 0,
      backgroundColor: theme.orange,
    },
    labelLeft: {
      backgroundColor: theme.orange,
    },
    symbolWrapper: {
      padding: 6,
      paddingTop: 8,
      paddingHorizontal: 12,
      paddingBottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    referenceIconImage: {
      width: 14,
      height: 14,
      tintColor: theme.textColor,
    },
    valueLabel: {
      fontSize: theme.responsiveFontSize * 0.9,
      color: theme.secondaryTextColor,
      fontFamily: theme.font,
    },
    labelBottom: {
      marginLeft: '45%',
      marginTop: 2,
      flex: 1,
      fontSize: theme.responsiveFontSize,
      color: theme.orange,
      fontFamily: theme.fontSemibold,
    },
    text: {
      color: theme.textColor,
      fontFamily: theme.fontMedium,
    },
    orange: {
      color: theme.activeOrange,
    },
    row: {
      position: 'relative',
      marginVertical: theme.boxesVerticalMargin,
      width: '100%',
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoContainer: {
      marginLeft: 16,
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      overflow: 'hidden',
    },
    usersContainer: {
      flexDirection: 'row',
      margin: 5,
    },
    userImageContainer: {
      width: 20,
      margin: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    userImage: {
      flex: 1,
      tintColor: theme.thirdBoxesBgColor,
    },
    itemName: {
      color: theme.inactiveTextColor,
      marginHorizontal: 10,
      fontSize: theme.responsiveFontSize,
      fontFamily: theme.fontMedium,
    },
    image: {
      flex: 1,
    },
    dataContainer: {
      flex: 1,
      padding: 10,
    },
    inflationaryArrow: {
      width: 14,
      height: 14,
      tintColor: theme.textColor,
    },
    inflationaryLabel: {
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.textColor,
      fontFamily: theme.fontMedium,
    },
    noVerticalMargin: {
      marginVertical: 0,
    },
    circulatingSupplyItem: {
      flex: 1,
      marginVertical: theme.boxesVerticalMargin,
    },
  });
  return styles;
};

export default useCirculatingSupplyStyles;
