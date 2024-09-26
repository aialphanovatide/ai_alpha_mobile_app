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
      marginBottom: 16,
    },
    menuItemContainer: {
      width: theme.width * 0.225,
      height: theme.height * 0.1,
      margin: 4,
      padding: 4,
      paddingTop: 6,
      borderRadius: 2,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: theme.fundamentalsCompetitorsItemBg,
    },
    relativeContainer: {
      flex: 1,
      position: 'relative',
      backgroundColor: 'transparent',
    },
    itemIcon: {
      width: 20,
      height: 20,
      marginTop: 7,
      tintColor: theme.fundamentalsMenuText,
    },
    none: {
      display: 'none',
    },
    menuItemName: {
      marginTop: 5,
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
    activeTriangle: {
      position: 'absolute',
      top: 80,
      left: '40%',
      tintColor: theme.fundamentalsCompetitorsItemBg,
      zIndex: 200,
    },
  });
  return styles;
};

export default useCompetitorsStyles;
