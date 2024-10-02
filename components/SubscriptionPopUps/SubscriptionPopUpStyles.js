import {AppThemeContext} from '../../context/themeContext';

const {useContext} = require('react');
const {StyleSheet, Platform, StatusBar} = require('react-native');

const useSubscriptionPopUpStyles = () => {
  const {theme, isDarkMode} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    orangeBox: {
      top: '30%',
      width: theme.width - 10,
      backgroundColor: '#FFF7EC',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      padding: 20,
      borderWidth: 1,
      borderColor: '#FF6C0D',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5,
    },
    mainTitle: {
      marginHorizontal: '15%',
      fontSize: 30,
      fontFamily: theme.fontSemibold,
      color: '#FF6C0D',
      textAlign: 'center',
      alignSelf: 'center',
      verticalAlign: 'middle',
    },
    subtitle: {
      fontSize: 14,
      lineHeight: 25,
      fontFamily: theme.font,
      color: '#FF6C0D',
      textAlign: 'center',
      alignSelf: 'center',
    },
    secondaryTitle: {
      fontSize: 18,
    },
    graySecondaryText: {
      marginTop: 16,
      fontFamily: theme.font,
      color: '#A3A3A3',
      fontSize: 11,
    },
    imageContainer: {
      width: '100%',
      height: 460,
      marginTop: '50%',
      paddingBottom: 20,
      justifyContent: 'flex-end',
      alignItems: 'center',
      alignSelf: 'center',
    },
    absolute: {
      ...StyleSheet.absoluteFillObject,
    },
    modal: {
      position: 'relative',
      width: theme.width,
      height: '100%',
      justifyContent: 'center',
    },
    button: {
      width: '85%',
      marginTop: 16,
      paddingVertical: 8,
      backgroundColor: '#FF6C0D',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      borderRadius: 4,
    },
    buttonText: {
      fontSize: 16,
      fontFamily: theme.fontSemibold,
      color: '#FAFAFA',
    },
  });
  return styles;
};

export default useSubscriptionPopUpStyles;
