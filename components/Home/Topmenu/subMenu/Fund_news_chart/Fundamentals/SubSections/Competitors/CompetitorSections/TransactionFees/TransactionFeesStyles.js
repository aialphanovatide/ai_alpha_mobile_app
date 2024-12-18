import {useContext} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const useTransactionFeeStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    imageContainer: {
      position: 'relative',
      height: 105,
      width: 240,
      margin: theme.boxesVerticalMargin,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dollarImage: {
      flex: 1,
    },
    graphsContainer: {
      marginVertical: 10,
      padding: 10,
      backgroundColor: theme.boxesBackgroundColor,
      alignItems: 'center',
    },
    activeOptionContainer: {
      minWidth: 70,
      marginVertical: 8,
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderWidth: 1,
      borderRadius: 1,
      borderColor: theme.secondaryGrayColor,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    activeOptionValue: {
      color: theme.textColor,
      fontSize: 14,
      fontFamily: theme.font,
      textAlign: 'center',
    },
    overlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      height: '100%',
      opacity: 0.5,
    },
  });
  return styles;
};

export default useTransactionFeeStyles;
