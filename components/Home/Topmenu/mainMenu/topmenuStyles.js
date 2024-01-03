import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../context/themeContext';

const useTopMenuStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      minWidth: 60,
      paddingVertical: 10,
      backgroundColor: theme.mainBackgroundColor,
    },
    loadingMessage: {
      flex: 1,
      alignSelf: 'center',
      marginHorizontal: '25%',
    },
    text: {
      color: theme.textColor,
      fontSize: theme.responsiveFontSize,
      textAlign: 'center',
    },
  });
  return styles;
};

export default useTopMenuStyles;
