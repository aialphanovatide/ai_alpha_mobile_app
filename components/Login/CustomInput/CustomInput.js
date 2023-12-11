import React, { useState } from 'react';
import { View, TextInput, Text, Button, Image, StyleSheet, useWindowDimensions } from 'react-native';

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
    return (
        <View style={styles.container}>
            <TextInput value={value} onChangeText={setValue} 
            placeholder={placeholder} 
            style={styles.input} 
            secureTextEntry={secureTextEntry}>

            </TextInput>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#5f6567',
        width:'100%',
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginTop: 5,
        marginBottom:15,
        borderRadius: 5,
    },
    input:{
        color:'white',
        fontSize:17,
    },
});

export default CustomInput;