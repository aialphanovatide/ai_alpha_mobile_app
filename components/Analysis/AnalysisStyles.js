import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../context/themeContext';
const useAnalysisStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: theme.mainBackgroundColor,
    },
    analysisContainer: {
      flex: 1,
      width: theme.width,
      height: theme.height,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemContainer: {
      position: 'relative',
      width: '90%',
      display: 'flex',
      flexDirection: 'row',
      marginVertical: 5,
      marginHorizontal: 15,
      padding: 15,
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
      fontWeight: 'bold',
      fontSize: theme.responsiveFontSize,
      color: theme.textColor,
    },
    rateValueContainer: {
      position: 'absolute',
      right: 15,
      flex: 1,
      flexDirection: 'row',
      alignSelf: 'center',
    },
    rightArrowContainer: {
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rightArrow: {
      flex: 1,
      tintColor: theme.secondaryTextColor,
    },
    analysisTitle: {
      marginHorizontal: 25,
      marginVertical: 15,
      fontSize: theme.responsiveFontSize * 1.5,
      fontWeight: 'bold',
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
  });
  return styles;
};

export default useAnalysisStyles;
