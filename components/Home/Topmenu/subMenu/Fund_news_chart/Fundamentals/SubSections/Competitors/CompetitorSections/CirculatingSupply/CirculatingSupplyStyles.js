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
    valueLabel: {
      position: 'absolute',
      right: 16,
      top: 16,
      marginVertical: 8,
      textAlign: 'right',
      color: theme.secondaryTextColor,
      fontSize: theme.responsiveFontSize,
      fontFamily: theme.fontMedium,
    },
    infinityLabel: {
      color: theme.secondaryTextColor,
      fontFamily: theme.fontMedium,
      fontSize: theme.responsiveFontSize * 1.2,
    },
    infinityButton: {
      position: 'absolute',
      right: 24,
      top: 16,
      zIndex: 2,
      paddingHorizontal: 6,
      borderWidth: 1,
      borderRadius: 14,
      borderColor: theme.secondaryTextColor,
    },
    labelBottom: {
      marginTop: 2,
      flex: 1,
      fontSize: theme.responsiveFontSize,
      color: theme.orange,
      fontFamily: theme.fontMedium,
    },
    text: {
      color: theme.textColor,
      fontFamily: theme.fontMedium,
    },
    orange: {
      color: theme.activeOrange,
    },
    transparent: {
      color: 'transparent'
    },
    row: {
      flex: 1,
      position: 'relative',
      marginVertical: 8,
      paddingHorizontal: 4,
      flexDirection: 'row',
      justifyContent: 'space-between',
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
    itemRow: {
      flexDirection: 'row',
    },
    image: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignSelf: 'center',
      margin: 8,
    },
    dataContainer: {
      flex: 1,
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
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginVertical: theme.boxesVerticalMargin,
    },
    itemIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignSelf: 'center',
      margin: 8,
    },
    marginLeft: {
      marginLeft: 8,
    },
    column: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
    button: {
      width: '45%',
      padding: 8,
      borderRadius: 4,
      alignItems: 'center',
    },
    activeOrangeButton: {
      backgroundColor: theme.orangeTextColor,
      borderColor: 'transparent',
    },
    activeText: {
      color: theme.subscriptions.foundersText,
      fontFamily: theme.fontSemibold,
    },
    alignRight: {
      right: 10,
      backgroundColor: theme.grayButtonColor,
    },
    alignLeft: {
      left: 10,
      backgroundColor: theme.orangeButton,
      borderWidth: 1,
      borderColor: theme.orangeTextColor,
    },
    supplyText: {
      color: theme.orangeTextColor,
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.fontMedium,
    },
    totalText: {
      color: theme.boxesBackgroundColor,
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.fontMedium,
    },
    tokenName: {
      fontSize: theme.responsiveFontSize,
      color: theme.textColor,
      textAlign: 'left',
      fontFamily: theme.fontSemibold,
    },
    none: {
      display: 'none',
    },
    inflationaryRow: {
      flexDirection: 'row',
    },
  });
  return styles;
};

export default useCirculatingSupplyStyles;
