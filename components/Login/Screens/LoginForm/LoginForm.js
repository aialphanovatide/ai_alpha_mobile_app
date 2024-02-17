import React, {useState, useEffect, useContext} from 'react';
//var rnSecureStorage = require("rn-secure-storage");
//import secureLocalStorage from "react-secure-storage";
import rnSecureStorage from 'rn-secure-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Appearance,
} from 'react-native';
import Logo from '../../../../assets/images/account/logoWithText.png';
import CustomInput from '../../CustomInput/CustomInput';
import CustomPasswordInput from '../../CustomInput/CustomPasswordInput';
import CustomButton from '../../CustomButton/CustomButton';
import Separator from '../../CustomButton/Separator';
import SocialSignInButton from '../../SocialButtons/SocialSignInButton';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import auth0 from '../../auth0';
import Purchases from 'react-native-purchases';
import {useUser} from '../../../../context/UserContext';
import {useUserId} from '../../../../context/UserIdContext';
import jwtDecode from 'jwt-decode';
import {decode as base64decode} from 'base-64';
import {AppThemeContext} from '../../../../context/themeContext';
import useLoginFormStyles from './LoginFormStyles';
import {RevenueCatContext} from '../../../../context/RevenueCatContext';

const LoginForm = ({route}) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigation = useNavigation();
  const {setUserEmail} = useUser();
  const {setUserId} = useUserId();
  const [error, setError] = useState('');
  const colorScheme = Appearance.getColorScheme();
  const {toggleDarkMode} = useContext(AppThemeContext);
  const {userInfo, updateUserEmail} = useContext(RevenueCatContext);
  const styles = useLoginFormStyles();

  const formatUserId = user_id => {
    let separator = user_id.indexOf('|');
    let formatted_id = user_id.slice(separator + 1, user_id.length);
    return formatted_id;
  };

  useEffect(() => {
    if (colorScheme === 'dark') {
      toggleDarkMode();
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setUsername('');
      setPassword('');
      setError('');
    }, []),
  );

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const userEmail = await AsyncStorage.getItem('userEmail');
      const userId = await AsyncStorage.getItem('userId');

      if (userEmail) {
        updateUserEmail(userEmail);
      }

      if (accessToken && refreshToken) {
        const user_id = formatUserId(userId);
        setUserEmail(userEmail);
        setUserId(user_id);
        navigation.navigate('HomeScreen');
      } else {
        navigation.navigate('SignIn');
      }
    };

    checkToken();
  }, []);

  function decodeJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(base64decode(base64));
      return payload;
    } catch (error) {
      console.error('Failed to decode JWT:', error);
      return null;
    }
  }

  const onSignInPressed = async () => {
    try {
      console.log('jwtDecode:', jwtDecode);

      const credentials = await auth0.auth.passwordRealm({
        username: username,
        password: password,
        realm: 'Username-Password-Authentication',
        scope: 'openid profile email offline_access',
      });

      console.log('Logged in with Auth0:', credentials);

      if (credentials.idToken) {
        const decodedToken = decodeJwt(credentials.idToken);
        console.log('Decoded token: ', decodedToken);
        if (decodedToken) {
          const userId = decodedToken.sub;
          console.log('User ID:', userId);
          const formatted_id = formatUserId(userId);

          await AsyncStorage.setItem('accessToken', credentials.accessToken);
          await AsyncStorage.setItem('refreshToken', credentials.refreshToken);
          await AsyncStorage.setItem('userEmail', username);
          await AsyncStorage.setItem('userId', formatted_id);

          setUserEmail(username);
          setUserId(formatted_id);
          updateUserEmail(username);

          navigation.navigate('HomeScreen');
        }
      }
    } catch (error) {
      console.log('Failed to log in with Auth0:', error);
      setError('Email or Password are incorrect');
    }
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onTermsPressed = () => {
    navigation.navigate('TermsAndConditionsScreen');
  };

  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };

  const logout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.title}>Email</Text>
            {error ? <Text style={styles.errorLabel}>{error}</Text> : null}
          </View>
          <CustomInput
            placeholder=" "
            value={username}
            setValue={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.title}>Password</Text>
            {error ? <Text style={styles.errorLabel}>{error}</Text> : null}
          </View>
          <CustomPasswordInput
            placeholder=" "
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />
        </View>
        <CustomButton text="Sign In" onPress={onSignInPressed} type="PRIMARY" />
        <Separator />
        <SocialSignInButton />
        <CustomButton
          text="Forgot Password"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity onPress={onSignUpPressed}>
            <Text style={styles.signUpButton}>Sign Up for Free</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginForm;
