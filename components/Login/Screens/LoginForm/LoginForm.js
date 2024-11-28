import React, {useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Logo from '../../../../assets/images/account/logoWithText.png';
import CustomInput from '../../CustomInput/CustomInput';
import CustomPasswordInput from '../../CustomInput/CustomPasswordInput';
import CustomButton from '../../CustomButton/CustomButton';
import SocialSignInButton from '../../SocialButtons/SocialSignInButton';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import auth0 from '../../auth0';
import {decode as base64decode} from 'base-64';
import useLoginFormStyles from './LoginFormStyles';
import {RevenueCatContext} from '../../../../context/RevenueCatContext';
import BackgroundGradient from '../../../BackgroundGradient/BackgroundGradient';
import {useDispatch} from 'react-redux';
import {
  updateEmail,
  updateRawUserId,
  updateUserId,
} from '../../../../store/userDataSlice';
import {AppThemeContext} from '../../../../context/themeContext';

const LoginForm = ({route}) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const {userInfo, updateUserEmail} = useContext(RevenueCatContext);
  const [loading, setLoading] = useState(false);
  const styles = useLoginFormStyles();
  const dispatch = useDispatch();
  const {theme} = useContext(AppThemeContext);

  const handleLoadingChange = value => {
    setLoading(value);
  };

  const formatUserId = user_id => {
    let separator = user_id.indexOf('|');
    let formatted_id = user_id.slice(separator + 1, user_id.length);
    return formatted_id;
  };

  useFocusEffect(
    React.useCallback(() => {
      setUsername('');
      setPassword('');
      setError('');
    }, []),
  );

  useEffect(() => {
    const checkToken = async () => {
      const shouldGoToIntroduction = await AsyncStorage.getItem(
        'hasIntroduced',
      );
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const userId = await AsyncStorage.getItem('userId');
      const userEmail = await AsyncStorage.getItem('userEmail');
      const rawUserId = await AsyncStorage.getItem('rawUserId');

      if (shouldGoToIntroduction === null) {
        navigation.navigate('IntroductoryScreen');
        await AsyncStorage.setItem('hasIntroduced', 'false');
      } else {
        if (accessToken && refreshToken) {
          navigation.navigate(
            'TabsMenu',
            route.params && route.params !== undefined
              ? route.params.shouldShowPopUps
              : null,
          );
          const user_id = formatUserId(userId);
          dispatch(updateRawUserId(rawUserId));
          dispatch(updateEmail(userEmail));
          dispatch(updateUserId(user_id));
        } else {
          navigation.navigate('SignIn');
        }

        const loginMethod = await AsyncStorage.getItem('loginMethod');
        if (loginMethod !== 'username-password') {
          // User didn't log in using username-password last time
          return;
        }

        if (userEmail) {
          updateUserEmail(userEmail);
        }
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
      // console.log('jwtDecode:', jwtDecode);

      const credentials = await auth0.auth.passwordRealm({
        username: username,
        password: password,
        realm: 'Username-Password-Authentication',
        scope: 'openid profile email offline_access',
      });

      console.log('- Logged in successfully with Auth0:', credentials);

      if (credentials.idToken) {
        const decodedToken = decodeJwt(credentials.idToken);
        console.log('Decoded token: ', decodedToken);
        if (decodedToken) {
          const userId = decodedToken.sub;
          // console.log('User ID:', userId);
          const formatted_id = formatUserId(userId);

          await AsyncStorage.setItem('accessToken', credentials.accessToken);
          await AsyncStorage.setItem('refreshToken', credentials.refreshToken);
          await AsyncStorage.setItem('userEmail', username);
          await AsyncStorage.setItem('userId', formatted_id);
          await AsyncStorage.setItem('rawUserId', userId);
          await AsyncStorage.setItem('loginMethod', 'username-password');

          updateUserEmail(username);
          dispatch(updateRawUserId(userId));
          dispatch(updateEmail(username));
          dispatch(updateUserId(formatted_id));

          navigation.navigate('TabsMenu');
        }
      }
    } catch (error) {
      console.error('Failed to log in with Auth0:', error);
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
    <SafeAreaView style={styles.background}>
      <BackgroundGradient />
      <ScrollView
        style={styles.scrollview}
        showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Image source={Logo} style={styles.logo} resizeMode="contain" />
          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              {error ? <Text style={styles.errorLabel}>{error}</Text> : null}
            </View>
            <CustomInput
              placeholder="Email"
              value={username}
              setValue={setUsername}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              {error ? <Text style={styles.errorLabel}>{error}</Text> : null}
            </View>
            <CustomPasswordInput
              placeholder="Password"
              value={password}
              setValue={setPassword}
              secureTextEntry={true}
            />
          </View>
          <CustomButton
            text="Sign In"
            onPress={onSignInPressed}
            type="PRIMARY"
          />
          <SocialSignInButton handleLoadingChange={handleLoadingChange} />
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
      <Modal
        transparent={true}
        animationType="fade"
        visible={loading}
        onRequestClose={() => {}}>
        <View style={styles.modalBackground}>
          <ActivityIndicator size="large" color={theme.loaderColor} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LoginForm;
