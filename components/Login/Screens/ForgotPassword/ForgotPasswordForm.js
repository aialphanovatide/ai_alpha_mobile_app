import React, {useState, useContext, useEffect} from 'react';
import {View, Image, ScrollView, Text, TouchableOpacity} from 'react-native';
import CustomButton from '../../CustomButton/CustomButton';
import CustomInput from '../../CustomInput/CustomInput';
import {useNavigation} from '@react-navigation/core';
import GreenTick from '../../../../assets/images/greenTick.png';
import EmailSent from '../../../../assets/images/login/emailSent.png';
import auth0 from '../../auth0.js';
import useForgotPasswordStyles from './ForgotPasswordStyles';
import BackButton from '../../../Analysis/BackButton/BackButton';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../../../context/themeContext';
import eventEmitter from '../../../../eventEmitter';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState();
  const navigation = useNavigation();
  const [resetPasswordSuccesful, setresetPasswordSuccesful] = useState(false);
  const styles = useForgotPasswordStyles();
  const {isDarkMode} = useContext(AppThemeContext);
  const {theme} = useContext(AppThemeContext);

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

    const originalColor = isDarkMode ? '#0b0b0a' : '#fbfbfa';

    // Update the SafeAreaView for SignUp animation should go here
    eventEmitter.emit('backgroundColorChange', '#FFB76E');
    console.log('ISDARKMODE: ', isDarkMode);

    setTimeout(() => {
      eventEmitter.emit('backgroundColorChange', originalColor);
      navigation.navigate('SignIn');
    }, 2000);
  };

  if (resetPasswordSuccesful) {
    return (
      <LinearGradient
        colors={['#FFB76E', '#FC5404']}
        start={{x: 0.8, y: -0.19}}
        end={{x: 0.88, y: 0.99}}
        style={styles.successContainer}>
        <Image source={EmailSent} style={styles.tickImage} />
        <Text style={styles.successText}>Email Sent</Text>
        <Text style={styles.successSubTextBold}>
          Please redirect to your email inbox
        </Text>
        <Text style={styles.successSubText}>
          to complete the password update.
        </Text>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <BackButton />
      <View style={styles.root}>
        <Text style={styles.mainTitle}>Reset Password</Text>
        <View style={styles.inputContainer}>
          <CustomInput placeholder="Email" value={email} setValue={setEmail} />
        </View>
        <CustomButton text="Send Email" onPress={onForgotPasswordPressed} />
        <View style={styles.smallTextContainer}>
          <Text style={styles.greyText}>
            Click the link sent to your email, and you will be directed to a new
            page to reset your password.
          </Text>
          <Text style={styles.greyText}>
            You will then need to reopen the app to log in with your new
            password.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordForm;
