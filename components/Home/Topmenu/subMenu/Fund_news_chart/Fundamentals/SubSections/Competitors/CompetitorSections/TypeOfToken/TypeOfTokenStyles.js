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
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.secondaryBoxesBgColor,
      borderRadius: 25,
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tokenButton: {
      width: '50%',
      margin: 5,
      backgroundColor: theme.secondaryBoxesBgColor,
    },
    tokenButtonText: {
      padding: 10,
      textAlign: 'center',
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.825,
    },
  });
  return styles;
};

export default useTypeOfTokenStyles;
