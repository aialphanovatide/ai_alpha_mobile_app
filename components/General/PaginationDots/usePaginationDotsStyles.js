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
      width: 6,
      height: 6,
      borderRadius: 3,
      marginHorizontal: 5,
      backgroundColor: isDarkMode ? '#52525B' : '#D4D4D8',

    },
    activeDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },
  });
  return styles;
};
