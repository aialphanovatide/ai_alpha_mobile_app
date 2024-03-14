import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const useTransactionSpeedStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeCryptoValue: {
      marginVertical: 15,
      paddingVertical: 5,
      paddingHorizontal: 10,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize,
      fontFamily: theme.fontMedium,
      borderWidth: 2,
      borderColor: theme.secondaryGrayColor,
    },
  });
  return styles;
};

export default useTransactionSpeedStyles;
