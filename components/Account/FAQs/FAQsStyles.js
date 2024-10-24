import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useFAQsStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    flex: {
      flex: 1,
    },
    gradient: {
      width: theme.width,
      height: 800,
      position: 'absolute',
      top: 0,
      left: 0,
    },
    backgroundColor: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    backButtonContainer: {
      marginHorizontal: 20,
    },
    title: {
      marginHorizontal: 26,
      marginVertical: 18,
      color: theme.titleColor,
      fontSize: 25,
      fontFamily: theme.fontMedium,
    },
    faqContainer: {
      width: '95%',
      alignSelf: 'center',
      backgroundColor: theme.loginInputBgColor,
      marginBottom: 16,
      borderRadius: 2,
      overflow: 'hidden',
    },
    lastFAQContainer: {
      marginBottom: 70, // margin only for the last element
    },
    faqTouchable: {
      justifyContent: 'center',
      minHeight: 60,
      paddingHorizontal: 10,
      paddingVertical: 20,
    },
    faqQuestionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: theme.fontSemibold,
    },
    faqArrow: {
      width: 12,
      height: 8,
    },
    faqAnswer: {
      paddingVertical: 10,
      paddingHorizontal: 1,
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
      fontFamily: theme.fontSemibold,
    },
    rightArrowContainer: {
      position: 'absolute',
      right: 24,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rightArrow: {
      flex: 1,
      tintColor: theme.secondaryTextColor,
    },
    container: {
      flex: 1,
      width: theme.width,
      alignItems: 'center',
      backgroundColor: theme.mainBackgroundColor,
    },
    image: {
      flex: 1,
    },
    row: {
      width: '80%',
      flexDirection: 'row',
    },
    paddingV: {
      paddingVertical: 24,
    },
    faqQuestionText: {
      fontFamily: theme.fontMedium,
      color: theme.titleColor,
      fontSize: 13.5,
    },
    faqAnswerText: {
      fontFamily: theme.font,
      color: theme.titleColor,
    },
  });
  return styles;
};

export default useFAQsStyles;
