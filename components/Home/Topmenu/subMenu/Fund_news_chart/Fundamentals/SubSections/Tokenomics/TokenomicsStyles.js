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
      backgroundColor: theme.secondaryTextColor,
      borderRadius: 2,
      overflow: 'hidden',
      marginVertical: 8,
      justifyContent: 'center',
      borderWidth: 2,
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
      top: 0,
      marginVertical: 8,
      textAlign: 'right',
      color: theme.secondaryTextColor,
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.fontMedium,
    },
    infinityBar: {},
    infinityLabel: {
      fontSize: theme.responsiveFontSize * 1.2,
    },
    infinityButton: {
      position: 'absolute',
      right: 0,
      top: 0,
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
    },
    tokenRow: {
      flexDirection: 'row',
    },
    numberTitles: {
      flex: 1,
      marginVertical: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemIcon: {
      width: 27,
      height: 27,
      borderRadius: 13.5,
      alignSelf: 'center',
      margin: 8,
      marginVertical: 4,
    },
    column: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
    button: {
      width: 16,
      height: 16,
      marginRight: 6,
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
      backgroundColor: theme.orangeButton,
    },
    supplyText: {
      color: theme.orangeTextColor,
      fontSize: 10,
      fontFamily: theme.font,
    },
    totalText: {
      color: theme.secondaryTextColor,
      fontSize: 10,
      fontFamily: theme.font,
    },
    tokenName: {
      fontSize: theme.responsiveFontSize,
      color: theme.textColor,
      textAlign: 'left',
      fontFamily: theme.fontMedium,
    },
    text: {
      marginLeft: 4,
      color: theme.textColor,
      fontSize: 10,
      fontFamily: theme.font,
    },
    row: {
      position: 'relative',
      marginBottom: 15,
      flexDirection: 'row',
    },
    inflationaryArrow: {
      width: 18,
      height: 15,
      marginLeft: 24,
    },
    none: {
      display: 'none',
    },
  });
  return styles;
};

export default useTokenomicsStyles;
