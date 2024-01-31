import React from 'react';
import {View, TextInput} from 'react-native';
import useCustomInputStyles from './CustomInputStyles';

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
  const styles = useCustomInputStyles();
  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default CustomInput;