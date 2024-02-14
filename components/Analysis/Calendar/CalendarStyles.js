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
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 4,
    },
    subTitle: {
      marginVertical: theme.boxesVerticalMargin,
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
    },
  });
  return styles;
};

export default useCalendarStyles;
