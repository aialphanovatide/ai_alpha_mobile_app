import {useContext} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const useTypeOfTokenStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    tokenContainer: {
      flex: 1,
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
      flex: 1,
    },
    tokenName: {
      color: theme.textColor,
      marginHorizontal: 10,
      fontSize: theme.responsiveFontSize * 0.9,
      fontWeight: 'bold',
    },
    buttonContainer: {
      width: '100%',
      flex: 1,
      paddingVertical: 4,
      flexDirection: 'row',
    },
    tokenButton: {
      width: 90,
      padding: 4,
      marginHorizontal: 4,
      backgroundColor: theme.activeWhite,
      borderRadius: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tokenButtonText: {
      padding: 6,
      textAlign: 'center',
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.825,
    },
  });
  return styles;
};

export default useTypeOfTokenStyles;
