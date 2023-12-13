import React, { useState } from 'react';
import { View, TextInput, Text, Button, Image, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import GoogleLogo from './GoogleLogo';
import FacebookLogo from './FacebookLogo';


const CustomButton = ({onPress, text, type="PRIMARY", disabled}) => { //By default the button type is primary
    let logo = null;

    if (type === "GOOGLE") {
        logo = <GoogleLogo style={styles.logo} />;
    }
    if (type === "FACEBOOK") {
        logo = <FacebookLogo style={styles.logo} />;
    }
    return (
        <Pressable onPress={onPress} disabled={disabled} style={[styles.container, styles[`container_${type}`], disabled && styles.disabled]}>
            <View style={styles.buttonContent}>
                {logo}
                <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container:{
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginVertical: 5,
        borderRadius: 5,
        alignItems:'center'
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    disabled: {
        // Style for disabled button, e.g., lowering the opacity
        opacity: 0.5,
    },
    container_PRIMARY:{
        backgroundColor:'#fc5505',
        width:150,
        marginBottom: 0,
    },
    container_SECONDARY:{
        backgroundColor:'#fc5505',
        width: 200,
    },
    container_TERTIARY:{
        width:300,
    },
    container_GOOGLE:{
        width:220,
        backgroundColor:'transparent',
        borderWidth: 1,
        borderColor: '#fc5505',

    },
    container_FACEBOOK:{
        width:220,
        backgroundColor:'transparent',
        borderWidth: 1,
        borderColor: '#fc5505',

    },
    text:{
        color:'white',
        fontWeight:'bold',
        fontSize:15,
    },
    text_TERTIARY:{
        color:'#fc5505'
    }
});

export default CustomButton;