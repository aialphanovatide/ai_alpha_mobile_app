import React, {useState} from 'react';
import {View, Image, ScrollView, Text, TouchableOpacity} from 'react-native';
import CustomButton from '../../CustomButton/CustomButton';
import CustomInput from '../../CustomInput/CustomInput';
import {useNavigation} from '@react-navigation/core';
import GreenTick from '../../../../assets/images/greenTick.png';
import auth0 from '../../auth0.js';
import useForgotPasswordStyles from './ForgotPasswordStyles';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState();
  const navigation = useNavigation();
  const [resetPasswordSuccesful, setresetPasswordSuccesful] = useState(false);
  const styles = useForgotPasswordStyles();

  const onSignInPressed = () => {
    navigation.navigate('SignIn');
  };
  const onForgotPasswordPressed = async () => {
    if (email) {
      try {
        await auth0.auth.resetPassword({
          email: email,
          connection: 'Username-Password-Authentication',
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
    }
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
          <CustomInput placeholder="" value={email} setValue={setEmail} />
        </View>
        <CustomButton text="Send" onPress={onForgotPasswordPressed} />
        <View style={styles.loginContainer}>
          <TouchableOpacity onPress={onSignInPressed}>
            <Text style={styles.loginButton}>Back to Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordForm;
