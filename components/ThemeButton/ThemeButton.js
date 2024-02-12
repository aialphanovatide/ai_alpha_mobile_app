import {Image, Text, View, Switch} from 'react-native';
import React, {useContext} from 'react';
import {AppThemeContext} from '../../context/themeContext';
import useThemeButtonStyles from './ThemeButtonStyles';

const ThemeButton = () => {
  const {toggleDarkMode, isDarkMode} = useContext(AppThemeContext);
  const styles = useThemeButtonStyles();
  return (
    // <View style={styles.buttonContainer}>
    //   <View style={styles.buttonLogoContainer}>
    //     <Image
    //       source={require('../../assets/images/account/darkmode.png')}
    //       resizeMode="contain"
    //       style={styles.buttonLogo}
    //     />
    //   </View>
    //   <Text style={styles.name}>Dark Mode</Text>
    <View style={styles.switchContainer}>
      <Switch
        value={isDarkMode}
        onChange={() => toggleDarkMode()}
        trackColor={{true: '#00E561', false: '#D9D9D9'}}
        thumbColor={'#F6F7FB'}
        ios_backgroundColor={'#D9D9D9'}
      />
    </View>
    // </View>
  );
};

export default ThemeButton;
