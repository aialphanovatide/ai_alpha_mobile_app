import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../context/themeContext';
const useDashboardStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    gradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    background: {
      flex: 1,
      height: 'auto',
    },
    paddingBottom: {
      paddingBottom: 32,
    },
    analysisContainer: {
      width: theme.width,
      padding: 10,
      justifyContent: 'center',
    },
    itemContainer: {
      position: 'relative',
      flexDirection: 'row',
      marginVertical: 4,
      padding: 16,
      backgroundColor: theme.boxesBackgroundColor,
      alignItems: 'center',
      borderRadius: 2,
    },
    analysisIconContainer: {
      width: 28,
      height: 25,
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
      marginBottom: 16,
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
      fontSize: 14,
      color: theme.secondaryTextColor,
      alignSelf: 'flex-start',
      fontFamily: theme.fontBoldItalic,
      textAlign: 'left',
      borderWidth: 1,
      borderColor: theme.boxesBorderColor,
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 5,
    },
  });
  return styles;
};

export default useDashboardStyles;
