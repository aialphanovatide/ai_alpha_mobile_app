import React, {useEffect, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Platform} from 'react-native';
import CustomButton from '../CustomButton/CustomButton';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import axios from 'axios';
import {
  AUTH0_CLIENT_ENVVAR,
  AUTH0_DOMAIN_ENVVAR,
  AUTH0_AUDIENCE_ENVVAR,
  AIALPHASERVER_2_BASE_URL_ENVVAR,
  AIALPHA2KEY_ENVVAR,
  AUTH0_MANAGEMENT_API_CLIENT_ENVVAR,
  AUTH0_MANAGEMENT_API_SECRET_ENVVAR,
  GOOGLE_CLIENT_IOS_ID_ENVVAR,
  GOOGLE_CLIENT_WEB_ID_ENVVAR,
  GOOGLE_CLIENT_ANDROID_ID_ENVVAR,
} from '@env';
import {useNavigation} from '@react-navigation/native';
import Auth0, {useAuth0, Auth0Provider} from 'react-native-auth0';

import {RevenueCatContext} from '../../../context/RevenueCatContext';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useUser} from '../../../context/UserContext';
import {useUserId} from '../../../context/UserIdContext';
import {useRawUserId} from '../../../context/RawUserIdContext';
import {getServiceV2} from '../../../services/aiAlphaApi';

