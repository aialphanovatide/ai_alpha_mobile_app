import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import CustomButton from '../CustomButton/CustomButton';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import axios from 'axios';
import { auth0Client, auth0Domain, auth0Audience } from '../../../src/constants';
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
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: GOOGLE_CLIENT_IOS_ID,
      webClientId: GOOGLE_CLIENT_WEB_ID,
    });
  }, []);
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

  const signInWithApple = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        nonceEnabled: false,
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
      console.log('Apple Auth Response:', appleAuthRequestResponse);

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user
      );
      
      const { fullName, email, authorizationCode, user } = appleAuthRequestResponse;
      console.log('User !Email:', email);

      if (credentialState === appleAuth.State.AUTHORIZED) {
        const { fullName,email, authorizationCode, user } = appleAuthRequestResponse;
        const { familyName, givenName } = fullName || {};
        console.log('User Data:', user);
        console.log('Full Name:', fullName);
        console.log('User Email:', user?.email);
        console.log('User2 Email:', email);

        const payload = {
          grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
          subject_token_type: 'http://auth0.com/oauth/token-type/apple-authz-code',
          scope: 'read:appointments openid profile email email_verified',
          audience: auth0Audience,
          subject_token: authorizationCode,
          client_id: auth0Client,
          user_profile: JSON.stringify({
            name: {
              firstName: givenName,
              lastName: familyName,
            },
            email,
          }),
        };
  
        console.log('Auth0 Request Payload:', payload);
  
        const auth0Response = await axios.post(`https://${auth0Domain}/oauth/token`, payload);
  
        console.log('Auth0 Response:', auth0Response.data);
        navigation.navigate('HomeScreen');
        console.log('User3 Email:', auth0Response.email);
        console.log("After navigation")

        return {
          message: 'success',
          ...auth0Response.data,
          first_name: givenName,
          last_name: familyName,
        };
      } else {
        throw new Error('Apple Sign-In not authorized');
      }
    } catch (error) {
      console.error('Apple Sign-In Error:', error);
      throw error;
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
    <View>
      <CustomButton
        text="Sign In with Google"
        onPress={() => signInWithGoogle()}
        type="GOOGLE"
        disabled={user !== null}
      />
      <CustomButton
        text="Sign In with Apple"
        onPress={() => signInWithApple()}
        type="APPLE"
        disabled={user !== null}
      />
    </View>
  );
};

export default SocialSignInButton;