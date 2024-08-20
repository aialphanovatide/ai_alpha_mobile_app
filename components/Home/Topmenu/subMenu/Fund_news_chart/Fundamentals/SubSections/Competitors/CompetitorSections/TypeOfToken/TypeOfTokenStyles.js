import {useContext} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const useTypeOfTokenStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    tokenContainer: {
      flexDirection: 'row',
      marginVertical: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: theme.mainBackgroundColor,
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
    table: {
      position: 'relative',
      width: '100%',
      height: 500,
      paddingHorizontal: 16,
      alignSelf: 'flex-start',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    row: {
      flexDirection: 'row',
      marginVertical: 5,
      alignItems: 'center',
    },
    column: {
      marginVertical: 4,
      justifyContent: 'center',
    },
    tokenImage: {
      width: 25,
      height: 25,
      marginVertical: 3,
      alignSelf: 'flex-start',
    },
    tokenName: {
      width: '100%',
      color: theme.textColor,
      fontSize: 12,
      fontFamily: theme.fontMedium,
    },
    typesHeader: {
      position: 'absolute',
      top: 0,
      right: 32,
      left: 0,
      height: '100%',
      flexDirection: 'row',
      marginVertical: 8,
    },
    header: {
      width: '25%',
      height: '100%',
      marginHorizontal: 3,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderRadius: 3,
      borderWidth: 1,
      borderColor: theme.secondaryGrayColor,
    },
    typeImage: {
      width: 38,
      height: 38,
      tintColor: theme.textColor,
    },
    headerName: {
      fontFamily: theme.font,
      color: theme.textColor,
      fontSize: 12,
      marginTop: 6,
    },
    colorSquare: {
      width: 75,
      height: 50,
      marginLeft: 16,
    },
  });
  return styles;
};

export default useTypeOfTokenStyles;
