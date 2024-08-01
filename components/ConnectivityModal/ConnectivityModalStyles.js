const {useContext} = require('react');
const {StyleSheet, Platform, StatusBar} = require('react-native');
const {AppThemeContext} = require('../../context/themeContext');

const useConnectivityModalStyles = () => {
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
      width: '98%',
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
    imageStyle1: {
      width: 35,
      height: 28,
      marginRight: 30,
    },
    imageStyle2: {
      width: 20,
      height: 20,
      marginRight: 10,
    },
    imageStyle3: {
      width: 26,
      height: 25,
      marginLeft: 40,
      marginRight: 20,
      marginBottom: 10,
    },
    labelText1: {
      color: '#FF6C0D',
      fontSize: 16,
      marginRight: 60,
      fontFamily: theme.font,
    },
    labelText2: {
      color: '#FF6C0D',
      fontSize: 16,
      textDecorationLine: 'underline',
      fontFamily: theme.fontMedium,
    },
    labelText3: {
      fontSize: 10,
      fontFamily: theme.font,
      textAlign: 'center',
    },
  });
  return styles;
};

export default useConnectivityModalStyles;
