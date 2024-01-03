import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useTvChartStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      flex: 1,
      marginVertical: 20,
      marginHorizontal: 15,
    },
    alphaLogo: {
      position: 'absolute',
      bottom: '30%',
      left: '20%',
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.boxesBackgroundColor,
      borderWidth: 1,
      borderRadius: 25,
      borderColor: theme.boxesBorderColor,
      zIndex: 300,
    },
    logoImage: {
      flex: 1,
    },
  });
  return styles;
};

export default useTvChartStyles;
