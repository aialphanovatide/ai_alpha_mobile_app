/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../context/themeContext';
import {useContext} from 'react';

const useHomeStyles = () => {
  const {theme} = useContext(AppThemeContext);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.mainBackgroundColor,
    },
  });
  return styles;
};

export default useHomeStyles;
