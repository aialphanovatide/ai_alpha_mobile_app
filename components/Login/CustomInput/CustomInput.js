import React, { useState } from 'react';
import { View, TextInput, Text, Button, Image, StyleSheet, useWindowDimensions, Appearance } from 'react-native';

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
    const colorScheme = Appearance.getColorScheme();

    return (
        <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#5f6567' : 'white' }]} showsVerticalScrollIndicator={false}>
            <TextInput value={value} onChangeText={setValue} 
            placeholder={placeholder} 
            style={[styles.input, { color: colorScheme === 'dark' ? 'white' : 'black' }]}
            secureTextEntry={secureTextEntry}>

            </TextInput>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width:'100%',
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginTop: 5,
        marginBottom:15,
        borderRadius: 5,
        borderWidth: 0.3,
        borderColor: 'black',
    },
    input:{
        fontSize:17,
    },
});

export default CustomInput;