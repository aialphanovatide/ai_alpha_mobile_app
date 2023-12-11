import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, useWindowDimensions, ScrollView, Text, TouchableOpacity } from 'react-native';
import CustomButton from '../../CustomButton';
import CustomInput from '../../CustomInput/CustomInput';
import { useNavigation } from '@react-navigation/core';



const ConfirmForm = () => {
    const [code, setCode] = useState();
    const navigation = useNavigation();

    const onSignInPressed =()=> {
        //validate user logic missing
        navigation.navigate('SignIn');
    }
    const onConfirmPressed =()=> {
        navigation.navigate('HomeScreen');
    }
    const onResendPressed =()=> {
        console.warn("Resend email")
    }

    return (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
        <Text style={styles.mainTitle}>Confirm Email Address</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Verification Code</Text>
                <CustomInput placeholder='' value={code} setValue={setCode} />
            </View>

            <CustomButton text="Confirm Email" onPress={onConfirmPressed}/>
            <View style={styles.confirmContainer}>
                    <TouchableOpacity onPress={onResendPressed}>
                        <Text style={styles.confirmButton}>Resend Code</Text>
                    </TouchableOpacity>
                    <Text>                </Text>
                    <TouchableOpacity onPress={onSignInPressed}>
                        <Text style={styles.confirmButton}>Back to Log In</Text>
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
    confirmContainer: {
        flexDirection: 'row',
        marginTop: 40,
    },
    confirmButton: {
        color: '#fc5505',
        fontWeight: 'bold',
        padding:15,
        borderWidth: 1,
        borderColor: '#fc5505',
        borderRadius: 5,
    },
    separateElement:{
        marginRight: 30,

    }
});


export default ConfirmForm;
