import React, {useContext} from 'react';
import {AppThemeContext} from '../../../../context/themeContext';
import {StyleSheet} from 'react-native';

const useNewDailyDeepDivesStyles = () => {
  const {theme, isDarkMode} = useContext(AppThemeContext);

  const styles = StyleSheet.create({
    deepDivesSection: {
      flex: 1,
      padding: 10,
      marginVertical: 16,
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
    },
    row: {
      flexDirection: 'row',
    },
    topBarTitle: {
      marginHorizontal: 8,
      fontSize: 12,
      fontFamily: theme.fontFigtreeMedium,
      color: isDarkMode ? '#52525B' : '#D4D4D8',
      textTransform: 'uppercase',
    },
    seeAllText: {
      fontSize: 12,
      color: isDarkMode ? '#71717A' : '#A1A1AA',
      fontFamily: theme.fontFigtreeMedium,
    },
    deepDivesContainer: {
      flexDirection: 'row',
      marginVertical: 8,
    },
    deepDiveCard: {
      width: 220,
      height: 270,
      padding: 10,
      margin: 8,
      justifyContent: 'flex-start',
      backgroundColor: isDarkMode ? '#05050B' : '#F4F4F5',
      borderRadius: 6,
    },
    cardImage: {
      width: '100%',
      height: 135,
      borderRadius: 3,
    },
    cardTitle: {
      color: isDarkMode ? '#FAFAFA' : '#09090B',
      fontSize: 18,
      fontFamily: theme.fontFigtreeSemibold,
      marginTop: 10,
      textTransform: 'capitalize',
    },
    cardContent: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    date: {
      fontFamily: theme.fontFigtree,
      fontSize: 12,
      color: isDarkMode ? '#A1A1AA' : '#52525B',
      textAlign: 'left',
    },
    flex: {
      flex: 1,
    },
  });
  return styles;
};

export default useNewDailyDeepDivesStyles;
