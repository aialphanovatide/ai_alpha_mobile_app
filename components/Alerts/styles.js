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
    background: {
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
      fontSize: theme.responsiveFontSize,
      fontWeight: 'bold',
      fontStyle: 'italic',
      color: theme.secondaryTextColor,
      alignSelf: 'center',
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
      display: 'row',
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
    buttonContainer: {
      flexDirection: 'row',
      margin: 10,
      marginBottom: 30,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      paddingVertical: 5,
      paddingHorizontal: 15,
      backgroundColor: theme.subMenuBgColor,
      marginHorizontal: 5,
    },
    activeButton: {
      backgroundColor: theme.subMenuTextColor,
    },
    activeText: {
      color: theme.secondaryTextColor,
      fontSize: theme.responsiveFontSize * 0.875,
      textTransform: 'capitalize',
      fontWeight: 'bold',
    },
    inactiveText: {
      color: theme.subMenuTextColor,
      fontSize: theme.responsiveFontSize * 0.875,
      textTransform: 'capitalize',
      fontWeight: 'bold',
    },
  });
  return styles;
};

export default useAlertsStyles;
