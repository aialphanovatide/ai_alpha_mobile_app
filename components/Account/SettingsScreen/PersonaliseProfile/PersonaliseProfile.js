import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text, Image, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import CustomInput from '../../../Login/CustomInput/CustomInput';
import SaveButton from './SaveButton';
import BackButton from '../../../Analysis/BackButton/BackButton';
import usePersonaliseProfileStyles from './PersonaliseProfileStyles';
import { useRawUserId } from '../../../../context/RawUserIdContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth0Domain, auth0ManagementAPI_Client, auth0ManagementAPI_Secret } from '../../../../src/constants';
import GreenTick from '../../../../assets/images/greenTick.png';
import {useNavigation} from '@react-navigation/core';
import auth0 from '../../../Login/auth0';

const PersonaliseProfile = () => {
  const styles = usePersonaliseProfileStyles();
  const [isEditing, setIsEditing] = useState(true);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [error, setError] = useState('');
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [resetPasswordSuccesful, setresetPasswordSuccesful] = useState(false);
  const { rawUserId } = useRawUserId();
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState();


  useEffect(() => {
    const loadStoredData = async () => {
      const storedFullName = await AsyncStorage.getItem('fullName');
      const storedUsername = await AsyncStorage.getItem('username');
      const storedBirthDate = await AsyncStorage.getItem('birthDate');
  
      setFullName(storedFullName || '');
      setUsername(storedUsername || '');
      setBirthDate(storedBirthDate || '');
  
      // Set editing mode only if the essential fields are empty
      setIsEditing(!storedFullName || !storedUsername);
    };
  
    loadStoredData();
  }, []);
  

  useEffect(() => {
    const getUser = async () => {
      // Assuming getManagementApiToken is defined elsewhere in your component or imported
      const token = await getManagementApiToken();
      const userFetch = await fetch(
        `https://${auth0Domain}/api/v2/users/${encodeURIComponent(rawUserId)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const userData = await userFetch.json();
      console.log("user data -->", userData.picture)
      setUserImage(userData.picture);
    };

    getUser();
  }, [rawUserId]);

  const updateUserMetadata = async () => {
    const token = await getManagementApiToken();
    // Metadata to update
    const userMetadata = {
      fullname: fullName,
      username: username,
      birthdate: birthDate,
    };
  
    const response = await fetch(`https://${auth0Domain}/api/v2/users/${encodeURIComponent(rawUserId)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ user_metadata: userMetadata })
    });
  
    if (response.ok) {
      const data = await response.json();
      console.log('User updated:', data);
    } else {
      console.error('Failed to update user:', response.status, response.statusText);
    }
  };

  const toggleEditSave = async () => {
    if (isEditing) {
      if (!fullName.trim() || !username.trim()) {
        setError('Full name and username cannot be empty.');
        return;
      }

      if (birthDate && error) {
        setError('Please correct the date format before saving.');
        return;
      }

      setError('');
      await AsyncStorage.setItem('fullName', fullName);
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('birthDate', birthDate);
      setIsEditing(false);
      try {
        await updateUserMetadata();
        console.log('User metadata updated successfully.');
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to update user metadata:', error);
        setError('Failed to update user metadata.');
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleDateError = (errorMessage) => {
    if (birthDate === '') {  // If birth date is empty, do not disable the save button
      setError('');
      setSaveDisabled(false);
    } else {
      setError(errorMessage);
      setSaveDisabled(!!errorMessage);
    }
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

  const resetPasswordButton = async () =>{

    Alert.alert(
      'Reset Password',
      'Are you sure you want to receive a password reset email? This may take a couple minutes to be sent',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Send Email', onPress: onForgotPasswordPressed},
      ],
    );
  };


  const onForgotPasswordPressed = async () => {
    console.log("rawUserId ->", rawUserId);
    const token = await getManagementApiToken();
    const userFetch = await fetch(
      `https://${auth0Domain}/api/v2/users/${encodeURIComponent(rawUserId)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    if (userFetch.ok) {
      const userData = await userFetch.json();
      console.log("User data ->", userData);
      const extractedEmail = userData.email;
      setUserEmail(extractedEmail); // Update state for other potential uses not immediately following this update
      
      // Use extractedEmail directly here
      console.log("Email to use for reset ->", extractedEmail);
      try {
        await auth0.auth.resetPassword({
          email: extractedEmail,
          connection: 'Username-Password-Authentication',
        });
        console.log('Reset password email sent.');
        setresetPasswordSuccesful(true);
  
        setTimeout(() => {
          navigation.navigate('SettingsScreen');
        }, 2000);

        console.log("after all")

      } catch (error) {
        console.error('Failed to send reset password email:', error);
      }
    } else {
      console.error('Failed to fetch user:', userFetch.status);
      const errorResponse = await userFetch.text();
      console.error('Error details:', errorResponse);
    }
  };

  if (resetPasswordSuccesful) {
    return (
      <View style={styles.successContainer}>
        <Image source={GreenTick} style={styles.tickImage} />
        <Text style={styles.successText}>Reset Password Link Sent</Text>
      </View>
    );
  }

  

  return (
    <SafeAreaView style={styles.backgroundColor}>
    <ScrollView style={styles.scrollview}>
      <BackButton />
      <Text style={styles.mainTitle}>Personalise Profile</Text>
      <View style={styles.root}>
        {userImage && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: userImage }} style={styles.userImage} />
          </View>
        )}
            <View style={styles.inputContainer}>
              <Text style={styles.title}>Full Name</Text>
              <CustomInput
                placeholder="Enter your full name"
                value={fullName}
                setValue={setFullName}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.title}>Username</Text>
              <CustomInput
                placeholder="Choose a username"
                value={username}
                setValue={setUsername}
              />
            </View>
            <View style={styles.inputContainer}>
            <View style={styles.labelRow}>
                <Text style={styles.title}>Birth Date</Text>
                <Text style={styles.optionalLabel}>(optional)</Text>
              </View>
              <CustomInput
                placeholder="DD/MM/YYYY"
                value={birthDate}
                setValue={setBirthDate}
                isDateInput={true}
                onError={handleDateError}
              />
            </View>
            <View style={styles.inputContainer}>
              <TouchableOpacity onPress={resetPasswordButton}>
                <Text style={styles.sendMailButton}>Edit Password</Text>
              </TouchableOpacity>
            </View>


        <SaveButton
          onPress={toggleEditSave}
          text={"Save"}
          disabled={saveDisabled}
        />
      </View>
    </ScrollView>
    </SafeAreaView>

  );
};

export default PersonaliseProfile;
