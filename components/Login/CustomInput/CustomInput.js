import React, {useContext} from 'react';
import {View, TextInput} from 'react-native';
import useCustomInputStyles from './CustomInputStyles';
import {AppThemeContext} from '../../../context/themeContext';

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
  const styles = useCustomInputStyles();
  const {theme} = useContext(AppThemeContext);
  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={theme.secondaryTextColor}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
    </View>
  );
};

export default CustomInput;
