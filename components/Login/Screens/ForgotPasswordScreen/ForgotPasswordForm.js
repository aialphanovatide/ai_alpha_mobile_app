import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, useWindowDimensions, ScrollView, Text, TouchableOpacity } from 'react-native';
import CustomButton from '../../CustomButton';
import CustomInput from '../../CustomInput/CustomInput';
import { useNavigation } from '@react-navigation/core';
import GreenTick from '../../../../assets/images/greenTick.png';
import auth0 from '../../auth0.js';



const ForgotPasswordForm = () => {
    const [email, setEmail] = useState();
    const navigation = useNavigation();
    const [resetPasswordSuccesful, setresetPasswordSuccesful] = useState(false);

    const onSignInPressed =()=> {
        navigation.navigate('SignIn');
    }
    const onForgotPasswordPressed = async () => {
        if (email) {
            try {
                await auth0.auth.resetPassword({ 
                    email: email, 
                    connection: 'Username-Password-Authentication'
                });
                console.log('Reset password email sent.');
                setresetPasswordSuccesful(true);

                setTimeout(() => {
                    navigation.navigate('SignIn');
                }, 2000);
            } catch (error) {
                console.error('Failed to send reset password email:', error);
            }
        } else {
            console.error('Email is required');
        };
    };
    if (resetPasswordSuccesful) {
        return (
            <View style={styles.successContainer}>
                <Image source={GreenTick} style={styles.tickImage} />
                <Text style={styles.successText}>Reset Password Link Sent</Text>
            </View>
        );
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
    successContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#242427',
    },
    successText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    tickImage: {
        width: 120,
        height: 88,
        marginBottom: 10,
    },
});


export default ForgotPasswordForm;
