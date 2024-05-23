import {useContext} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const useTypeOfTokenStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    tokenContainer: {
      height: 110,
      margin: 10,
    },
    tokenImageContainer: {
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.secondaryBoxesBgColor,
      borderRadius: 16,
      overflow: 'hidden',
    },
    row: {
      flexDirection: 'row',
      marginVertical: 5,
      alignItems: 'center',
    },
    tokenImage: {
      width: 30,
      height: 30,
    },
    tokenName: {
      color: theme.textColor,
      marginHorizontal: 10,
      fontSize: theme.responsiveFontSize,
      fontFamily: theme.fontMedium,
    },
    buttonContainer: {
      width: '100%',
      flex: 1,
      paddingVertical: 4,
      flexDirection: 'row',
    },
    tokenButton: {
      width: 100,
      height: 36,
      paddingVertical: 4,
      marginHorizontal: 4,
      backgroundColor: theme.activeWhite,
      borderRadius: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tokenButtonText: {
      margin: 6,
      textAlign: 'center',
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.825,
      fontFamily: theme.fontMedium,
    },
  });
  return styles;
};

export default useTypeOfTokenStyles;
