import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const useGTAStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: theme.boxesBackgroundColor,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
    },
    tokenSelector: {
      width: 20,
      height: 20,
      margin: 5,
      borderRadius: 5,
      overflow: 'hidden',
    },
    strong: {
      fontWeight: 'bold',
    },
    circleDataContainer: {
      padding: 10,
      marginVertical: 20,
    },
    currentTokenPercentage: {
      padding: 10,
      textAlign: 'center',
      fontSize: theme.titleFontSize,
      fontWeight: 'bold',
    },
    displayNone: {
      display: 'none',
    },
  });
  return styles;
};

export default useGTAStyles;
