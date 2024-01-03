import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const useTokenomicsStyles = () => {
  const {theme} = useContext(AppThemeContext);

  const styles = StyleSheet.create({
    progressBarContainer: {
      height: 25,
      width: '80%',
      backgroundColor: theme.secondaryBoxesBgColor,
      borderRadius: 5,
      overflow: 'hidden',
      marginVertical: 10,
      justifyContent: 'center',
    },
    progressBar: {
      height: '100%',
      backgroundColor: theme.orange,
    },
    progressBarValue: {
      position: 'absolute',
      textAlign: 'center',
      width: '100%',
      lineHeight: 30,
      color: theme.textColor,
      fontWeight: 'bold',
    },
    // Tokenomics styles
    tokenItemsContainer: {
      backgroundColor: theme.boxesBackgroundColor,
    },
    tokenItem: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginVertical: 5,
      borderRadius: 5,
    },
    tokenRow: {
      marginVertical: 2.5,
      flexDirection: 'row',
    },
    numberTitles: {
      flex: 1,
      position: 'relative',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    alignRight: {
      right: 5,
    },
    alignLeft: {
      left: 70,
      color: theme.orange,
    },
    tokenName: {
      width: '20%',
      paddingVertical: theme.responsiveFontSize * 0.8,
      fontSize: theme.responsiveFontSize,
      fontWeight: 'bold',
      color: theme.textColor,
      textAlign: 'center',
      verticalAlign: 'middle',
    },
    text: {
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.925,
    },
  });
  return styles;
};

export default useTokenomicsStyles;
