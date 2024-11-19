import React, {useContext, useState} from 'react';
import {View, TextInput, TouchableOpacity, Image} from 'react-native';
import CustomPasswordInputStyles from './CustomPasswordInputStyles';
import {AppThemeContext} from '../../../context/themeContext';

// Component to render a custom password input with different styles based on the theme. It uses a custom eye icon to toggle the password visibility. The input can also have a placeholder, and the value can be set and retrieved from the parent component.

const CustomPasswordInput = ({value, setValue, placeholder}) => {
  const styles = CustomPasswordInputStyles();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {theme, isDarkMode} = useContext(AppThemeContext);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={theme.placeHolderPasswordTextColor}
        style={styles.input}
        secureTextEntry={!isPasswordVisible}
      />
      <TouchableOpacity
        style={styles.eyeIconContainer}
        onPress={togglePasswordVisibility}>
        <Image
          source={
            isDarkMode
              ? isPasswordVisible
                ? require('../../../assets/images/login/eyeIconDarkCrossed.png')
                : require('../../../assets/images/login/eyeIconDark.png')
              : isPasswordVisible
              ? require('../../../assets/images/login/eyeIconLightCrossed.png')
              : require('../../../assets/images/login/eyeIconLight.png')
          }
          style={{width: 24, height: 15, tintColor: theme.inputColor}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomPasswordInput;
