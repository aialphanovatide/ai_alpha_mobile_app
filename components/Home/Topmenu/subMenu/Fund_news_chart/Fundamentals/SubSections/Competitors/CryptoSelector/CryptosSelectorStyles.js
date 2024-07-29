import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../context/themeContext';

const useCryptoSelectorStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    selectorContainer: {
      marginVertical: 20,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    selectorItem: {
      width: 70,
      maxHeight: 50,
      marginHorizontal: 5,
      padding: 2.5,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 3,
    },
    itemText: {
      color: theme.cryptoSelectorText,
      fontSize: theme.responsiveFontSize * 0.75,
      fontFamily: theme.font,
      textAlign: 'center',
    },
    activeText: {
      color: theme.activeCryptoSelector,
      fontFamily: theme.fontMedium,
    },
  });
  return styles;
};

export default useCryptoSelectorStyles;
