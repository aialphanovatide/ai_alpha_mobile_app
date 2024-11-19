import {View, Switch} from 'react-native';
import React, {useContext} from 'react';
import {AppThemeContext} from '../../context/themeContext';
import useThemeButtonStyles from './ThemeButtonStyles';

// Component to render a switch button to toggle the dark mode on and off. It uses the AppThemeContext to get the current theme and the toggleDarkMode function to change the theme.

const ThemeButton = () => {
  const {toggleDarkMode, isDarkMode} = useContext(AppThemeContext);
  const styles = useThemeButtonStyles();
  return (
    <View style={styles.switchContainer}>
      <Switch
        value={isDarkMode}
        onChange={() => toggleDarkMode()}
        trackColor={{true: '#00E561', false: '#D9D9D9'}}
        thumbColor={'#F6F7FB'}
        ios_backgroundColor={'#D9D9D9'}
      />
    </View>
  );
};

export default ThemeButton;
