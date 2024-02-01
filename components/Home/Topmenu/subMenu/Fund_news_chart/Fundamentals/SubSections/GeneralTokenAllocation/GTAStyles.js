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
      alignSelf: 'center',
    },
    circleDataContainer: {
      padding: 10,
      marginVertical: 20,
    },
    currentTokenPercentage: {
      position: 'absolute',
      top: '35%',
      left: '40%',
      textAlign: 'center',
      fontSize: theme.titleFontSize * 1.35,
      fontWeight: 'bold',
    },
    displayNone: {
      display: 'none',
    },
    flex: {
      position: 'relative',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
    },
  });
  return styles;
};

export default useGTAStyles;
