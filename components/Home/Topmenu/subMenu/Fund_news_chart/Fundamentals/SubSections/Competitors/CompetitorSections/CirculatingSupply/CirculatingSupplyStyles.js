import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';
import {useContext} from 'react';

const useCirculatingSupplyStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      marginVertical: 8,
    },
    progressBarContainer: {
      flex: 1,
      padding: 2,
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
      backgroundColor: '#FF9521',
    },
    infinityBar: {},
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
      backgroundColor: '#FF9521',
    },
    labelLeft: {
      backgroundColor: '#FF9521',
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
      top: 2,
      right: 4,
      marginVertical: 8,
      textAlign: 'right',
      color: theme.secondaryTextColor,
      fontSize: 12,
      fontFamily: theme.font,
      alignSelf: 'flex-end',
    },
    infinityLabel: {
      color: theme.secondaryTextColor,
      fontFamily: theme.fontMedium,
      fontSize: theme.responsiveFontSize * 1.2,
    },
    infinityButton: {
      position: 'absolute',
      top: 4,
      right: 4,
      paddingHorizontal: 6,
      borderWidth: 1.5,
      borderRadius: 14,
      borderColor: theme.secondaryTextColor,
      zIndex: 2,
    },
    labelBottom: {
      position: 'absolute',
      top: 22,
      fontSize: 12,
      color: '#FF9521',
      fontFamily: theme.font,
    },
    text: {
      color: theme.textColor,
      fontFamily: theme.font,
      fontSize: 10,
    },
    orange: {
      color: theme.activeOrange,
    },
    transparent: {
      color: 'transparent',
    },
    row: {
      position: 'relative',
      paddingHorizontal: 4,
      flexDirection: 'row',
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
      alignSelf: 'center',
    },
    itemRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 27,
      height: 27,
      borderRadius: 13.5,
      alignSelf: 'center',
      margin: 8,
      marginVertical: 4,
    },
    dataContainer: {
      flex: 1,
    },
    inflationaryArrow: {
      width: 18,
      height: 15,
      marginLeft: 24,

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
      paddingHorizontal: 10,
      marginVertical: 32,
    },
    itemIcon: {
      width: 27,
      height: 27,
      borderRadius: 13.5,
      alignSelf: 'center',
      margin: 8,
      marginVertical: 4,
    },
    marginLeft: {
      marginLeft: 8,
    },
    column: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
    button: {
      width: 16,
      height: 16,
      marginRight: 4,
      borderRadius: 2,
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
      marginLeft: 36,
      backgroundColor: theme.grayButtonColor,
    },
    alignLeft: {
      marginLeft: 36,
      backgroundColor: '#FF9521',
    },
    supplyText: {
      color: '#FF9521',
      fontSize: 10,
      fontFamily: theme.font,
    },
    totalText: {
      color: theme.secondaryTextColor,
      fontSize: 10,
      fontFamily: theme.font,
    },
    tokenName: {
      fontSize: 14,
      color: theme.textColor,
      textAlign: 'left',
      fontFamily: theme.fontMedium,
    },
    none: {
      display: 'none',
    },
    inflationaryRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 8,
    },
  });
  return styles;
};

export default useCirculatingSupplyStyles;
