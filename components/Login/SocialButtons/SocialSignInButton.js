import React, {useEffect, useState} from 'react';
import CustomButton from '../CustomButton/CustomButton';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import auth0 from '../auth0';
import {
  GOOGLE_CLIENT_IOS_ID,
  GOOGLE_CLIENT_WEB_ID,
} from '../../../src/constants';

const SocialSignInButton = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: GOOGLE_CLIENT_IOS_ID,
      webClientId: GOOGLE_CLIENT_WEB_ID,
    });
  }, []);
  const navigation = useNavigation();
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      /*
      // Exchange the token with Auth0
      const auth0Response = await auth0.auth.exchangeNativeSocial({
        subjectToken: userInfo.idToken,
        subjectTokenType: 'http://auth0.com/oauth/token-type/google-oauth2',
        audience: '647f91b8c76e73342e725c9a',
        scope: 'openid profile email',
      });

      console.log('Auth0 Token:', auth0Response.accessToken);
      */
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Authentication error:', error);
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

  return (
    <CustomButton
      text="Sign In with Google"
      onPress={() => signInWithGoogle()}
      type="GOOGLE"
      disabled={user !== null}
    />
  );
};

export default SocialSignInButton;
