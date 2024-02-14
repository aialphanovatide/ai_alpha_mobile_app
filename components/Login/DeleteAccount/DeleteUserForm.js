import React, {useState} from 'react';
import {Text, Alert, SafeAreaView, View} from 'react-native';
import CustomButton from '../CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useUserId} from '../../../context/UserIdContext';
import { useUser } from '../../../context/UserContext';
import {
  auth0Domain,
  auth0DeleteAccount_Client,
  auth0DeleteAccount_Secret,
  auth0ManagementAPI_Client,
  auth0ManagementAPI_Secret,
} from '../../../src/constants';
import auth0 from '../auth0';
import useDeleteAccountStyles from './DeleteAccountStyles';
import BackButton from '../../Analysis/BackButton/BackButton';

const DeleteAccountForm = () => {
  const navigation = useNavigation();
  const [isProcessing, setIsProcessing] = useState(false);
  const {userId} = useUserId();
  const {userEmail} = useUser();
  const [userPassword, setUserPassword] = useState('');
  const styles = useDeleteAccountStyles();

  const getDeleteApiToken = async () => {
    const response = await fetch(`https://${auth0Domain}/oauth/token`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        client_id: auth0DeleteAccount_Client,
        client_secret: auth0DeleteAccount_Secret,
        audience: `https://${auth0Domain}/api/v2/`,
        grant_type: 'client_credentials',
      }),
    });
    const data = await response.json();
    return data.access_token;
  };

  const getManagementApiToken = async () => {
    const response = await fetch(`https://${auth0Domain}/oauth/token`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
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

  const deleteUserAccount = async () => {
    setIsProcessing(true);
    try {
      const deleteToken = await getDeleteApiToken();
      const token = await getManagementApiToken();

      console.log('User id: ', {userId});
      console.log('User email: ', {userEmail});
      console.log('token: ', token);
      console.log('url: ',`https://${auth0Domain}/api/v2/users/auth0|${encodeURIComponent(userId)}`);

      let prefix;

      if (userId.startsWith("apple")) {
        prefix = "";
      } else {
        prefix = "auth0|";
      }

      console.log("prefix: ", prefix);
      console.log("user idddd: ", userId)

      console.log('url: ',`https://${auth0Domain}/api/v2/users/${prefix}${encodeURIComponent(userId)}`);

      const userFetch = await fetch(
        `https://${auth0Domain}/api/v2/users/${prefix}${encodeURIComponent(userId)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("user fetch: ", userFetch);
      const userData = await userFetch.json();
      console.log('User Data!!:', userData);

      const response = await fetch(
        `https://${auth0Domain}/api/v2/users/${prefix}${encodeURIComponent(userId)}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${deleteToken}`,
          },
        },
      );

      if (response.ok) {
        console.log('Account deletion initiated');
        navigation.navigate('SignIn');
      } else {
        throw new Error('Account deletion failed');
      }
    } catch (error) {
      console.error('Failed to delete account:', error);
      Alert.alert('Error', 'Account deletion failed. Please try again later.');
    }
    setIsProcessing(false);
  };

  const handleDeleteAccount = async () => {
    try {
      console.log('User id: ', {userId});
      console.log('User email: ', {userEmail});
      Alert.prompt(
        'Delete Account',
        'Enter your password to delete your account',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async (enteredPassword) => {
              try {
                const credentials = await auth0.auth.passwordRealm({
                  username: userEmail,
                  password: enteredPassword,
                  realm: 'Username-Password-Authentication',
                  scope: 'openid profile email offline_access',
                });

                console.log("got credentials")
  
                if (credentials.idToken) {
                  Alert.alert(
                    'Delete Account',
                    'Are you sure you want to permanently delete your account? This action cannot be undone.',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Delete', onPress: deleteUserAccount },
                    ],
                  );
                };
              } catch (error) {
                Alert.alert('Wrong Password', 'Please enter the correct password.');
                console.log('Failed to authenticate:', error);
              }
            },
          },
        ],
        'secure-text'
      );
    } catch (error) {
      console.log('Error:', error);
    }
};


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButtonContainer}>
        <BackButton />
      </View>
      <Text style={styles.text}>Delete Your Account</Text>
      <CustomButton
        text="Delete Account"
        onPress={handleDeleteAccount}
        disabled={isProcessing}
      />
    </SafeAreaView>
  );
};

export default DeleteAccountForm;