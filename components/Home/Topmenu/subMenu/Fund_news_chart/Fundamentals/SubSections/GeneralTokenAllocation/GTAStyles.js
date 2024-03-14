import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const useGTAStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      minHeight: 300,
      flexDirection: 'row',
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    row: {
      maxWidth: '50%',
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
      alignSelf: 'flex-end',
      fontFamily: theme.fontSemibold
    },
    circleDataContainer: {
      marginVertical: 24,
    },
    currentTokenPercentage: {
      position: 'absolute',
      top: 175,
      left:70,
      textAlign: 'center',
      fontSize: theme.titleFontSize * 1.35,
      fontFamily: theme.fontBold,
    },
    displayNone: {
      display: 'none',
    },
    circleChartContainer: {
      width: '50%',
      position: 'relative',
      marginHorizontal: 16,
    },
  });
  return styles;
};

export default useGTAStyles;
