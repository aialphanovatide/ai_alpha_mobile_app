import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const useTransactionSpeedStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      alignItems: 'center',
    },
    activeCryptoValue: {
      marginVertical: 24,
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
