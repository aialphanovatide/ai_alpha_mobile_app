import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import CustomPasswordInputStyles from './CustomPasswordInputStyles';

const CustomPasswordInput = ({ value, setValue, placeholder }) => {
  const styles = CustomPasswordInputStyles();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
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
        onPress={togglePasswordVisibility}
      >
        <Image
          source={require('../../../assets/images/login/eyeIcon.png')}
          style={{ width: 20, height: 20 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomPasswordInput;
