import {useContext} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const useChartStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    chartContainer: {
      flex: 1,
      backgroundColor: theme.boxesBackgroundColor,
    },
  });
  return styles;
};

export default useChartStyles;
