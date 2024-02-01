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
      padding: 10,
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
      position: 'relative',
      flexDirection: 'row',
      backgroundColor: theme.boxesBackgroundColor,
      marginVertical: theme.boxesVerticalMargin,
      borderRadius: 2,
      padding: 8,
      flex: 1,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 2,
    },
    leftContent: {
      flex: 1,
      margin: theme.boxesVerticalMargin,
    },
    itemsTitle: {
      marginVertical: 4,
      fontWeight: 'bold',
      color: theme.textColor,
      fontSize: theme.responsiveFontSize,
    },
    subtitle: {
      marginTop: 8,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.85,
      lineHeight: 22,
    },
    rightContent: {
      position: 'absolute',
      top: 8,
      right: 8,
      flex: 1,
    },
    rightTitle: {
      fontWeight: 'bold',
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.8,
    },
    buttonContainer: {
      flexDirection: 'row',
      marginVertical: theme.boxesVerticalMargin,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      backgroundColor: theme.subMenuBgColor,
      marginHorizontal: 4,
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
