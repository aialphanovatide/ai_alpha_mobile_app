import {useContext} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../context/themeContext';

const useTopMenuStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      minWidth: 60,
      paddingTop: 10,
      paddingBottom: 4,
      backgroundColor: 'transparent',
    },
    loadingMessage: {
      flex: 1,
      alignSelf: 'center',
      marginHorizontal: '25%',
    },
    text: {
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.825,
      fontFamily: theme.fontMedium,
      textAlign: 'center',
    },
    topContentWrapper: {
      width: theme.width,
      position: 'relative',
    },
    marginWrapper: {
      position: 'relative',
      marginTop: 8,
      backgroundColor: 'transparent',
    },
    modal: {
      position: 'absolute',
      top: '100%',
      width: '95%',
      height: 800,
      alignSelf: 'center',
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 4,
      zIndex: 3000,
    },
  });
  return styles;
};

export default useTopMenuStyles;
