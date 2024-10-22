import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../context/themeContext';

const useSubMenuStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    background: {
      backgroundColor: theme.mainBackgroundColor,
    },
    container: {
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: theme.mainBackgroundColor,
    },
  });
  return styles;
};
export default useSubMenuStyles;
