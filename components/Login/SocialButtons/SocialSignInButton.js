import React, {useEffect, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Platform} from 'react-native';
import CustomButton from '../CustomButton/CustomButton';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import axios from 'axios';
import {
  auth0Client,
  auth0Domain,
  auth0Audience,
  auth0GoogleAudience,
  auth0ClonedGoogleAudience,
  auth0ClonedGoogleClient,
  auth0ClonedDomain,
  auth0ManagementAPI_Client,
  auth0ManagementAPI_Secret,
} from '../../../src/constants';
import {useNavigation} from '@react-navigation/native';
import Auth0, {useAuth0, Auth0Provider} from 'react-native-auth0';
import {authorize, refresh} from 'react-native-app-auth';
import {
  GOOGLE_CLIENT_IOS_ID,
  GOOGLE_CLIENT_WEB_ID,
  GOOGLE_CLIENT_ANDROID_ID,
} from '../../../src/constants';

import {useUser} from '../../../context/UserContext';
import {useUserId} from '../../../context/UserIdContext';
import {useRawUserId} from '../../../context/RawUserIdContext';

import {RevenueCatContext} from '../../../context/RevenueCatContext';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

const SocialSignInButton = () => {
  const [loggedInUser, setloggedInUser] = useState(null);
  const navigation = useNavigation();
  const {authorize} = useAuth0(); // Using useAuth0 hook
  const {userEmail, setUserEmail} = useUser();
  const {userId, setUserId} = useUserId();
  const {rawUserId, setRawUserId} = useRawUserId();
  const {userInfo, updateUserEmail} = useContext(RevenueCatContext);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_CLIENT_WEB_ID,
      iosClientId: GOOGLE_CLIENT_IOS_ID,
      androidClientId: GOOGLE_CLIENT_ANDROID_ID,
      offlineAccess: true,
    });
  }, []);

  const auth0 = new Auth0({
    domain: auth0Domain,
    clientId: auth0Client,
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
        navigation.navigate('HomeScreen');
      } else {
        navigation.navigate('SignIn');
      }
    };

    checkToken();
  }, []);


  const getManagementApiToken = async () => {
    const response = await fetch(`https://${auth0Domain}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

  const signInWithGoogle = async () => {
    if (Platform.OS === 'android') {
      // Handle Google Sign-In for Android using the Google Sign-In library
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log('User Info: ', userInfo);
        const userEmail = userInfo.user.email;
        console.log("User Email: ", userEmail);
        const userName = userInfo.user.name;
        console.log("User Name: ", userName);
        const userPhoto = userInfo.user.photo;
        console.log("User Photo: ", userPhoto);
        const userId = userInfo.user.id;
        console.log("User Id: ", userId);

        /*
        const token = await getManagementApiToken();

        const responseFromAuth0 = await fetch(`https://${auth0Domain}/api/v2/users`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              email: userEmail,
              email_verified: false,
              name: userName,
              picture: userPhoto,
              "user_id": "string",
              connection: "google-oauth2-android",
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const dataFromAuth0 = await responseFromAuth0.json();
        */
        const {idToken, user} = userInfo;
        await AsyncStorage.setItem('accessToken', idToken);
        await AsyncStorage.setItem('userEmail', user.email);
        await AsyncStorage.setItem('rawUserId', user.id);
        await AsyncStorage.setItem('userId', user.id);

        setUserEmail(user.email);
        setUserId(user.id);
        setRawUserId(user.id);
        updateUserEmail(user.email);

        navigation.navigate('HomeScreen');


        const response = await fetch(`https://aialpha.ngrok.io/register`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            auth0id: userId,
            email: userEmail,
            email_verified: 'false',
            full_name: userName,
            nickname: "undefined",
            picture: userPhoto,
            provider: 'google-oauth2-android',
          }),
        });
        const data = await response.json();

        console.log('DATA SENT TO BACKEND', data);

      } catch (error) {
        console.error('Error during Google sign-in with GoogleSignin library:', error);
      }
    } else {
      // Handle Google Sign-In for iOS
      try {
        const authResult = await auth0.webAuth.authorize({
          connection: 'google-oauth2',
          ephemeralSession: true
        });

        console.log("Auth Result: ", authResult);

        const userProfile = await auth0.auth.userInfo({token: authResult.accessToken});
        const userId = userProfile.sub;
        const formatted_id = formatUserId(userId);

        await AsyncStorage.setItem('accessToken', authResult.accessToken);
        await AsyncStorage.setItem('userEmail', userProfile.email);
        await AsyncStorage.setItem('rawUserId', userId);
        await AsyncStorage.setItem('userId', formatted_id);

        setUserEmail(userProfile.email);
        setUserId(formatted_id);
        setRawUserId(userId);
        updateUserEmail(userProfile.email);

        navigation.navigate('HomeScreen');

        const response = await fetch(`https://aialpha.ngrok.io/register`, {
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
        });
        const data = await response.json();

        console.log('DATA SENT TO BACKEND', data);
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
        //console.log('User Data:', user);
        //console.log('Full Name:', fullName);
        //console.log('User Email:', user?.email);
        //console.log('User2 Email:', email);
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

        navigation.navigate('HomeScreen');
        setUserId(user);
        setRawUserId(newUser);
        //setUserEmail(email);
        //console.log('auth0Response.data._id', auth0Response.data._id);

        const response = await fetch(`https://aialpha.ngrok.io/register`, {
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
        });
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
