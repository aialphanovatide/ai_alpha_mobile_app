import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../context/themeContext';

const useNoContentMessageStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      minHeight: 200,
      backgroundColor: theme.boxesBackgroundColor,
      alignSelf: 'center',
      justifyContent: 'center',
      paddingVertical: '30%',
      paddingHorizontal: '25%',
    },
    message: {
      color: theme.secondaryTextColor,
      textAlign: 'center',
      fontSize: theme.responsiveFontSize,
      fontFamily: theme.fontBoldItalic,
    },
  });
  return styles;
};

export default useNoContentMessageStyles;
