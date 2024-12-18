import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const useDappsStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    itemContainer: {
      flex: 1,
      flexDirection: 'row',
      padding: 10,
    },
    logoContainer: {
      width: 50,
      height: 56,
      justifyContent: 'flex-start',
      alignItems: 'center',
      overflow: 'visible',
    },
    logo: {
      flex: 1,
      marginBottom: '20%',
    },
    disabled: {
      tintColor: theme.dAppsInactiveItem,
    },
    mainImageContainer: {
      marginTop: theme.boxesVerticalMargin,
      justifyContent: 'center',
      alignItems: 'center',
    },
    mainImage: {
      width: 320,
      height: 300,
    },
    dataContainer: {
      marginTop: -24,
      padding: 10,
      paddingTop: 0,
    },
    title: {
      marginVertical: theme.boxesVerticalMargin,
      marginHorizontal: 12,
      fontSize: theme.titleFontSize,
      textTransform: 'capitalize',
      color: theme.textColor,
      fontWeight: 'bold',
    },
    text: {
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.textColor,
      lineHeight: 16,
    },
    description: {
      marginHorizontal: 10,
      marginBottom: 10,
    },
    protocolItemContainer: {
      position: 'relative',
      width: '100%',
      height: 45,
      marginVertical: 16,
      flexDirection: 'row',
    },
    row: {
      position: 'relative',
      flexDirection: 'row',
    },
    strong: {
      fontWeight: 'bold',
    },
    protocolImage: {
      width: 40,
      height: 40,
      marginTop: 16,
      zIndex: 20,
    },
    defaultProtocol: {
      tintColor: theme.secondaryGrayColor,
    },
    line: {
      position: 'absolute',
      top: '30%',
      left: '10%',
      width: '10%',
      borderTopWidth: 6,
      borderColor: theme.fundamentalsCompetitorsItemBg,
      alignSelf: 'center',
    },
    protocolDataContainer: {
      flex: 1,
      position: 'absolute',
      top: 0,
      right: 0,
      marginLeft: 15,
      width: '85%',
      backgroundColor: theme.fundamentalsCompetitorsItemBg,
      padding: 12,
      borderRadius: 2,

    },
    arrowButton: {
      width: 20,
      height: 20,
      padding: 2,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    arrowImage: {
      flex: 1,
      tintColor: theme.grayArrowColor,
    },
    protocolName: {
      fontSize: theme.responsiveFontSize * 0.85,
      color: theme.inactiveTextColor,
      fontFamily: theme.fontSemibold,
    },
    tvl: {
      position: 'absolute',
      right: 0,
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.inactiveTextColor,
      fontFamily: theme.fontSemibold,
    },
    protocolDescription: {
      height: 80,
      marginVertical: theme.boxesVerticalMargin,
      fontSize: theme.responsiveFontSize * 0.8,
      lineHeight: 16,
      color: theme.inactiveTextColor,
      fontFamily: theme.fontMedium,
    },
    hidden: {
      display: 'none',
      opacity: 0,
    },
    activeItem: {
      height: 140,
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
  });
  return styles;
};

export default useDappsStyles;
