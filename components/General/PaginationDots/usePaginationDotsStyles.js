import {useContext} from 'react';
import {AppThemeContext} from '../../../context/themeContext';
import {StyleSheet} from 'react-native';

export const usePaginationDotsStyles = () => {
  const {isDarkMode} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    dotsContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: isDarkMode ? '#52525B' : '#D4D4D8',
    },
    activeDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: -4,
      backgroundColor: isDarkMode ? '#52525B' : '#D4D4D8',
    },
  });
  return styles;
};
