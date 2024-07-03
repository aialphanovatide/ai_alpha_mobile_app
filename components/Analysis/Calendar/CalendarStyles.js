import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';
const useCalendarStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: theme.width,
      height: 'auto',
      paddingTop: 45,
      backgroundColor: 'transparent',
    },
    flex: {
      flex: 1,
    },
    backbuttonContainer: {
      marginHorizontal: 20,
    },
    title: {
      marginHorizontal: 28,
      marginVertical: 16,
      color: theme.titleColor,
      fontSize: 25,
      fontFamily: theme.fontMedium,
      textAlign: 'left',
    },
    calendarContent: {
      flex: 1,
      width: '100%',
      alignItems: 'flex-start',
      borderRadius: 4,
    },
    subTitle: {
      marginVertical: 16,
      marginHorizontal: 28,
      color: theme.titleColor,
      fontSize: 16,
      fontFamily: theme.fontMedium,
    },
    sectionDescription: {
      width: '90%',
      marginHorizontal: 28,
      fontSize: 14,
      fontFamily: theme.font,
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
    marginBottom: {
      marginBottom: '10%',
    },
  });
  return styles;
};

export default useCalendarStyles;
