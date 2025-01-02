import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useSpotlightStyles = () => {
  const {isDarkMode, theme} = useContext(AppThemeContext);
  return StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: 16,
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
    },
    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
    topBarText: {
      fontSize: 12,
      fontFamily: theme.fontFigtreeMedium,
      color: isDarkMode ? '#52525B' : '#D4D4D8',
    },
    listContainer: {
      paddingBottom: 20,
    },
    cardContainer: {
      width: '100%',
      height: theme.width * 0.6,
      padding: 10,
      paddingTop: 0,
      marginBottom: 32,
    },
    cardImage: {
      width: '100%',
      height: '65%',
      borderRadius: 6,
    },
    cardContent: {
      justifyContent: 'space-between',
      padding: 10,
    },
    cardTitle: {
      fontSize: 22,
      fontFamily: theme.fontFigtreeSemibold,
      color: isDarkMode ? '#FAFAFA' : '#09090B',
      marginBottom: 4,
    },
    thumbnail: {
      width: 60,
      height: 60,
      borderRadius: 6,
      marginRight: 12,
    },
    cardDate: {
      marginTop: 16,
      fontSize: 12,
      fontFamily: theme.fontFigtree,
      color: isDarkMode ? '#A1A1AA' : '#52525B',
    },
  });
};

export default useSpotlightStyles;
