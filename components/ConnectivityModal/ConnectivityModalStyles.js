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
    title: {
      marginHorizontal: '5%',
      fontSize: 23,
      fontFamily: theme.fontSemibold,
      color: '#FF6C0D',
      textAlign: 'center',
      alignSelf: 'center',
      verticalAlign: 'middle',
    },
    subtitle: {
      fontSize: 14,
    },
    connectivityImage: {
      width: '100%',
      height: 360,
      marginTop: '70%',
      paddingBottom: '10%',
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
      width: '80%',
      marginTop: 32,
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
    }
  });
  return styles;
};

export default useConnectivityModalStyles;
