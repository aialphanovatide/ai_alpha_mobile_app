import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, useWindowDimensions, ScrollView, Text, TouchableOpacity } from 'react-native';
import CustomButton from '../CustomButton';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';


const SocialSignInButton = () => {
    const signInWithGoogle = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log('User Info --> ', userInfo);
          // Here you would use the userInfo to authenticate with your backend server or Auth0
    
          // If sign in is successful, you can navigate to the home screen or do other actions
          navigation.navigate('HomeScreen');
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.warn('User cancelled the login flow');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.warn('Operation (e.g. sign in) is in progress already');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.warn('Play services not available or outdated');
          } else {
            // some other error happened
            console.error('Some other error happened', error);
          }
        }
      };
    const onSignInFacebook =()=> {
        console.warn("Facebook")
    }
    return (
        <>
            <CustomButton text="Sign Up with Google" onPress={signInWithGoogle} type="GOOGLE"/>
            <CustomButton text="Sign Up with Facebook" onPress={onSignInFacebook} type="FACEBOOK"/>
        </>
    );
};


export default SocialSignInButton;
