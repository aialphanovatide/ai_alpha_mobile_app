import {StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {AppThemeContext} from '../../../context/themeContext';

const useNarrativeTradingStyles = () => {
  const {theme} = useContext(AppThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: theme.width,
      paddingTop: 36,
      backgroundColor: 'transparent',
    },
    menusContainer: {
      paddingHorizontal: 14,
      marginBottom: 12,
    },
    flex: {
      flex: 1,
    },
    titleContainer: {
      paddingHorizontal: 26,
      marginTop: theme.titlesVerticalMargin,
      marginVertical: theme.boxesVerticalMargin,
    },
    title: {
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
      fontFamily: theme.fontSemibold,
      textAlign: 'left',
    },
    marginBottom: {
      marginBottom: '10%',
    },
    buttonContainer: {
      flexDirection: 'row',
      marginVertical: theme.boxesVerticalMargin,
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 2,
      alignSelf: 'center',
    },
    button: {
      padding: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeButton: {
      backgroundColor: theme.activeWhite,
      borderColor: theme.subMenuBgColor,
      borderWidth: 2,
      borderRadius: 4,
    },
    activeText: {
      color: theme.subMenuTextColor,
      fontSize: theme.responsiveFontSize * 0.875,
      textTransform: 'capitalize',
      fontFamily: theme.fontMedium,
    },
    inactiveText: {
      color: theme.subMenuTextColor,
      fontSize: theme.responsiveFontSize * 0.875,
      textTransform: 'capitalize',
      fontFamily: theme.font,
    },
    itemsContainer: {
      width: '100%',
      marginVertical: theme.boxesVerticalMargin,
      paddingHorizontal: 14,
      backgroundColor: 'transparent',
    },
    narrativeItemContainer: {
      width: '100%',
      flexDirection: 'row',
      alignSelf: 'flex-start',
      backgroundColor: theme.boxesBackgroundColor,
      marginBottom: 6,
    },
    itemImage: {
      width: 70,
      height: 70,
      borderRadius: 35,
      marginLeft: 12,
      alignSelf: 'center',
    },
    dataContainer: {
      flex: 1,
      marginHorizontal: 8,
      marginVertical: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    topRow: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 14,
      paddingRight: 26,
      justifyContent: 'space-between',
    },
    dataRow: {
      flexDirection: 'row',
      marginVertical: 4,
    },
    dataText: {
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.font,
      color: theme.secondaryTextColor,
    },
    dataIcon: {
      width: 18,
      height: 18,
      tintColor: theme.secondaryTextColor,
      marginRight: 4,
    },
    row: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 8,
      marginVertical: theme.boxesVerticalMargin,
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    itemTitle: {
      width: '90%',
      fontSize: theme.responsiveFontSize,
      fontFamily: theme.fontMedium,
      color: theme.textColor,
      lineHeight: 22,
    },
    rightArrowContainer: {
      width: 20,
      height: 20,
      marginHorizontal: 8,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      overflow: 'hidden',
    },
    rightArrow: {
      flex: 1,
      tintColor: theme.secondaryTextColor,
    },
    emptyMessage: {
      margin: theme.boxesVerticalMargin,
      fontSize: theme.responsiveFontSize,
      color: theme.secondaryTextColor,
      alignSelf: 'center',
      fontFamily: theme.fontBoldItalic,
    },
    backButtonWrapper: {
      paddingHorizontal: 14,
    },
  });
  return styles;
};

export default useNarrativeTradingStyles;
