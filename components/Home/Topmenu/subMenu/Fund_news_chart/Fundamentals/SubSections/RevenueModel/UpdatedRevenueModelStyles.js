import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const useUpdatedRevenueModelStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: theme.boxesVerticalMargin * 1.2,
      paddingHorizontal: 10,
      backgroundColor: theme.boxesBackgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemContainer: {
      flex: 1,
      position: 'relative',
      width: '100%',
      marginVertical: 8,
      flexDirection: 'row',
      paddingVertical: 8,
      alignItems: 'center',
      borderBottomColor: theme.titleColor,
      borderBottomWidth: 1,

    },
    revenueImage: {
      height: 44,
      tintColor: theme.orange,
      marginVertical: theme.boxesVerticalMargin,
      marginLeft: -16,
    },
    textContainer: {
      flex: 1,
      alignItems: 'flex-start',
    },
    revenueTitle: {
      fontSize: theme.titleFontSize * 0.9,
      color: theme.titleColor,
      textAlign: 'left',
      fontFamily: theme.fontMedium,
    },
    revenueSubtitle: {
      fontSize: 12,
      color: theme.secondaryTextColor,
      textAlign: 'left',
      fontFamily: theme.fontItalic,
    },
    revenueValue: {
      marginHorizontal: 10,
      fontSize: theme.titleFontSize * 0.85,
      color: theme.orange,
      lineHeight: 22,
      textAlign: 'center',
      fontFamily: theme.fontMedium,
    },
  });
  return styles;
};

export default useUpdatedRevenueModelStyles;
