import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';
const useCalendarStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: theme.width,
      paddingTop: 36,
      backgroundColor: 'transparent',
    },
    flex: {
      flex: 1,
    },
    titleContainer: {
      paddingHorizontal: 10,
      marginTop: theme.titlesVerticalMargin,
      marginVertical: theme.boxesVerticalMargin,
    },
    title: {
      fontWeight: 'bold',
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
      textAlign: 'left',
    },
    calendarContent: {
      flex: 1,
      width: '100%',
      marginVertical: theme.boxesVerticalMargin,
      alignItems: 'flex-start',
      borderRadius: 4,
    },
    subTitle: {
      marginVertical: theme.titlesVerticalMargin,
      marginBottom: theme.boxesVerticalMargin,
      paddingHorizontal: 16,
      color: theme.titleColor,
      fontSize: theme.responsiveFontSize,
      fontWeight: 'bold',
    },
    sectionDescription: {
      width: '100%',
      marginHorizontal: 10,
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.textColor,
      textAlign: 'left',
      lineHeight: 20,
    },
    macroeconomicsContainer: {
      flex: 1,
      maxWidth: '90%',
      marginBottom: 50,
      alignItems: 'center',
      backgroundColor: theme.boxesBackgroundColor,
    },
    paddingH: {
      width: 350,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: '12.5%',
    },
  });
  return styles;
};

export default useCalendarStyles;
