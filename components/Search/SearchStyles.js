import {StyleSheet} from 'react-native';
import {useContext} from 'react';
import {AppThemeContext} from '../../context/themeContext';

const useSearchStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    flex: {
      flex: 1,
    },
    container: {
      flex: 1,
      width: theme.width,
      padding: 10,
    },
    title: {
      marginTop: 36,
      marginLeft: 24,
      fontSize: theme.titleFontSize,
      color: theme.titleColor,
      fontFamily: theme.fontSemibold,
      textAlign: 'left',
    },
    searchInput: {
      width: '100%',
      marginVertical: 8,
      paddingHorizontal: 12,
      paddingLeft: 48,
      backgroundColor: theme.secondaryBoxesBgColor,
      borderRadius: 3,
      fontFamily: theme.fontMedium,
      fontSize: theme.responsiveFontSize,
    },
    textInputContainer: {
      flexDirection: 'row',
      position: 'relative',
      marginHorizontal: 4,
    },
    none: {
      display: 'none',
    },
    magnifierIcon: {
      position: 'absolute',
      top: 20,
      left: 10,
      width: 24,
      height: 24,
      marginHorizontal: 4,
      zIndex: 1100,
      tintColor: theme.secondaryTextColor,
    },
    analysisItem: {
      position: 'relative',
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 8,
      backgroundColor: theme.boxesBackgroundColor,
      alignSelf: 'center',
      borderBottomColor: theme.boxesBorderColor,
      borderBottomWidth: 1,
      borderRadius: 2,
    },
    analysisTitle: {
      maxWidth: '80%',
      marginLeft: 14,
      paddingVertical: 16,
      color: theme.titleColor,
      fontSize: theme.responsiveFontSize * 0.95,
      marginBottom: 2,
      fontFamily: theme.fontSemibold,
    },
    searchSubTitle: {
      marginVertical: theme.boxesVerticalMargin,
      marginHorizontal: 16,
      fontFamily: theme.fontMedium,
      fontSize: theme.responsiveFontSize,
      color: theme.titleColor,
      textAlign: 'left',
    },
    row: {
      flexDirection: 'row',
    },
    analysisRow: {
      flexDirection: 'row',
    },
    imageStyle: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginLeft: 10,
      alignSelf: 'center',
    },
    cryptoItem: {
      width: '100%',
      flexDirection: 'row',
      backgroundColor: theme.boxesBackgroundColor,
      alignSelf: 'center',
      borderBottomColor: theme.boxesBorderColor,
      borderBottomWidth: 1,
      borderRadius: 2,
    },
    cryptoItemImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginHorizontal: 14,
      marginVertical: 8
    },
    cryptoName: {
      marginHorizontal: 8,
      fontSize: theme.responsiveFontSize * 0.95,
      fontFamily: theme.fontMedium,
      color: theme.titleColor,
      alignSelf: 'center',
    },
    rightArrowImage: {
      position: 'absolute',
      right: 16,
      top: '45%',
      width: 14,
      height: 14,
      justifyContent: 'center',
      alignItems: 'center',
      tintColor: theme.secondaryGrayColor,
    },
    horizontalLine: {
      width: '95%',
      marginVertical: 8,
      borderBottomColor: theme.secondaryItemColor,
      borderBottomWidth: 1,
      alignSelf: 'center',
    },
    cryptoSearch: {
      flex: 1,
      height: 'auto',
      padding: 4,
      marginTop: theme.boxesVerticalMargin,
    },
  });
  return styles;
};

export default useSearchStyles;
