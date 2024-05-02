import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { AppThemeContext } from '../../../context/themeContext';

const useFAQsStyles = () => {
  const { theme } = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    backgroundColor: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    title: {
      marginVertical: '5%',
      marginLeft: '6%',
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
      fontFamily: theme.fontSemibold,
    },
    faqContainer: {
      width: '95%',
      alignSelf: 'center',
      backgroundColor: theme.loginInputBgColor,
      marginBottom: 16,
      borderRadius: 8,
      overflow: 'hidden',
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
    optionsContainer: {
      marginVertical: theme.boxesVerticalMargin,
      width: theme.width,
      padding: 10,
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
    },
    faqAnswerText: {
        fontFamily: theme.font,
        color: theme.titleColor,
    },
  });
  return styles;
};

export default useFAQsStyles;
