import React, {useEffect, useState} from 'react';
import CustomButton from '../CustomButton';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import auth0 from '../auth0';
import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_IOS_ID} from '@env';

const SocialSignInButton = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_CLIENT_ID,
      iosClientId: GOOGLE_CLIENT_IOS_ID
    });
  }, []);
  const navigation = useNavigation();
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);

      // Exchange the token with Auth0
      const auth0Response = await auth0.auth.exchange({
        subject_token: userInfo.idToken,
        subject_token_type: 'http://auth0.com/oauth/token-type/google-oauth2',
        audience: '647f91b8c76e73342e725c9a', // Replace with your Auth0 audience
        scope: 'openid profile email', // Adjust scope as needed
      });

      console.log('Auth0 Token:', auth0Response.accessToken);
      // Now you can navigate to the home screen or store the Auth0 token as needed
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Authentication error:', error);
      // Handle errors here
    }
  };

  const isSignedIn = async () => {
    const isSigned = await GoogleSignin.isSignedIn();
    if (isSigned) {
      console.log('Signed In correctly');
      navigation.navigate('HomeScreen');
    } else {
      console.error('Fail to sign in');
    }
  };

  const onSignInFacebook = () => {
    console.warn('Facebook');
  };
  return (
    <>
      <CustomButton
        text="Sign Up with Google"
        onPress={() => signInWithGoogle()}
        type="GOOGLE"
        disabled={user !== null}
      />
      <CustomButton
        text="Sign Up with Facebook"
        onPress={onSignInFacebook}
        type="FACEBOOK"
      />
    </>
  );
};

export default SocialSignInButton;