const SocialSignInButton = ({handleLoadingChange}) => {
  const [loggedInUser, setloggedInUser] = useState(null);
  const navigation = useNavigation();
  const {authorize} = useAuth0(); // Using useAuth0 hook
  const {userInfo, updateUserEmail} = useContext(RevenueCatContext);
  const {userEmail, setUserEmail} = useUser();
  const {userId, setUserId} = useUserId();
  const {rawUserId, setRawUserId} = useRawUserId();

  const auth0 = new Auth0({
    domain: 'dev-zoejuo0jssw5jiid.us.auth0.com',
    clientId: 'K5bEigOfEtz4Devpc7kiZSYzzemPLIlg',
  });

  const formatUserId = user_id => {
    let separator = user_id.indexOf('|');
    let formatted_id = user_id.slice(separator + 1, user_id.length);
    return formatted_id;
  };

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const userEmail = await AsyncStorage.getItem('userEmail');
      const rawUserId = await AsyncStorage.getItem('rawUserId');
      const userId = await AsyncStorage.getItem('userId');

      if (userEmail) {
        updateUserEmail(userEmail);
      }

      if (accessToken) {
        const user_id = formatUserId(userId);
        setUserEmail(userEmail);
        setRawUserId(rawUserId);
        setUserId(user_id);
        navigation.navigate('TabsMenu');
      } else {
        navigation.navigate('SignIn');
      }
    };

    checkToken();
  }, []);

  const getManagementApiToken = async () => {
    const response = await fetch(`https://${AUTH0_DOMAIN_ENVVAR}/oauth/token`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        client_id: AUTH0_MANAGEMENT_API_CLIENT_ENVVAR,
        client_secret: AUTH0_MANAGEMENT_API_SECRET_ENVVAR,
        audience: `https://${AUTH0_DOMAIN_ENVVAR}/api/v2/`,
        grant_type: 'client_credentials',
      }),
    });

    const data = await response.json();
    return data.access_token;
  };

  const verifyRegisteredUser = async user_id => {
    try {
      const response = await getServiceV2(`user?auth0id=${user_id}`);
      return response.data;
    } catch (error) {
      console.log('Error trying to fetch the user data:', error);
    }
  };

  const signInWithGoogle = async () => {
    GoogleSignin.configure({
      webClientId: GOOGLE_CLIENT_WEB_ID_ENVVAR,
      iosClientId: GOOGLE_CLIENT_IOS_ID_ENVVAR,
      androidClientId: GOOGLE_CLIENT_ANDROID_ID_ENVVAR,
      offlineAccess: true,
    });
    if (Platform.OS === 'android') {
      handleLoadingChange(true);
      // Handle Google Sign-In for Android using the Google Sign-In library
      try {
        const result = await GoogleSignin.hasPlayServices();

        const userInfo = await GoogleSignin.signIn();

        console.log('User Info from google sign in:', userInfo);

        const userEmail = userInfo.user.email;
        const userName = userInfo.user.name;
        const userPhoto = userInfo.user.photo;
        const userId = userInfo.user.id;

        const {idToken, user} = userInfo;

        await AsyncStorage.setItem('accessToken', idToken);
        await AsyncStorage.setItem('userEmail', user.email);
        await AsyncStorage.setItem('rawUserId', user.id);
        await AsyncStorage.setItem('userId', user.id);

        updateUserEmail(user.email);
        setUserEmail(user.email);
        setUserId(user.id);
        setRawUserId(user.id);

        navigation.navigate('TabsMenu');

        const isUserRegistered = await verifyRegisteredUser(userId);

        if (!isUserRegistered) {
          const response = await fetch(
            `${AIALPHASERVER_2_BASE_URL_ENVVAR}/user`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': `${AIALPHA2KEY_ENVVAR}`,
              },
              body: JSON.stringify({
                auth0id: userId,
                birth_date: null,
                email: userEmail,
                email_verified: 'false',
                full_name: userName,
                nickname: 'undefined',
                picture: userPhoto,
                provider: 'google-oauth2-android',
              }),
            },
          );
          const data = await response.json();
          console.log('- Successfull response from user registering:', data);
        }
      } catch (error) {
        console.error(
          'Error during Google sign-in with GoogleSignin library:',
          error,
        );
      } finally {
        handleLoadingChange(false);
      }
    } else {
      // Handle Google Sign-In for iOS
      try {
        const authResult = await auth0.webAuth.authorize({
          connection: 'google-oauth2',
          ephemeralSession: true,
        });

        console.log('Auth Result: ', authResult);

        const userProfile = await auth0.auth.userInfo({
          token: authResult.accessToken,
        });
        const userId = userProfile.sub;
        const formatted_id = formatUserId(userId);

        await AsyncStorage.setItem('accessToken', authResult.accessToken);
        await AsyncStorage.setItem('userEmail', userProfile.email);
        await AsyncStorage.setItem('rawUserId', userId);
        await AsyncStorage.setItem('userId', formatted_id);

        updateUserEmail(userProfile.email);
        setUserEmail(userProfile.email);
        setUserId(formatted_id);
        setRawUserId(userId);

        navigation.navigate('TabsMenu');

        const userData = await verifyRegisteredUser(userId);

        if (!userData || userData === null) {
          const response = await fetch(
            `${AIALPHASERVER_2_BASE_URL_ENVVAR}/user`,
            {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                auth0id: userId,
                email: userProfile.email,
                email_verified: userProfile.email_verified,
                nickname: userProfile.nickname,
                picture: userProfile.picture,
                provider: 'google-oauth2',
              }),
            },
          );
          const data = await response.json();
          console.log('- Successfully registered the user with google auth: ', data);
        } else {
          console.log('- User already registered, logged in with google auth:', userData);
        }
      } catch (error) {
        console.error('Error during Google sign-in with Auth0:', error);
      }
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
        const payload = {
          grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
          subject_token_type:
            'http://auth0.com/oauth/token-type/apple-authz-code',
          scope: 'read:appointments openid profile email email_verified',
          audience: AUTH0_AUDIENCE_ENVVAR,
          subject_token: authorizationCode,
          client_id: AUTH0_CLIENT_ENVVAR,
          user_profile: JSON.stringify({
            name: {
              firstName: givenName,
              lastName: familyName,
            },
            email,
          }),
        };
        const auth0Response = await axios.post(
          `https://${AUTH0_DOMAIN_ENVVAR}/oauth/token`,
          payload,
        );
        console.log('Auth0 Response:', auth0Response.data);
        console.log('Acess token:', auth0Response.data.access_token);
        console.log('User id is: ', user);
        let newUser = 'apple|' + user;
        console.log('New User id is: ', newUser);

        await AsyncStorage.setItem(
          'accessToken',
          auth0Response.data.access_token,
        );
        //await AsyncStorage.setItem('id_token', auth0Response.data.id_token);
        await AsyncStorage.setItem('rawUserId', newUser);
        await AsyncStorage.setItem('userId', user);

        navigation.navigate('TabsMenu');
        setUserId(user);
        setRawUserId(newUser);

        //console.log('auth0Response.data._id', auth0Response.data._id);

        const response = await fetch(
          `${AIALPHASERVER_2_BASE_URL_ENVVAR}/user`,
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              auth0id: newUser,
              email: 'Not specified',
              email_verified: 'false',
              full_name: 'undefined',
              nickname: 'Not specified',
              picture: 'Not specified',
              provider: 'apple',
            }),
          },
        );
        const data = await response.json();

        console.log('DATA SENT TO BACKEND', data);

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

  return (
    <Auth0Provider
      domain={'dev-zoejuo0jssw5jiid.us.auth0.com'}
      clientId={'K5bEigOfEtz4Devpc7kiZSYzzemPLIlg'}>
      <View>
        {Platform.OS === 'ios' && (
          <CustomButton
            text="Continue with Apple"
            onPress={() => signInWithApple()}
            type="APPLE"
            disabled={loggedInUser !== null}
          />
        )}

        <CustomButton
          text="Continue with Google"
          onPress={() => signInWithGoogle()}
          type="GOOGLE"
          disabled={loggedInUser !== null}
        />
      </View>
    </Auth0Provider>
  );
};

export default SocialSignInButton;
