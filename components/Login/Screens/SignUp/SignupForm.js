import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import Logo from '../../../../assets/images/account/logoWithText.png';
import CustomInput from '../../CustomInput/CustomInput';
import CustomPasswordInput from '../../CustomInput/CustomPasswordInput';
import CustomButton from '../../CustomButton/CustomButton';
import Separator from '../../CustomButton/Separator';
import SocialSignUpButton from '../../SocialButtons/SocialSignUpButton';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import useSignUpStyles from './SignUpStyles';
import { useUser } from '../../../../context/UserContext';
import { useUserId } from '../../../../context/UserIdContext';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [signupSuccessful, setSignupSuccessful] = useState(false);
  const [passwordStrengthMessages, setPasswordStrengthMessages] = useState({
    lowercase: false,
    uppercase: false,
    minLength: false,
    symbol: false,
  });
  const [emailValid, setEmailValid] = useState(false);
  const styles = useSignUpStyles();
  const navigation = useNavigation();
  const { userEmail, setUserEmail } = useUser();
  const { userId, setUserId } = useUserId();

  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailValid(validateEmail(value));
  };

  const validateForm = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!+?#%&¿¡@]).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const formIsValid =
      username &&
      email &&
      emailRegex.test(email) &&
      password &&
      passwordRepeat &&
      password === passwordRepeat &&
      passwordRegex.test(password);

    setIsFormValid(formIsValid);
  };

  useEffect(() => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!+?#%&¿¡@]).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const formIsValid =
      username &&
      email &&
      emailRegex.test(email) && // Check if the email is valid
      password &&
      passwordRepeat &&
      password === passwordRepeat &&
      passwordRegex.test(password);

    setIsFormValid(formIsValid);
  }, [username, email, password, passwordRepeat]);

  const updatePasswordStrength = (value) => {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const symbolRegex = /[!+?#%&¿¡@]/;
    const numberRegex = /\d/;

    const hasLowercase = lowercaseRegex.test(value);
    const hasUppercase = uppercaseRegex.test(value);
    const hasSymbol = symbolRegex.test(value);
    const hasMinLength = value.length >= 8;
    const hasNumber = numberRegex.test(value);

    setPasswordStrengthMessages({
      lowercase: hasLowercase,
      uppercase: hasUppercase,
      minLength: hasMinLength,
      symbol: hasSymbol,
      number: hasNumber,
    });
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    updatePasswordStrength(value);
  };

  const onSignInPressed = () => {
    navigation.navigate('SignIn');
  };

  const onTermsPressed = () => {
    navigation.navigate('TermsAndConditionsScreen');
  };

  const onRegisterPressed = async () => {
    try {
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

      setUserId(response.data._id);
      setUserEmail(email);
      setSignupSuccessful(true);
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.log('Signup error: ', error);
    }
  };

  return (
    <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Username</Text>
          <CustomInput
            placeholder=""
            value={username}
            setValue={setUsername}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Email</Text>
          <CustomInput
            placeholder=""
            value={email}
            setValue={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Password</Text>
          <CustomPasswordInput
            placeholder=""
            value={password}
            setValue={handlePasswordChange}
            secureTextEntry={true}
          />
          {password && (
            <View>
              <Text style={{ color: passwordStrengthMessages.lowercase ? 'green' : 'red' }}>
                ● Lower case letters (a-z)
              </Text>
              <Text style={{ color: passwordStrengthMessages.uppercase ? 'green' : 'red' }}>
                ● Upper case letters (A-Z)
              </Text>
              <Text style={{ color: passwordStrengthMessages.number ? 'green' : 'red' }}>
                ● Numbers (0-9)
              </Text>
              <Text style={{ color: passwordStrengthMessages.minLength ? 'green' : 'red' }}>
                ● At least 8 characters
              </Text>
              <Text style={{ color: passwordStrengthMessages.symbol ? 'green' : 'red' }}>
                ● Symbols (+ , ! , @ , - , *){'\n'}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Repeat Password</Text>
          <CustomPasswordInput
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
