import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  Appearance,
  ScrollView,
  Text,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Logo from '../../../../assets/images/AIAlphalogonew.png';
import CustomInput from '../../CustomInput/CustomInput';
import CustomButton from '../../CustomButton/CustomButton';
import Separator from '../../CustomButton/Separator';
import SocialSignUpButton from '../../SocialButtons/SocialSignUpButton';
import {useNavigation} from '@react-navigation/core';
import axios from 'axios';
import {API_KEY, ANDROID_API_KEY} from '@env';
import Purchases from 'react-native-purchases';
import {ENTITLEMENT_ID} from '../../../../src/constants';
import {useUser} from '../../../../context/UserContext';
import useSignUpStyles from './SignUpStyles';

const onTermsPressed = () => {
  const url = 'https://aialpha.ai/termsofservice';

  Linking.canOpenURL(url)
    .then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.warn("Don't know how to open URI: " + url);
      }
    })
    .catch(err => console.error('An error occurred', err));
};

const SignupForm = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordRepeat, setPasswordRepeat] = useState();
  const navigation = useNavigation();
  const [isFormValid, setIsFormValid] = useState(false);
  const {setUserEmail} = useUser();
  const [signupSuccessful, setSignupSuccessful] = useState(false);
  const styles = useSignUpStyles();

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
    const formIsValid =
      username && email && password && password === passwordRepeat;
    setIsFormValid(formIsValid);
  }, [username, email, password, passwordRepeat]);

  const onSignInPressed = () => {
    navigation.navigate('SignIn');
  };
  const onRegisterPressed = async () => {
console.log('Here!');
    const purchaserInfo = await Purchases.getCustomerInfo();
    console.log('After Here!');
    if (
      typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined'
    ) {
      console.log('Passed');
    } else {
      console.log('not passed');
      navigation.navigate('PaywallScreen');
    }

    try {
      console.log('Before Signup');
      const response = await axios.post(
        'https://dev-zoejuo0jssw5jiid.us.auth0.com/dbconnections/signup',
        {
          client_id: 'K5bEigOfEtz4Devpc7kiZSYzzemPLIlg',
          email: email,
          password: password,
          connection: 'Username-Password-Authentication',
          user_metadata: {
            username: username,
          },
        },
      );

      console.log('Signup successful', response.data);
      setUserEmail(email);
      setSignupSuccessful(true);
    } catch (error) {
      console.log('Signup error: ', error);
      // if (error.response) {
      //   console.error('Signup error', error.response.data);
      //   alert(
      //     'Signup failed: ' + error.response.data.error_description ||
      //       error.response.data.message,
      //   );
      // } else if (error.request) {
      //   console.error('Signup error', error.request);
      //   alert('No response received.');
      // } else {
      //   console.error('Error', error.message);
      //   alert('Error: ' + error.message);
      // }
    }
    navigation.navigate('HomeScreen');
  };

  return (
    <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Username</Text>
          <CustomInput placeholder="" value={username} setValue={setUsername} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Email</Text>
          <CustomInput placeholder="" value={email} setValue={setEmail} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Password</Text>
          <CustomInput
            placeholder=""
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Repeat Password</Text>
          <CustomInput
            placeholder=""
            value={passwordRepeat}
            setValue={setPasswordRepeat}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>By registering you agree to our </Text>
          <TouchableOpacity onPress={onTermsPressed}>
            <Text style={styles.termsButton}>Terms and Conditions</Text>
          </TouchableOpacity>
        </View>
        <CustomButton
          text="Register"
          onPress={onRegisterPressed}
          disabled={!isFormValid}
        />
        <Separator />
        {/* <SocialSignUpButton /> */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={onSignInPressed}>
            <Text style={styles.loginButton}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupForm;
