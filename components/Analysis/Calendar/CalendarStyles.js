import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';
const useCalendarStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: theme.width,
      padding: 20,
      backgroundColor: theme.mainBackgroundColor,
    },
    flex: {
      flex: 1,
    },
    titleContainer: {
      marginVertical: 10,
      textAlign: 'left',
    },
    title: {
      paddingHorizontal: 10,
      fontWeight: 'bold',
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
    },
    calendarContent: {
      flex: 1,
      marginVertical: 30,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    subTitle: {
      marginVertical: 5,
      paddingVertical: 2.5,
      paddingHorizontal: 15,
      color: theme.titleColor,
      fontSize: theme.responsiveFontSize,
      fontWeight: 'bold',
    },
  });
  return styles;
};

export default useCalendarStyles;
