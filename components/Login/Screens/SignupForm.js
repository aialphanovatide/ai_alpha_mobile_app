import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image, StyleSheet, useWindowDimensions, Appearance,ScrollView, Text, Linking, TouchableOpacity } from 'react-native';
import Logo from '../../../assets/images/AIAlphalogonew.png'
import GreenTick from '../../../assets/images/greenTick.png';
import CustomInput from '../CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustomButton';
import Separator from '../CustomButton/Separator';
import SocialSignUpButton from '../SocialButtons/SocialSignUpButton';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import { API_KEY, ANDROID_API_KEY} from '@env';
import Purchases from 'react-native-purchases';
import { ENTITLEMENT_ID } from '../../../src/constants';
import { useUser } from '../../../context/UserContext';

const onTermsPressed =()=> {
    const url = "https://aialpha.ai/termsofservice";
    
    Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.warn("Don't know how to open URI: " + url);
            }
        })
        .catch((err) => console.error('An error occurred', err));
};

const SignupForm = () => {
    const {height} = useWindowDimensions();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();
    const navigation = useNavigation();
    const [isFormValid, setIsFormValid] = useState(false);
    const { setUserEmail } = useUser();
    const [signupSuccessful, setSignupSuccessful] = useState(false);
    const colorScheme = Appearance.getColorScheme();

    const validateForm = () => {
        const formIsValid =
            username &&
            email &&
            password &&
            passwordRepeat &&
            password === passwordRepeat;
        setIsFormValid(formIsValid);
    };
    useEffect(() => {
        // Re-validate the form every time the inputs change
        const formIsValid = username && email && password && password === passwordRepeat;
        setIsFormValid(formIsValid);
    }, [username, email, password, passwordRepeat]);

    const onSignInPressed =()=> {
        navigation.navigate('SignIn');
    }
    const onRegisterPressed = async () => {

        const purchaserInfo = await Purchases.getCustomerInfo();
        if (typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !== "undefined"){
          console.log("Passed")
        }else{
          navigation.navigate("PaywallScreen");
        }
    
        try {
            const response = await axios.post('https://dev-kqugsqvoounaylft.us.auth0.com/dbconnections/signup', {
                client_id: 'Rr0xvkmUdxACllY2wFPq9k6CFRnq01CO',
                email: email,
                password: password,
                connection: 'Username-Password-Authentication',
                user_metadata: {
                    username: username,
                },
            });
    
            console.log('Signup successful', response.data);
            setUserEmail(email);
            setSignupSuccessful(true);

            /*setTimeout(() => {
                navigation.navigate('SignIn');
            }, 2000);*/
        } catch (error) {
            if (error.response) {
                console.error('Signup error', error.response.data);
                alert('Signup failed: ' + error.response.data.error_description || error.response.data.message);
            } else if (error.request) {
                console.error('Signup error', error.request);
                alert('No response received.');
            } else {
                console.error('Error', error.message);
                alert('Error: ' + error.message);
            }
        }
    };
    /*
    if (signupSuccessful) {
        return (
            <View style={styles.successContainer}>
                <Image source={GreenTick} style={styles.tickImage} />
                <Text style={styles.successText}>Sign Up Successful</Text>
            </View>
        );
    }
    */

    return (
        <ScrollView style={[styles.scrollview, { backgroundColor: colorScheme === 'dark' ? '#242427' : 'white' }]} showsVerticalScrollIndicator={false}>
        <View style={[styles.root, { backgroundColor: colorScheme === 'dark' ? '#242427' : 'white' }]}>
        <Image source={Logo} style={[styles.logo, {height: height*0.3}]} resizeMode='contain'/>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Username</Text>
                <CustomInput placeholder='' value={username} setValue={setUsername} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Email</Text>
                <CustomInput placeholder='' value={email} setValue={setEmail} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Password</Text>
                <CustomInput placeholder='' value={password} setValue={setPassword} secureTextEntry={true}/>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Repeat Password</Text>
                <CustomInput placeholder='' value={passwordRepeat} setValue={setPasswordRepeat} secureTextEntry={true}/>
            </View>
            <View style={styles.termsContainer}>
                    <Text style={[styles.termsText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>By registering you agree to our </Text>
                    <TouchableOpacity onPress={onTermsPressed}>
                        <Text style={styles.termsButton}>Terms and Conditions</Text>
                    </TouchableOpacity>
            </View>
            <CustomButton text="Register" onPress={onRegisterPressed} disabled={!isFormValid}/>
            <Separator />
            <SocialSignUpButton />
            <View style={styles.loginContainer}>
                    <Text style={[styles.loginText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Already have an account? </Text>
                    <TouchableOpacity onPress={onSignInPressed}>
                        <Text style={styles.loginButton}>Log In</Text>
                    </TouchableOpacity>
            </View>


        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root:{
        alignItems: 'center',
        backgroundColor:'#242427',
        padding: 20,
    },
    scrollview: {
        backgroundColor: '#242427',
    },
    logo: {
        margin:0,
        padding:0,
        width: '40%',
        maxHeight: 100,
        maxWidth: 200,
        marginBottom: 20,
    },
    mainTitle:{
        fontSize: 24,
        fontWeight: 'bold',
        color:'white',
        margin: 5,
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
        marginTop: 10,
    },
    loginText: {
        color: 'white',
        
    },
    loginButton: {
        color: '#fc5505',
        fontWeight: 'bold',
    },
    termsContainer: {
        flexDirection: 'row',
        marginTop: 0,
        marginBottom: 10,
    },
    termsText: {
        color: 'white',
        fontSize: 10,
    },
    termsButton: {
        color: '#fc5505',
        fontSize: 10,
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

export default SignupForm;