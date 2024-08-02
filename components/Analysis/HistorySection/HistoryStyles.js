import {StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {AppThemeContext} from '../../../context/themeContext';

const useHistoryStyles = () => {
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
    },
    flex: {
      flex: 1,
    },
    title: {
      marginHorizontal: 28,
      marginTop: theme.titlesVerticalMargin,
      marginVertical: 16,
      color: theme.titleColor,
      fontSize: 25,
      fontFamily: theme.fontMedium,
      textAlign: 'left',
    },
    marginBottom: {
      marginBottom: '10%',
    },
    buttonContainer: {
      flexDirection: 'row',
      marginVertical: 8,
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 3,
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
      paddingHorizontal: 14,
      backgroundColor: 'transparent',
    },
    historyItemContainer: {
      width: '100%',
      flexDirection: 'row',
      alignSelf: 'flex-start',
      backgroundColor: theme.boxesBackgroundColor,
      marginBottom: 6,
    },
    itemImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginLeft: 10,
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
      paddingHorizontal: 8,
      paddingRight: 16,
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
      width: 15,
      height: 15,
      tintColor: theme.secondaryTextColor,
      marginRight: 4,
    },
    iconSpacing: {
      alignSelf: 'center',
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
      width: '85%',
      height: 48,
      fontSize: theme.responsiveFontSize,
      fontFamily: theme.fontMedium,
      color: theme.textColor,
      lineHeight: 22,
    },
    rightArrowContainer: {
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      overflow: 'hidden',
    },
    rightArrow: {
      flex: 1,
      tintColor: theme.secondaryGrayColor,
    },
    emptyMessage: {
      margin: theme.boxesVerticalMargin,
      fontSize: 14,
      color: theme.secondaryTextColor,
      alignSelf: 'flex-start',
      fontFamily: theme.fontBoldItalic,
      textAlign: 'left',
    },
    backButtonWrapper: {
      marginHorizontal: 20,
    },
    sectionDescription: {
      width: '90%',
      marginHorizontal: 28,
      marginBottom: 8,
      fontSize: 14,
      fontFamily: theme.font,
      color: theme.textColor,
      textAlign: 'left',
      lineHeight: 20,
    },
  });
  return styles;
};

export default useHistoryStyles;
