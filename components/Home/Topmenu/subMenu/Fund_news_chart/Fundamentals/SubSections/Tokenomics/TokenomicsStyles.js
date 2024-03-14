import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const useTokenomicsStyles = () => {
  const {theme} = useContext(AppThemeContext);

  const styles = StyleSheet.create({
    progressBarContainer: {
      height: 15,
      width: '100%',
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
      left: 0,
      top: 0,
      textAlign: 'left',
      color: theme.orange,
      fontSize: theme.responsiveFontSize * 0.8,
    },
    progressBarMaxValue: {
      position: 'absolute',
      right: 0,
      top: 0,
      textAlign: 'right',
      color: theme.inactiveColor,
      fontSize: theme.responsiveFontSize * 0.8,
    },
    infinityBar: {
      borderLeftWidth: 0,
      borderRightWidth: 0,
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
      marginVertical: theme.boxesVerticalMargin * 0.6,
      backgroundColor: theme.boxesBackgroundColor,
    },
    tokenRow: {
      flexDirection: 'row',
    },
    numberTitles: {
      flex: 1,
      position: 'relative',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    alignRight: {
      right: 10,
      color: theme.inactiveColor,
      fontSize: theme.responsiveFontSize * 0.8,
    },
    alignLeft: {
      left: 70,
      color: theme.orange,
      fontSize: theme.responsiveFontSize * 0.8,
      fontWeight: 'bold',
    },
    tokenName: {
      width: '20%',
      paddingVertical: 8,
      fontSize: theme.responsiveFontSize,
      fontWeight: 'bold',
      color: theme.textColor,
      textAlign: 'center',
      alignSelf: 'flex-end',
    },
    text: {
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.8,
      marginLeft: 8,
    },
    row: {
      position: 'relative',
      marginBottom: 15,
      flexDirection: 'row',
    },
  });
  return styles;
};

export default useTokenomicsStyles;
