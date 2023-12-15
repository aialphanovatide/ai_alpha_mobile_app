import React, {useEffect, useState} from 'react';
import CustomButton from '../CustomButton';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';

import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_IOS_ID} from '@env';

const SocialSignInButton = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_CLIENT_ID,
      iosClientId: GOOGLE_CLIENT_IOS_ID,
    });
  }, []);
  const navigation = useNavigation();
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      setUser(userInfo);
      isSignedIn();
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.warn('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.warn('Operation is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.warn('Play services not available or outdated');
      } else {
        console.error('Some other error happened', error);
      }
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

  // const onSignInFacebook = () => {
  //   console.warn('Facebook');
  // };
  return (
    <>
      <CustomButton
        text="Sign In with Google"
        onPress={() => signInWithGoogle()}
        type="GOOGLE"
        disabled={user !== null}
      />
      {/* <CustomButton
        text="Sign Up with Facebook"
        onPress={onSignInFacebook}
        type="FACEBOOK"
      /> */}
    </>
  );
};

export default SocialSignInButton;
