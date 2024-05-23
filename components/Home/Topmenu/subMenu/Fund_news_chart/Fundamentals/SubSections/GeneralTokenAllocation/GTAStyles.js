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
      maxHeight: 425,
      flexDirection: 'row',
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    row: {
      maxWidth: '80%',
      marginVertical: 3,
      flexDirection: 'row',
    },
    tokenSelector: {
      width: 20,
      height: 20,
      margin: 5,
      borderRadius: 5,
      alignSelf: 'center',
      overflow: 'hidden',
    },
    strong: {
      marginTop: 10,
      alignSelf: 'center',
      fontFamily: theme.fontMedium,
      fontSize: theme.responsiveFontSize * 0.8,
      lineHeight: 16,
    },
    circleDataContainer: {
      maxWidth: '30%',
      marginVertical: 24,
      marginHorizontal: 24,
      justifyContent: 'center',
    },
    currentTokenPercentage: {
      position: 'absolute',
      top: 175,
      left: 95,
      textAlign: 'center',
      fontSize: theme.titleFontSize * 1.50,
      fontFamily: theme.fontMedium,
    },
    displayNone: {
      display: 'none',
    },
    circleChartContainer: {
      width: '50%',
      position: 'relative',
      marginLeft: 12,
      marginRight: 32,
    },
    chart: {
      marginLeft: 12,
    }
  });
  return styles;
};

export default useGTAStyles;
