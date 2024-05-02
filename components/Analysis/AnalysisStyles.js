import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../context/themeContext';
const useAnalysisStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      height: 'auto',
    },
    paddingBottom: {
      paddingBottom: 32,
    },
    analysisContainer: {
      flex: 1,
      width: theme.width,
      height: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemContainer: {
      position: 'relative',
      width: '90%',
      display: 'flex',
      flexDirection: 'row',
      marginVertical: 6,
      marginHorizontal: 16,
      padding: 16,
      backgroundColor: theme.boxesBackgroundColor,
    },
    analysisIconContainer: {
      width: 30,
      height: 30,
      marginHorizontal: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    analysisIcon: {
      flex: 1,
      tintColor: theme.textColor,
    },
    itemText: {
      width: '60%',
      paddingHorizontal: 10,
      fontFamily: theme.fontMedium,
      fontSize: theme.responsiveFontSize,
      color: theme.textColor,
      alignSelf: 'center',
    },
    rateValueContainer: {
      position: 'absolute',
      right: 15,
      flex: 1,
      flexDirection: 'row',
      alignSelf: 'center',
    },
    rightArrowContainer: {
      width: 12,
      height: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rightArrow: {
      flex: 1,
      tintColor: theme.secondaryGrayColor,
    },
    analysisTitle: {
      marginHorizontal: 24,
      marginTop: 64,
      marginBottom: 32,
      fontSize: theme.responsiveFontSize * 1.5,
      fontFamily: theme.fontSemibold,
      color: theme.titleColor,
    },
    emphasizedItem: {
      width: '90%',
      display: 'flex',
      flexDirection: 'row',
      marginVertical: 5,
      marginHorizontal: 15,
      paddingHorizontal: 10,
      paddingVertical: 25,
      backgroundColor: theme.boxesBackgroundColor,
    },
    messageText: {
      padding: 20,
      borderWidth: 1,
      borderColor: theme.boxesBorderColor,
      backgroundColor: theme.boxesBackgroundColor,
      textAlign: 'center',
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
      fontFamily: theme.fontMedium,
      alignSelf: 'center',
      borderRadius: 5,
    },
  });
  return styles;
};

export default useAnalysisStyles;
