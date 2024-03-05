import {StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const useTokenUtilityStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      alignSelf: 'center',
    },
    dataContainer: {
      width: '100%',
      flex: 1,
      marginVertical: theme.boxesVerticalMargin,
      justifyContent: 'flex-start',
    },
    dataTitle: {
      marginVertical: 4,
      marginHorizontal: 8,
      color: theme.titleColor,
      fontSize: theme.responsiveFontSize * 0.95,
      fontWeight: 'bold',
      padding: 5,
    },
    dataRow: {
      width: '100%',
      flexDirection: 'row',
      backgroundColor: theme.fundamentalsCompetitorsItemBg,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.secondaryGrayColor,
    },
    dataImage: {
      alignSelf: 'flex-start',
    },
    dataText: {
      marginVertical: theme.boxesVerticalMargin,
      marginHorizontal: 8,
      padding: 4,
      flex: 1,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.8,
      textAlign: 'left',
    },
  });
  return styles;
};

export default useTokenUtilityStyles;
