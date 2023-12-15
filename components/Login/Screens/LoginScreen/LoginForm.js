import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import Logo from '../../../../assets/images/AIAlphalogonew.png';
import CustomInput from '../../CustomInput/CustomInput';
import CustomButton from '../../CustomButton/CustomButton';
import Separator from '../../CustomButton/Separator';
import SocialSignInButton from '../../SocialSignInButton';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import auth0 from '../../auth0.js';
import Purchases from 'react-native-purchases';

const LoginForm = ({ route }) => {
  const {height} = useWindowDimensions();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigation = useNavigation();
  const [error, setError] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setUsername('');
      setPassword('');
      setError('');
    }, [])
  );

  const onSignInPressed = async () => {
    try {
      const credentials = await auth0.auth.passwordRealm({
        username: username,
        password: password,
        realm: 'Username-Password-Authentication', 
      });
      console.log('Logged in with Auth0:', credentials);
      setError(''); 
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.log('Failed to log in with Auth0:', error);
      setError('Email or Password are incorrect');
    }
  };
  //const onGoogleSignInPressed

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollview}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
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
          <CustomInput
            placeholder=" "
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />
        </View>
        <CustomButton text="Sign In" onPress={onSignInPressed} />
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
            <Text style={styles.signUpButton}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: '#242427',
    padding: 20,
  },
  scrollview: {
    backgroundColor: '#242427',
  },
  logo: {
    marginTop: 10,
    marginBottom: 10,
    width: '50%',
    maxHeight: 120,
    maxWidth: 220,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  errorLabel: {
    color: 'red',
    fontSize: 12,
    marginLeft: 8, // Adjust the spacing as needed
  },
  inputContainer: {
    alignSelf: 'stretch',
    marginBottom: 10,
  },
  title: {
    color: '#b8bbbd',
    textAlign: 'left',
    marginLeft: 0,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  signUpText: {
    color: 'white',
  },
  signUpButton: {
    color: '#fc5505',
    fontWeight: 'bold',
  },
});

export default LoginForm;
