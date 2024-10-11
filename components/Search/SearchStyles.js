import {StyleSheet} from 'react-native';
import {useContext} from 'react';
import {AppThemeContext} from '../../context/themeContext';

const useSearchStyles = () => {
  const {theme, isDarkMode} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    flex: {
      flex: 1,
    },
    container: {
      width: '95%',
      height: 800,
      marginTop: 8,
      paddingHorizontal: 10,
      borderRadius: 2,
      backgroundColor: theme.boxesBackgroundColor,
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
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 3,
      fontFamily: theme.font,
      fontSize: theme.responsiveFontSize * 0.925,
      color: theme.searchPlaceHolderColor,
    },
    textInputContainer: {
      flexDirection: 'row',
      position: 'relative',
      height: 60,
    },
    textInputContainerIOS: {
      flexDirection: 'row',
      position: 'relative',
      marginHorizontal: 14,
      height: 60,
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
      tintColor: theme.searchPlaceHolderColor,
    },
    analysisItem: {
      position: 'relative',
      width: '100%',
      flexDirection: 'row',
      backgroundColor: theme.boxesBackgroundColor,
      alignSelf: 'center',
      borderRadius: 2,
    },
    analysisTitle: {
      maxWidth: '85%',
      marginLeft: 14,
      marginBottom: 2,
      paddingVertical: 16,
      color: theme.titleColor,
      fontSize: theme.responsiveFontSize * 0.95,
      fontFamily: theme.fontMedium,
    },
    searchSubTitle: {
      marginVertical: theme.boxesVerticalMargin,
      marginHorizontal: 8,
      fontFamily: theme.fontMedium,
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.orange,
      textAlign: 'left',
      textDecorationLine: 'underline',
      textDecorationColor: theme.orange,
    },
    inactiveSubtitle: {
      color: theme.secondaryGrayColor,
      textDecorationLine: 'none',
    },
    row: {
      flexDirection: 'row',
    },
    analysisRow: {
      flexDirection: 'row',
    },
    imageStyle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginLeft: 6,
      alignSelf: 'center',
    },
    cryptoItem: {
      width: '100%',
      flexDirection: 'row',
      paddingVertical: 6,
      backgroundColor: theme.boxesBackgroundColor,
      alignSelf: 'center',
      borderRadius: 2,
    },
    cryptoItemImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginLeft: 6,
      marginRight: 14,
      alignSelf: 'center',
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
      right: 0,
      top: '45%',
      width: 14,
      height: 14,
      justifyContent: 'center',
      alignItems: 'center',
      tintColor: theme.secondaryGrayColor,
    },
    horizontalLine: {
      flex: 1,
      minWidth: '40%',
      marginHorizontal: 4,
      borderBottomColor: theme.secondaryGrayColor,
      borderBottomWidth: 1,
      alignSelf: 'center',
    },
    cryptoSearch: {
      width: '100%',
      padding: 4,
      marginTop: theme.boxesVerticalMargin,
      backgroundColor: theme.boxesBackgroundColor,
    },
    searchContainer: {
      backgroundColor: theme.boxesBackgroundColor,
      marginVertical: 8,
      borderRadius: 2,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
      marginBottom: 4,
      paddingHorizontal: 4,
    },
    cryptoAcronym: {
      marginHorizontal: 4,
      color: theme.secondaryTextColor,
      fontSize: theme.responsiveFontSize * 0.7,
      textTransform: 'uppercase',
      alignSelf: 'center',
      fontFamily: theme.fontRegular,
    },
    searchSection: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: 800,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDarkMode ? '#171717' : '#D4D4D4'
    },
  });
  return styles;
};

export default useSearchStyles;
