import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../context/themeContext';

const useAlertsStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: theme.mainBackgroundColor,
    },
    title: {
      fontSize: theme.titleFontSize,
      fontWeight: 'bold',
      color: theme.titleColor,
      alignSelf: 'flex-start',
      margin: 15,
    },
    noAlertsContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noAlerts: {
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: theme.titleFontSize,
      color: theme.titleColor,
      alignSelf: 'center'
    },
    itemsContainer: {
      flexDirection: 'row',
      margin: 12,
      padding: 15,
      borderRadius: 5,
      elevation: 1,
      backgroundColor: theme.boxesBackgroundColor,
    },
    leftContent: {
      flex: 3,
      display: 'row'
    },
    itemsTitle: {
      fontWeight: 'bold',
      color: theme.textColor,
      fontSize: theme.responsiveFontSize,
    },
    subtitle: {
      marginTop: 10,
      color: theme.textColor,
    },
    rightContent: {
      flex: 1,
    },
    rightTitle: {
      fontWeight: 'bold',
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.8,
    },
  });
  return styles;
};

export default useAlertsStyles;
