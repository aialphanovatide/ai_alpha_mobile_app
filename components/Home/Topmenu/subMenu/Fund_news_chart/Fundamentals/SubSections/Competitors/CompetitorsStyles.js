import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const useCompetitorsStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    menuContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    menuItemContainer: {
      width: theme.width * 0.225,
      height: theme.height * 0.125,
      margin: 4,
      padding: 4,
      paddingTop: 6,
      borderRadius: 4,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    itemIcon: {
      width: 20,
      height: 18,
      marginVertical: 6,
      tintColor: theme.fundamentalsMenuText,
    },
    none: {
      display: 'none',
    },
    menuItemName: {
      marginBottom: 2,
      color: theme.fundamentalsMenuText,
      textAlign: 'center',
      verticalAlign: 'top',
      fontSize: 12,
      lineHeight: 16,
      fontFamily: theme.font,
    },
    activeItem: {
      color: theme.orange,
      fontFamily: theme.fontSemibold,
    },
    competitorSection: {
      flex: 1,
      marginVertical: theme.boxesVerticalMargin,
    },
    selectedOptionContent: {
      flex: 1,
      height: 600,
    },
    title: {
      marginBottom: theme.titlesVerticalMargin * 0.5,
      marginHorizontal: theme.titlesVerticalMargin,
      color: theme.titleColor,
      fontSize: theme.responsiveFontSize * 0.95,
      fontFamily: theme.fontSemibold,
    },
    row: {
      width: '100%',
      position: 'relative',
      marginVertical: 8,
      flexDirection: 'row',
    },
    emptySectionMessage: {
      margin: theme.boxesVerticalMargin,
      fontSize: theme.responsiveFontSize,
      color: theme.secondaryTextColor,
      alignSelf: 'center',
      fontFamily: theme.fontBoldItalic,
    },
    emptyMessageContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loaderWrapper: {
      paddingVertical: 48,
    },
  });
  return styles;
};

export default useCompetitorsStyles;
