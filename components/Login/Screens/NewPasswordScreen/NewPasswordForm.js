import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, useWindowDimensions, ScrollView, Text, TouchableOpacity } from 'react-native';
import CustomButton from '../../CustomButton';
import CustomInput from '../../CustomInput/CustomInput';
import { useNavigation } from '@react-navigation/core';



const NewPasswordForm = () => {
    const [code, setCode] = useState();
    const [newPassword, setnewPassword] = useState();
    const navigation = useNavigation();

    const onSignInPressed =()=> {
        //validate user logic missing
        navigation.navigate('SignIn');
    }
    const onSubmitPressed =()=> {
        navigation.navigate('HomeScreen');
    }
    
    return (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
        <Text style={styles.mainTitle}>Reset your Password</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Confirmation Code</Text>
                <CustomInput placeholder='' value={code} setValue={setCode} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>New Password</Text>
                <CustomInput placeholder='' value={newPassword} setValue={setnewPassword} />
            </View>
            <CustomButton text="Submit" onPress={onSubmitPressed}/>
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


export default NewPasswordForm;
