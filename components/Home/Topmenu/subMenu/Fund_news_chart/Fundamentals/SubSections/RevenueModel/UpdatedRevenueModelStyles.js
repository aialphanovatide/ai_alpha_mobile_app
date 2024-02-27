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
      width: '100%',
      marginVertical: 8,
      flexDirection: 'row',
      padding: 8,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: theme.titleColor,
      borderBottomWidth: 1,

    },
    revenueImage: {
      height: 44,
      tintColor: theme.orange,
      marginVertical: theme.boxesVerticalMargin,
    },
    textContainer: {
      flex: 1,
      marginHorizontal: 5,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    revenueTitle: {
      fontSize: theme.titleFontSize * 0.8,
      color: theme.titleColor,
      textAlign: 'left',
      fontWeight: 'bold',
    },
    revenueSubtitle: {
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.titleColor,
      lineHeight: 22,
      textAlign: 'left',
      fontStyle: 'italic',
    },
    revenueValue: {
      marginHorizontal: 10,
      fontSize: theme.titleFontSize * 0.85,
      color: theme.orangeTextColor,
      fontWeight: 'bold',
      lineHeight: 22,
      textAlign: 'center',
    },
  });
  return styles;
};

export default useUpdatedRevenueModelStyles;
