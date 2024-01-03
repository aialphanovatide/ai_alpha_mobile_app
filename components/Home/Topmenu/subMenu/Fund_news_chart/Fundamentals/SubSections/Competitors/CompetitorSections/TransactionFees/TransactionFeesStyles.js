import {useContext} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const useTransactionFeeStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    imageContainer: {
      position: 'relative',
      width: theme.width * 0.6,
      height: 80,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.graphSecondaryColor
    },
    dollarImage: {
      flex: 1,
    },
    graphsContainer: {
      marginVertical: 10,
      padding: 10,
      backgroundColor: theme.secondaryBoxesBgColor,
      alignItems: 'center',
    },
    activeOptionContainer: {
      width: '50%',
      marginVertical: 15,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderWidth: 2,
      borderColor: theme.textColor,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    activeOptionValue: {
      color: theme.textColor,
      fontWeight: 'bold',
      fontSize: theme.responsiveFontSize * 0.9,
      textAlign: 'center',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: -5,
      right: 0,
      bottom: 0,
      width: '104%',
      opacity: 0.5,
    },
  });
  return styles;
};

export default useTransactionFeeStyles;
