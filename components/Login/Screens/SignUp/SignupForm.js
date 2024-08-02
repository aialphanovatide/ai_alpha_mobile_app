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
import GreenTick from '../../../../assets/images/greenTick.png';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import useSignUpStyles from './SignUpStyles';
import { useRawUserId } from '../../../../context/RawUserIdContext';
import { useUser } from '../../../../context/UserContext';
import { useUserId } from '../../../../context/UserIdContext';
import { auth0Domain, auth0ManagementAPI_Client, auth0ManagementAPI_Secret } from '../../../../src/constants';
import BackButton from '../../../Analysis/BackButton/BackButton';


const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {rawUserId, setRawUserId} = useRawUserId();
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
  const [emailInUse, setEmailInUse] = useState(false);


  
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
      email &&
      emailRegex.test(email) &&
      password &&
      passwordRepeat &&
      password === passwordRepeat &&
      passwordRegex.test(password);

    setIsFormValid(formIsValid);
  }, [email, password, passwordRepeat]);

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

  const getManagementApiToken = async () => {
    const response = await fetch(`https://${auth0Domain}/oauth/token`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        client_id: auth0ManagementAPI_Client,
        client_secret: auth0ManagementAPI_Secret,
        audience: `https://${auth0Domain}/api/v2/`,
        grant_type: 'client_credentials',
      }),
    });
    const data = await response.json();
    return data.access_token;
  };

  const onRegisterPressed = async () => {
    try {
      const token = await getManagementApiToken();

      const emailCheckResponse = await axios.get(
        `https://${auth0Domain}/api/v2/users-by-email`,
        {
          params: {
            email: email,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("emailcheckresponse: ", emailCheckResponse);
      let isUsernamePasswordAuthenticationUser = false;

      if (emailCheckResponse.data.length > 0) {

        const identities = emailCheckResponse.data[0].identities;

        identities.forEach(identity => {
        if (identity.connection === 'Username-Password-Authentication') {
          isUsernamePasswordAuthenticationUser = true;
        }
          });

        if (isUsernamePasswordAuthenticationUser) {
          setEmailInUse(true);
        }

      } 
      if (isUsernamePasswordAuthenticationUser == false){
        console.log("entered here!!!")
        const response = await axios.post(
          'https://dev-zoejuo0jssw5jiid.us.auth0.com/dbconnections/signup',
          {
            client_id: 'K5bEigOfEtz4Devpc7kiZSYzzemPLIlg',
            email: email,
            password: password,
            connection: 'Username-Password-Authentication',
          },
        );
        console.log("here!!!")
        setUserId(response.data._id);
        setUserEmail(email);
        setSignupSuccessful(true);
  
        setTimeout(() => {
          navigation.navigate('SignIn');
        }, 2000);
      }

      const secondEmailCheckResponse = await axios.get(
        `https://${auth0Domain}/api/v2/users-by-email`,
        {
          params: {
            email: email,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("secondEmailCheckResponse: ", secondEmailCheckResponse);
      console.log("User ID: ", secondEmailCheckResponse.data[0].user_id);
      console.log("nickname: ", secondEmailCheckResponse.data[0].nickname);
      console.log("picture: ", secondEmailCheckResponse.data[0].picture);
      console.log("provider: ", secondEmailCheckResponse.data[0].identities[0].provider);
      const response = await fetch(`https://aialpha.ngrok.io/register`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            auth0id: secondEmailCheckResponse.data[0].user_id,
            email: email,
            email_verified: false,
            nickname: secondEmailCheckResponse.data[0].nickname,
            picture: secondEmailCheckResponse.data[0].picture,
            provider: "Username-Password-Authentication",
          }),
        });
        const data = await response.json();

        console.log("DATA SENT TO BACKEND",data);

    } catch (error) {
      console.log('Signup error: ', error);
    }
  };
  if (signupSuccessful) {
    return (
      <View style={styles.successContainer}>
        <Image source={GreenTick} style={styles.tickImage} />
        <Text style={styles.successText}>User Created</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>
      <BackButton />
      <View style={styles.root}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
        <View style={styles.inputContainer}>
        <View style={styles.labelContainer}>
            <Text style={styles.title}>Email</Text>
            {emailInUse && (
          <Text style={styles.errorLabel}>Email already in use</Text>
          )}
          </View>
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
        {/*
        <Separator />
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={onSignInPressed}>
            <Text style={styles.loginButton}>Log In</Text>
          </TouchableOpacity>
        </View>
        */}

      </View>
    </ScrollView>
  );
};

export default SignupForm;