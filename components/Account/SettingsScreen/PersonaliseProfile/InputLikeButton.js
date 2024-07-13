import React from 'react';
import { TouchableOpacity, TextInput, StyleSheet, View } from 'react-native';

const InputLikeButton = ({ onPress, placeholder, value }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View pointerEvents="none">
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#999"
          editable={false}
          value={value}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
  },
  input: {
    fontSize: 16,
    color: '#00000',
    backgroundColor: 'white',
  },
});

export default InputLikeButton;
