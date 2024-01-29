import React, {useState} from 'react';
import {Text, Alert, SafeAreaView, View} from 'react-native';
import CustomButton from '../CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useUserId} from '../../../context/UserIdContext';
import {
  auth0Domain,
  auth0DeleteAccount_Client,
  auth0DeleteAccount_Secret,
} from '../../../src/constants';
import useDeleteAccountStyles from './DeleteAccountStyles';
import BackButton from '../../Analysis/BackButton/BackButton';

const DeleteAccountForm = () => {
  const navigation = useNavigation();
  const [isProcessing, setIsProcessing] = useState(false);
  const {userId} = useUserId();
  const styles = useDeleteAccountStyles();

  const getManagementApiToken = async () => {
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

  const deleteUserAccount = async () => {
    setIsProcessing(true);
    try {
      const token = await getManagementApiToken();
      console.log('User Email: ', {userId});

      const response = await fetch(
        `https://${auth0Domain}/api/v2/users/${encodeURIComponent(userId)}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
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

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to permanently delete your account? This action cannot be undone.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: deleteUserAccount},
      ],
    );
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
