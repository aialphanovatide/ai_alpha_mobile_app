import React, {useState, useEffect, useContext} from 'react';
import {View, Image, ScrollView, Text, TouchableOpacity} from 'react-native';
import Logo from '../../../../assets/images/account/logoWithText.png';
import CustomInput from '../../CustomInput/CustomInput';
import CustomPasswordInput from '../../CustomInput/CustomPasswordInput';
import CustomButton from '../../CustomButton/CustomButton';
import GreenTick from '../../../../assets/images/greenTick2.png';
import {useNavigation} from '@react-navigation/core';
import axios from 'axios';
import useSignUpStyles from './SignUpStyles';
import {
  auth0Domain,
  auth0ManagementAPI_Client,
  auth0ManagementAPI_Secret,
} from '../../../../src/constants';
import LinearGradient from 'react-native-linear-gradient';
import eventEmitter from '../../../../eventEmitter';
import {AppThemeContext} from '../../../../context/themeContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { updateEmail, updateUserId } from '../../../../store/userDataSlice';

// Component to render the sign up form. It contains the fields for the user to input their full name, email, password and repeat password. It also contains the buttons to sign up, go back to the login screen and see the terms and conditions. The logic to validate the form and send the data to the backend is also implemented here.

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [fullname, setFullname] = useState('');
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
  const [emailInUse, setEmailInUse] = useState(false);
  const {isDarkMode} = useContext(AppThemeContext);
  const {theme} = useContext(AppThemeContext);
  const dispatch = useDispatch();

  // useEffect to validate the form. It checks that the email is valid, the password is at least 8 characters long, has at least one lowercase letter, one uppercase letter, one number and one symbol. It also checks that the password and repeat password fields match.

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

  const updatePasswordStrength = value => {
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

  // Function to handle the password change. It updates the password state and calls the updatePasswordStrength function to check the password strength.

  const handlePasswordChange = value => {
    setPassword(value);
    updatePasswordStrength(value);
  };

  // Functions to navigate to the login screen

  const onLoginPressed = () => {
    navigation.navigate('SignIn');
  };

  // Function to navigate to the terms and conditions screen.

  const onTermsPressed = () => {
    navigation.navigate('TermsAndConditionsScreen');
  };

  // Function to get the data from the Auth0 Management API. It is used to get the token to send the user data to the Auth0 database.

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

  // Function to send the user's full name to the Auth0 database. It uses the token obtained from the getManagementApiToken function.

  const sendFullnameToMetadata = async (fullname, newRawUserId) => {
    const token = await getManagementApiToken();
    const userMetadata = {
      fullname: fullname,
    };

    const response = await fetch(
      `https://${auth0Domain}/api/v2/users/${encodeURIComponent(newRawUserId)}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({user_metadata: userMetadata}),
      },
    );

    if (response.ok) {
      const data = await response.json();
    } else {
      console.error(
        'Failed to update user:',
        response.status,
        response.statusText,
      );
    }
  };

  // Function to send the user data to the backend. It sends the user's email, full name, picture, nickname and provider to the backend. It's used when the register button is pressed.

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
      if (isUsernamePasswordAuthenticationUser == false) {
        const response = await axios.post(
          'https://dev-zoejuo0jssw5jiid.us.auth0.com/dbconnections/signup',
          {
            client_id: 'K5bEigOfEtz4Devpc7kiZSYzzemPLIlg',
            email: email,
            password: password,
            connection: 'Username-Password-Authentication',
          },
        );
        dispatch(updateUserId(response.data._id));
        dispatch(updateEmail(email));
        setSignupSuccessful(true);

        const originalColor = isDarkMode ? '#0b0b0a' : '#fbfbfa';

        eventEmitter.emit('backgroundColorChange', '#FFB76E');

        setTimeout(() => {
          eventEmitter.emit('backgroundColorChange', originalColor);
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

      await sendFullnameToMetadata(
        fullname,
        secondEmailCheckResponse.data[0].user_id,
      );

      const response = await fetch(`https://aialpha.ngrok.io/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          auth0id: secondEmailCheckResponse.data[0].user_id,
          email: email,
          email_verified: false,
          full_name: fullname,
          nickname: secondEmailCheckResponse.data[0].nickname,
          picture: secondEmailCheckResponse.data[0].picture,
          provider: 'Username-Password-Authentication',
        }),
      });
      const data = await response.json();

    } catch (error) {
      console.error('Signup error: ', error);
    }
  };
  if (signupSuccessful) {
    return (
      <LinearGradient
        colors={['#FFB76E', '#FC5404']}
        start={{x: 0.8, y: -0.19}}
        end={{x: 0.88, y: 0.99}}
        style={styles.successContainer}>
        <Image source={GreenTick} style={styles.tickImage} />
        <Text style={styles.successText}>User created</Text>
      </LinearGradient>
    );
  }
  return (
    <KeyboardAwareScrollView
      style={{flex: 1, backgroundColor: theme.mainBackgroundColor}}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled">
      <ScrollView
        style={styles.scrollview}
        showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Image source={Logo} style={styles.logo} resizeMode="contain" />
          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}></View>
            <CustomInput
              placeholder="Full Name"
              value={fullname}
              setValue={setFullname}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              {emailInUse && (
                <Text style={styles.errorLabel}>Email already in use</Text>
              )}
            </View>
            <CustomInput
              placeholder="Email"
              value={email}
              setValue={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomPasswordInput
              placeholder="Password"
              value={password}
              setValue={handlePasswordChange}
              secureTextEntry={true}
            />
            {password && (
              <View style={{marginTop: 10, marginBottom: -10}}>
                <Text
                  style={{
                    color: passwordStrengthMessages.lowercase ? 'green' : 'red',
                  }}>
                  ● Lower case letters (a-z)
                </Text>
                <Text
                  style={{
                    color: passwordStrengthMessages.uppercase ? 'green' : 'red',
                  }}>
                  ● Upper case letters (A-Z)
                </Text>
                <Text
                  style={{
                    color: passwordStrengthMessages.number ? 'green' : 'red',
                  }}>
                  ● Numbers (0-9)
                </Text>
                <Text
                  style={{
                    color: passwordStrengthMessages.minLength ? 'green' : 'red',
                  }}>
                  ● At least 8 characters
                </Text>
                <Text
                  style={{
                    color: passwordStrengthMessages.symbol ? 'green' : 'red',
                  }}>
                  ● Symbols (+ , ! , @ , - , *){'\n'}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.inputContainer}>
            <CustomPasswordInput
              placeholder="Repeat Password"
              value={passwordRepeat}
              setValue={setPasswordRepeat}
              secureTextEntry={true}
            />
          </View>
          <CustomButton
            text="Sign Up"
            onPress={onRegisterPressed}
            disabled={!isFormValid}
          />
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={onLoginPressed}>
              <Text style={styles.loginButton}>Sign In</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By registering you agree to our{' '}
            </Text>
            <TouchableOpacity onPress={onTermsPressed}>
              <Text style={styles.termsButton}>Terms and Conditions</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default SignupForm;
