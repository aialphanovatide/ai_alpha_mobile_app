import {useContext} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../context/themeContext';

const useTopMenuStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      minWidth: 60,
      paddingVertical: 10,
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
      width: '100%',
      marginTop: 8,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    modal: {
      paddingTop: Platform.OS === 'ios' ? 80 : 0,
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      width: '100%',
      height: theme.height,
      backgroundColor: theme.boxesBackgroundColor,
    },
  });
  return styles;
};

export default useTopMenuStyles;
