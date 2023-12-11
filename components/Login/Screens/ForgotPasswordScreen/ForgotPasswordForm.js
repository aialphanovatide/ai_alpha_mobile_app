import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, useWindowDimensions, ScrollView, Text, TouchableOpacity } from 'react-native';
import CustomButton from '../../CustomButton';
import CustomInput from '../../CustomInput/CustomInput';
import { useNavigation } from '@react-navigation/core';



const ForgotPasswordForm = () => {
    const [email, setEmail] = useState();
    const navigation = useNavigation();

    const onSignInPressed =()=> {
        //validate user logic missing
        navigation.navigate('SignIn');
    }
    const onForgotPasswordPressed =()=> {
        navigation.navigate('NewPassword');
    }

    return (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
        <Text style={styles.mainTitle}>Reset your Password</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Email Address</Text>
                <CustomInput placeholder='' value={email} setValue={setEmail} />
            </View>
            <CustomButton text="Send" onPress={onForgotPasswordPressed}/>
            <View style={styles.loginContainer}>
                    <TouchableOpacity onPress={onSignInPressed}>
                        <Text style={styles.loginButton}>Back to Log In</Text>
                    </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#242427',
    },
    root:{
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#242427',
        padding: 20,
    },
    mainTitle:{
        fontSize: 24,
        fontWeight: 'bold',
        color:'white',
        margin: 40,
    },
    inputContainer: {
        alignSelf: 'stretch',
    },
    title: {
        color: '#b8bbbd',
        textAlign: 'left',
        marginLeft: 0,
        fontWeight:'bold',
    },
    loginContainer: {
        flexDirection: 'row',
        marginTop: 30,
    },
    loginText: {
        color: 'white',
        
    },
    loginButton: {
        color: '#fc5505',
        fontWeight: 'bold',
    },
});


export default ForgotPasswordForm;
