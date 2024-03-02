import React, {useContext, useState} from 'react';
import {View, TextInput, TouchableOpacity, Image} from 'react-native';
import CustomPasswordInputStyles from './CustomPasswordInputStyles';
import {AppThemeContext} from '../../../context/themeContext';

const CustomPasswordInput = ({value, setValue, placeholder}) => {
  const styles = CustomPasswordInputStyles();
  const {theme} = useContext(AppThemeContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={!isPasswordVisible}
      />
      <TouchableOpacity
        style={styles.eyeIconContainer}
        onPress={togglePasswordVisibility}>
        <Image
          source={require('../../../assets/images/login/eyeIcon.png')}
          style={styles.eyeImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomPasswordInput;
