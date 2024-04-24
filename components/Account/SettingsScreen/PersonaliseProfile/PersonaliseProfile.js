import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import CustomInput from '../../../Login/CustomInput/CustomInput';
import CustomButton from '../../../Login/CustomButton/CustomButton';
import BackButton from '../../../Analysis/BackButton/BackButton';
import usePersonaliseProfileStyles from './PersonaliseProfileStyles';
import { useRawUserId } from '../../../../context/RawUserIdContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth0Domain, auth0ManagementAPI_Client, auth0ManagementAPI_Secret } from '../../../../src/constants';


const PersonaliseProfile = () => {
  const styles = usePersonaliseProfileStyles();
  const [isEditing, setIsEditing] = useState(true);  // Default to editing mode initially
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [error, setError] = useState('');
  const [saveDisabled, setSaveDisabled] = useState(false);
  const { rawUserId } = useRawUserId();

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


  

  return (
    <ScrollView style={styles.scrollview}>
      <BackButton />
      <View style={styles.root}>
        {userImage && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: userImage }} style={styles.userImage} />
          </View>
        )}
        {isEditing ? (
          <>
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
              <Text style={styles.title}>Birth Date</Text>
              <CustomInput
                placeholder="DD/MM/YYYY"
                value={birthDate}
                setValue={setBirthDate}
                isDateInput={true}
                onError={handleDateError}
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.infoTitle}>Full Name</Text>
              <Text style={styles.infoText}>{fullName}</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.infoTitle}>Username</Text>
              <Text style={styles.infoText}>{username}</Text>
            </View>
            {birthDate && (
            <View style={styles.inputContainer}>
              <Text style={styles.infoTitle}>Birth Date</Text>
              <Text style={styles.infoText}>{birthDate}</Text>
            </View>
          )}
          </>
        )}
        <CustomButton
          onPress={toggleEditSave}
          text={isEditing ? "Save" : "Edit"}
          disabled={saveDisabled}
        />
      </View>
    </ScrollView>
  );
};

export default PersonaliseProfile;
