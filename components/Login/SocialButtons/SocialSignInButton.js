import React, {useEffect, useState} from 'react';
import {Platform, View, Linking} from 'react-native';
import CustomButton from '../CustomButton/CustomButton';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import axios from 'axios';
import {auth0Client, auth0Domain, auth0Audience, auth0GoogleAudience} from '../../../src/constants';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import auth0 from '../auth0';
import {useAuth0, Auth0Provider} from 'react-native-auth0';
import { authorize } from 'react-native-app-auth';
import {
  GOOGLE_CLIENT_IOS_ID,
  GOOGLE_CLIENT_WEB_ID,
} from '../../../src/constants';
import { useUser } from '../../../context/UserContext';
import { useUserId } from '../../../context/UserIdContext';


const SocialSignInButton = () => {
  const [loggedInUser, setloggedInUser] = useState(null);
  const navigation = useNavigation();
  const {authorize, clearSession, user, getCredentials, error, isLoading} = useAuth0();
  const {setUserEmail} = useUser();
  const {setUserId} = useUserId();
  
  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: GOOGLE_CLIENT_IOS_ID,
      webClientId: GOOGLE_CLIENT_WEB_ID,
    });
  }, []);


  const signInWithGoogle = async () => {
    try {
      await authorize({}, {});
      const credentials = await getCredentials();
      console.log("User is: ", user.email)
      console.log('AccessToken: ',credentials?.accessToken);
      navigation.navigate('HomeScreen')

    } catch (error) {
      console.error('Google Sign-In Error:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error during request setup:', error.message);
      }
      throw error;
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
        appleAuthRequestResponse.user,
      );
      const {fullName, email, authorizationCode, user} =
        appleAuthRequestResponse;
      console.log('User !Email:', email);
      if (credentialState === appleAuth.State.AUTHORIZED) {
        const {fullName, email, authorizationCode, user} =
          appleAuthRequestResponse;
        const {familyName, givenName} = fullName || {};
        console.log('User Data:', user);
        console.log('Full Name:', fullName);
        console.log('User Email:', user?.email);
        console.log('User2 Email:', email);
        const payload = {
          grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
          subject_token_type:
            'http://auth0.com/oauth/token-type/apple-authz-code',
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
        const auth0Response = await axios.post(
          `https://${auth0Domain}/oauth/token`,
          payload,
        );
        console.log('Auth0 Response:', auth0Response.data);
        navigation.navigate('HomeScreen');
        console.log('User3 Email:', auth0Response.email);
        console.log('After navigation');
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
    <Auth0Provider
      domain={'dev-zoejuo0jssw5jiid.us.auth0.com'}
      clientId={'K5bEigOfEtz4Devpc7kiZSYzzemPLIlg'}>
      <View>
        <CustomButton
          text="Sign In with Apple"
          onPress={() => signInWithApple()}
          type="APPLE"
          disabled={loggedInUser !== null}
        />
        <CustomButton
          text="Sign In with Google"
          onPress={() => signInWithGoogle()}
          type="GOOGLE"
          disabled={loggedInUser !== null}
        />
      </View>
    </Auth0Provider>
  );
};
export default SocialSignInButton;
