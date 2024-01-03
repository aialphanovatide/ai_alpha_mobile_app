import {Text, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {AppThemeContext} from '../../context/themeContext';
import useThemeButtonStyles from './ThemeButtonStyles';

const ThemeButton = () => {
  const {toggleDarkMode, isDarkMode} = useContext(AppThemeContext);
  const styles = useThemeButtonStyles();
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={() => toggleDarkMode()}>
      <Text style={styles.buttonSymbol}>{isDarkMode ? '☀' : '🌙'}</Text>
    </TouchableOpacity>
  );
};

export default ThemeButton;
