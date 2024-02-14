import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const useChartStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    chartContainer: {
      flex: 1,
      marginHorizontal: 10,
      minHeight: 475,
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 4,
    },
  });
  return styles;
};

export default useChartStyles;
