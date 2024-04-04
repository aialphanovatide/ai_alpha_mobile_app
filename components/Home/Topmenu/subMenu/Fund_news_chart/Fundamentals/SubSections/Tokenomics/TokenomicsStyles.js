import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const useTokenomicsStyles = () => {
  const {theme} = useContext(AppThemeContext);

  const styles = StyleSheet.create({
    progressBarContainer: {
      height: 15,
      width: '96%',
      alignSelf: 'flex-end',
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 2,
      overflow: 'hidden',
      marginVertical: 8,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.secondaryTextColor,
    },
    progressBarWrapper: {
      flex: 1,
    },
    progressBar: {
      height: '100%',
      backgroundColor: theme.orange,
    },
    progressBarValue: {
      position: 'absolute',
      top: 0,
      textAlign: 'left',
      color: theme.orange,
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.fontMedium,
    },
    progressBarMaxValue: {
      position: 'absolute',
      right: 0,
      top: 24,
      marginVertical: 8,
      textAlign: 'right',
      color: theme.secondaryTextColor,
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.fontMedium,
    },
    infinityBar: {
      borderLeftWidth: 0,
      borderRightWidth: 0,
    },
    infinityLabel: {
      fontSize: theme.responsiveFontSize * 1.2,
    },
    infinityButton: {
      position: 'absolute',
      right: 0,
      top: 4,
      zIndex: 2,
    },
    // Tokenomics styles
    container: {
      width: '100%',
      paddingVertical: 10,
    },
    tokenItemsContainer: {
      flex: 1,
      marginVertical: theme.boxesVerticalMargin,
    },
    tokenItem: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginVertical: theme.boxesVerticalMargin,
      backgroundColor: theme.boxesBackgroundColor,
      // borderTopColor: theme.secondaryGrayColor,
      // borderTopWidth: 1,
    },
    tokenRow: {
      flexDirection: 'row',
    },
    numberTitles: {
      flex: 1,
      position: 'relative',
      marginVertical: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    itemIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignSelf: 'center',
      margin: 8,
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
      borderWidth: 2,
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
    text: {
      marginLeft: 8,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.fontMedium,
    },
    row: {
      position: 'relative',
      marginBottom: 15,
      flexDirection: 'row',
    },
    inflationaryArrow: {
      width: theme.responsiveFontSize * 0.875,
      height: theme.responsiveFontSize * 0.875,
      tintColor: theme.textColor,
    },
    none: {
      display: 'none',
    },
  });
  return styles;
};

export default useTokenomicsStyles;
