import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useNewTopStoriesStyles = () => {
  const {isDarkMode, theme} = useContext(AppThemeContext);
  return StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: 16,
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
    filterContainer: {
      flexDirection: 'row',
      backgroundColor: isDarkMode ? '#18181B' : '#F4F4F5',
    },
    filterButton: {
      margin: 4,
      paddingVertical: 4,
      paddingHorizontal: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    filterText: {
      fontSize: 12,
      color: isDarkMode ? '#A1A1AA' : '#71717A',
      fontFamily: theme.fontFigtree,
    },
    activeFilterButton: {
      backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
      borderRadius: 4,
    },
    activeFilterFont: {
      fontFamily: theme.fontFigtreeSemibold,
    },
    listContainer: {
      paddingBottom: 20,
    },
    headerContainer: {
      width: '100%',
      height: theme.width * 0.6,
      padding: 10,
      paddingTop: 0,
      marginBottom: 32,
    },
    headerImage: {
      width: '100%',
      height: '68%',
      borderRadius: 6,
    },
    headerContent: {
      padding: 10,
    },
    headerTitle: {
      fontSize: 22,
      fontFamily: theme.fontFigtreeSemibold,
      color: isDarkMode ? '#FAFAFA' : '#09090B',
      marginBottom: 4,
    },
    newsItem: {
      flexDirection: 'row',
      padding: 10,
    },
    thumbnail: {
      width: 60,
      height: 60,
      borderRadius: 6,
      marginRight: 12,
    },
    newsContent: {
      flex: 1,
      justifyContent: 'center',
    },
    newsTitle: {
      fontSize: 14,
      fontFamily: theme.fontFigtreeSemibold,
      color: isDarkMode ? '#FAFAFA' : '#09090B',
      marginBottom: 4,
    },
    newsDate: {
      fontSize: 12,
      fontFamily: theme.fontFigtree,
      color: isDarkMode ? '#A1A1AA' : '#52525B',
    },
    horizontalLine: {
      width: '90%',
      marginHorizontal: 'auto',
      alignSelf: 'center',
      borderBottomWidth: 2,
      borderBottomColor: isDarkMode ? '#18181B' : '#F4F4F5',
    },
  });
};

export default useNewTopStoriesStyles;
