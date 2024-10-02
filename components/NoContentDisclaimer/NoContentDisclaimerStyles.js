const {useContext} = require('react');
const {StyleSheet} = require('react-native');
const {AppThemeContext} = require('../../context/themeContext');

const useNoContentDisclaimerStyles = () => {
  const {theme, isDarkMode} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    disclaimerContainer: {
      width: '100%',
      height: 'auto',
      marginVertical: '25%',
      marginHorizontal: '25%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      alignSelf: 'center',
    },
    title: {
      fontFamily: theme.fontSemibold,
      fontSize: 15,
      lineHeight: 20,
      textAlign: 'center',
      color: isDarkMode ? '#A3A3A3' : '#727272',
    },
    description: {
      fontFamily: theme.font,
      fontSize: 11,
      lineHeight: 15,
      textAlign: 'center',
      color: isDarkMode ? '#737373' : '#A4A4A4',
    },
    marginContainer: {
      marginVertical: 16,
    },
  });
  return styles;
};

export default useNoContentDisclaimerStyles;
