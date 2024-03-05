import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../context/themeContext';

const useAlertsStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    background: {
      flex: 1,
      padding: 10,
    },
    title: {
      margin: 12,
      marginHorizontal: 24,
      fontSize: theme.titleFontSize,
      fontWeight: 'bold',
      color: theme.titleColor,
      alignSelf: 'flex-start',
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
      minHeight: 80,
      flexDirection: 'row',
      backgroundColor: theme.boxesBackgroundColor,
      marginVertical: 4,
      borderRadius: 2,
      padding: 6,
      paddingVertical: 8,
      flex: 1,
    },
    leftContent: {
      flex: 1,
      margin: 2,
    },
    itemsTitle: {
      marginHorizontal: 4,
      fontWeight: 'bold',
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.9,
      lineHeight: 22,
    },
    noHorizontalMargin: {
      marginHorizontal: 0,
    },
    subtitle: {
      maxWidth: '70%',
      marginHorizontal: 4,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.8,
      lineHeight: 22,
    },
    rightContent: {
      position: 'absolute',
      right: 12,
      margin: 4,
    },
    rightTitle: {
      marginHorizontal: 4,
      fontSize: theme.responsiveFontSize * 0.8,
      fontWeight: 'bold',
      color: theme.textColor,
      lineHeight: 22,
    },
    price: {
      fontSize: theme.responsiveFontSize * 0.8,
    },
    buttonContainer: {
      flexDirection: 'row',
      marginVertical: theme.boxesVerticalMargin,
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 2,
      alignSelf: 'center',
    },
    button: {
      width: '49%',
      padding: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeButton: {
      backgroundColor: theme.activeWhite,
      borderColor: theme.subMenuBgColor,
      borderWidth: 2,
      borderRadius: 4,
    },
    activeText: {
      color: theme.subMenuTextColor,
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
    row: {
      flexDirection: 'row',
    },
    priceAndStateWord: {
      position: 'absolute',
      top: 0,
      right: 0,
      margin: 4,
      padding: 2,
    },
  });
  return styles;
};

export default useAlertsStyles;
