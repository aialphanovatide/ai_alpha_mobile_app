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
      marginVertical: 5,
      paddingVertical: 4,
      paddingHorizontal: 6,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderRadius: 2,
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
      alignSelf: 'center',
      color: '#A3A3A3',
      fontFamily: theme.font,
      fontSize: 11,
    },
    activeText: {
      color: '#FFFFFF',
      fontFamily: theme.fontMedium,
    },
    circleDataContainer: {
      maxWidth: '43.5%',
      marginVertical: 24,
      marginHorizontal: 18,
      justifyContent: 'center',
    },
    currentTokenPercentage: {
      position: 'absolute',
      top: 175,
      left: 75,
      textAlign: 'center',
      fontSize: theme.titleFontSize * 1.5,
      fontFamily: theme.fontMedium,
    },
    displayNone: {
      display: 'none',
    },
    circleChartContainer: {
      width: '46.5%',
      position: 'relative',
      marginLeft: 16,
      marginRight: 24,
    },
    chart: {
      marginLeft: 12,
    },
  });
  return styles;
};

export default useGTAStyles;
