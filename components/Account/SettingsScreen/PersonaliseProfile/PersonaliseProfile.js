import React, {useState, useEffect, useContext} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import CustomInput from '../../../Login/CustomInput/CustomInput';
import SaveButton from './SaveButton';
import BackButton from '../../../Analysis/BackButton/BackButton';
import usePersonaliseProfileStyles from './PersonaliseProfileStyles';
import {useRawUserId} from '../../../../context/RawUserIdContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  auth0Domain,
  auth0ManagementAPI_Client,
  auth0ManagementAPI_Secret,
} from '../../../../src/constants';
import GreenTick from '../../../../assets/images/greenTick.png';
import {useNavigation} from '@react-navigation/core';
import auth0 from '../../../Login/auth0';
import DateTimePicker from '@react-native-community/datetimepicker';
import {AppThemeContext} from '../../../../context/themeContext';

const PersonaliseProfile = () => {
  const styles = usePersonaliseProfileStyles();
  const [isEditing, setIsEditing] = useState(true);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [error, setError] = useState('');
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [resetPasswordSuccesful, setResetPasswordSuccessful] = useState(false);
  const {rawUserId} = useRawUserId();
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState();
  const [birthDateString, setBirthDateString] = useState('');
  const {theme} = useContext(AppThemeContext);

  useEffect(() => {
    const loadStoredData = async () => {
      const storedFullName = await AsyncStorage.getItem('fullName');
      const storedUsername = await AsyncStorage.getItem('username');
      const storedBirthDate = await AsyncStorage.getItem('birthDate');
      const storedUserImage = await AsyncStorage.getItem('userImage');

      setFullName(storedFullName || '');
      setUsername(storedUsername || '');
      if (storedBirthDate) {
        const date = new Date(storedBirthDate);
        setBirthDate(date);
        setBirthDateString(formatDate(date));
      }
      if (storedUserImage) {
        setUserImage(storedUserImage);
      } else {
        await fetchUserImage();
      }

      setIsEditing(!storedFullName || !storedUsername);
      setSaveDisabled(true); // Initially disable the save button after loading
    };

    loadStoredData();
  }, []);

  useEffect(() => {
    const isDataUnchanged = async () => {
      const storedFullName = await AsyncStorage.getItem('fullName');
      const storedUsername = await AsyncStorage.getItem('username');
      const storedBirthDate = await AsyncStorage.getItem('birthDate');

      console.log('State check:', {
        storedFullName,
        storedUsername,
        storedBirthDate,
        fullName,
        username,
        birthDate: birthDate.toISOString(),
      });
      console.log('stored name:', storedFullName);
      console.log('stored username:', storedUsername);
      console.log('full name:', fullName);
      console.log('username:', username);

      if (fullName === '' || username === '') {
      } else {
        if (storedFullName === fullName && storedUsername === username) {
          console.log('Data has not changed.');
          setSaveDisabled(true);
          setIsEditing(false);
        } else {
          console.log('Data has changed.');
          setSaveDisabled(false);
          setIsEditing(true);
        }
      }
    };

    isDataUnchanged();
  }, [fullName, username, birthDate]);

  const formatDate = date => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchUserImage = async () => {
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
    const userImageUrl = userData.picture;
    setUserImage(userImageUrl);
    await AsyncStorage.setItem('userImage', userImageUrl);
  };

  const updateUserMetadata = async (newFullName, newUsername, newBirthDate) => {
    const token = await getManagementApiToken();
    const userMetadata = {
      fullname: newFullName,
      username: newUsername,
      birthdate: newBirthDate,
    };

    const response = await fetch(
      `https://${auth0Domain}/api/v2/users/${encodeURIComponent(rawUserId)}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({user_metadata: userMetadata}),
      },
    );

    if (response.ok) {
      const data = await response.json();
      console.log('User updated:', data);
    } else {
      console.error(
        'Failed to update user:',
        response.status,
        response.statusText,
      );
    }
  };

  const [forceRender, setForceRender] = useState(false);

  const toggleEditSave = async () => {
    console.log('toggleEditSave called'); // Debug log
    console.log('isEditing ->', isEditing); // Debug log

    if (isEditing) {
      if (!fullName.trim() || !username.trim()) {
        setError('Full name and username cannot be empty.');
        return;
      }
      console.log('entered toggleEditSave');

      setError('');
      const newFullName = fullName;
      const newUsername = username;
      const newBirthDate = birthDate.toISOString();

      try {
        await AsyncStorage.setItem('fullName', newFullName);
        await AsyncStorage.setItem('username', newUsername);
        await AsyncStorage.setItem('birthDate', newBirthDate);

        console.log('AsyncStorage updated with new values'); // Debug log

        await updateUserMetadata(newFullName, newUsername, newBirthDate);

        console.log('User metadata updated successfully.');
        setIsEditing(false);
        setSaveDisabled(true); // Disable the save button after saving
        setForceRender(prev => !prev); // Force re-render
      } catch (error) {
        console.error('Failed to update user metadata:', error);
        setError('Failed to update user metadata.');
      }
    } else {
      setIsEditing(true);
      setForceRender(prev => !prev); // Force re-render
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

  const resetPasswordButton = async () => {
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
    console.log('rawUserId ->', rawUserId);
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

    if (userFetch.ok) {
      const userData = await userFetch.json();
      console.log('User data ->', userData);
      const extractedEmail = userData.email;
      setUserEmail(extractedEmail); // Update state for other potential uses not immediately following this update

      console.log('Email to use for reset ->', extractedEmail);
      try {
        await auth0.auth.resetPassword({
          email: extractedEmail,
          connection: 'Username-Password-Authentication',
        });
        console.log('Reset password email sent.');
        setResetPasswordSuccessful(true);

        setTimeout(() => {
          navigation.navigate('SettingsScreen');
        }, 2000);

        console.log('after all');
      } catch (error) {
        console.error('Failed to send reset password email:', error);
      }
    } else {
      console.error('Failed to fetch user:', userFetch.status);
      const errorResponse = await userFetch.text();
      console.error('Error details:', errorResponse);
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(true);
    if (selectedDate) {
      setBirthDate(selectedDate);
      const formattedDate = formatDate(selectedDate);
      setBirthDateString(formattedDate);
      AsyncStorage.setItem('birthDate', selectedDate.toISOString());
    }
  };

  const onAndroidDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setBirthDate(selectedDate);
      const formattedDate = formatDate(selectedDate);
      setBirthDateString(formattedDate);
      AsyncStorage.setItem('birthDate', selectedDate.toISOString());
    }
    setShowDatePicker(false);
  };

  const handleAndroidDateChange = () => {
    setShowDatePicker(true);
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
              <Image source={{uri: userImage}} style={styles.userImage} />
            </View>
          )}
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Full Name</Text>
            <CustomInput
              placeholder="Enter your full name"
              value={fullName}
              setValue={setFullName}
              containerStyles={{paddingVertical: 0, borderWidth: 0}}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Username</Text>
            <CustomInput
              placeholder="Choose a username"
              value={username}
              setValue={setUsername}
              containerStyles={{paddingVertical: 0, borderWidth: 0}}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.title}>Birth Date</Text>
              <Text style={styles.optionalLabel}>(optional)</Text>
            </View>

            {Platform.OS === 'ios' ? (
              <></>
            ) : (
              <TouchableOpacity
                style={styles.androidDateContainer}
                onPress={() => handleAndroidDateChange()}
                showsVerticalScrollIndicator={false}>
                <TextInput
                  value={birthDateString}
                  placeholder={'DD/MM/YY'}
                  placeholderTextColor={theme.secondaryTextColor}
                  style={styles.dateInput}
                  autoCapitalize="none"
                  editable={false}
                />
              </TouchableOpacity>
            )}
            <View style={styles.dateContainer}>
              {Platform.OS === 'ios' ? (
                <DateTimePicker
                  value={birthDate}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                  style={{
                    borderColor: theme.orange,
                    borderWidth: 1,
                    borderRadius: 5,
                    width: '28%',
                  }}
                />
              ) : showDatePicker ? (
                <DateTimePicker
                  value={birthDate}
                  mode="date"
                  display="default"
                  onChange={onAndroidDateChange}
                  style={{
                    borderColor: theme.orange,
                    borderWidth: 1,
                    borderRadius: 5,
                    width: '28%',
                  }}
                />
              ) : (
                <></>
              )}
            </View>
          </View>
          <View style={styles.resetPasswordContainer}>
            <Text
              style={styles.sendMailButton}
              onPress={() => resetPasswordButton()}>
              Edit Password
            </Text>
          </View>

          <SaveButton
            onPress={toggleEditSave}
            text={'Save'}
            disabled={saveDisabled}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonaliseProfile;
