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
      backgroundColor: theme.secondaryTextColor,
      borderColor: theme.secondaryTextColor,
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
      marginHorizontal: 12,
      paddingHorizontal: 4,
      paddingVertical: 2,
      fontSize: theme.responsiveFontSize * 0.7,
      lineHeight: 20,
      borderRadius: 4,
      color: theme.whiteTextColor,
    },
    symbolLabel: {
      color: theme.inactiveTextColor,
      fontSize: theme.responsiveFontSize * 0.725,
      borderColor: theme.inactiveTextColor,
      borderWidth: 1,
    },
    noMargin: {
      marginHorizontal: 0,
    },
    noPaddingH: {
      paddingHorizontal: 0,
    },
    labelRight: {
      marginHorizontal: 0,
      backgroundColor: theme.grayLabelColor,
    },
    labelLeft: {
      backgroundColor: theme.orangeLabelColor,
    },
    symbolWrapper: {
      padding: 6,
      paddingBottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    referenceIconImage: {
      width: 14,
      height: 14,
      tintColor: theme.inactiveTextColor,
    },
    valueLabel: {
      fontSize: theme.responsiveFontSize * 0.75,
      color: theme.inactiveGrayText,
    },
    labelBottom: {
      marginLeft: '45%',
      marginTop: 2,
      flex: 1,
      fontSize: theme.responsiveFontSize * 0.925,
      color: theme.orange,
      fontWeight: 'bold',
    },
    text: {
      color: theme.textColor,
    },
    orange: {
      color: theme.orange,
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
      backgroundColor: theme.secondaryBoxesBgColor,
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
      fontSize: theme.responsiveFontSize * 0.9,
      fontWeight: 'bold',
    },
    image: {
      flex: 1,
    },
    dataContainer: {
      flex: 1,
      padding: 10,
      backgroundColor: theme.boxesBackgroundColor,
    },
    inflationaryArrow: {
      width: 14,
      height: 14,
      tintColor: theme.textColor,
    },
    inflationaryLabel: {
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.textColor,
    },
    noVerticalMargin: {
      marginVertical: 0,
    },
    circulatingSupplyItem: {
      flex: 1,
      marginVertical: theme.boxesVerticalMargin,
      backgroundColor: theme.fundamentalsCompetitorsItemBg,
    },
  });
  return styles;
};

export default useCirculatingSupplyStyles;
