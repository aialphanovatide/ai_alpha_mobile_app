import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const useRevenueStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    chartContainer: {
      flex: 1,
      backgroundColor: theme.secondaryBoxesBgColor,
      alignSelf: 'flex-start'
    },
    selectorContainer: {
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'flex-start',
    },
    selectorItem: {
      width: theme.width * 0.2,
      marginHorizontal: 5,
      padding: 2.5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    itemText: {
      color: theme.subMenuTextColor,
      fontSize: theme.responsiveFontSize * 0.7,
      fontWeight: 'bold',
    },
  });
  return styles;
};

export default useRevenueStyles;
