import React, {useState, useEffect, useContext} from 'react';
import {ScrollView, View, Text, Image, SafeAreaView, Alert} from 'react-native';
import CustomInput from '../../../Login/CustomInput/CustomInput';
import SaveButton from './SaveButton';
import BackButton from '../../../BackButton/BackButton';
import usePersonaliseProfileStyles from './PersonaliseProfileStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AUTH0_DOMAIN_ENVVAR,
  AUTH0_MANAGEMENT_API_CLIENT_ENVVAR,
  AUTH0_MANAGEMENT_API_SECRET_ENVVAR,
} from '@env';
import GreenTick from '../../../../assets/images/greenTick.png';
import {useNavigation} from '@react-navigation/core';
import auth0 from '../../../Login/auth0';
import {AppThemeContext} from '../../../../context/themeContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'; // Import the package
import {useSelector} from 'react-redux';
import {selectRawUserId} from '../../../../actions/userActions';

const PersonaliseProfile = () => {
  const styles = usePersonaliseProfileStyles();
  const [isEditing, setIsEditing] = useState(true);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [birthDateArray, setBirthDateArray] = useState([
    '',
    '',
    '/',
    '',
    '',
    '/',
    '',
    '',
    '',
    '',
  ]);
  const [userImage, setUserImage] = useState(null);
  const [error, setError] = useState('');
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [resetPasswordSuccesful, setResetPasswordSuccessful] = useState(false);
  const rawUserId = useSelector(selectRawUserId);
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState('');
  const {theme} = useContext(AppThemeContext);
  const [connectionType, setConnectionType] = useState('');
  const currentYear = new Date().getFullYear();
  const [isBirthDateValid, setIsBirthDateValid] = useState(false);

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const getManagementApiToken = async () => {
          const response = await fetch(
            `https://${AUTH0_DOMAIN_ENVVAR}/oauth/token`,
            {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                client_id: AUTH0_MANAGEMENT_API_CLIENT_ENVVAR,
                client_secret: AUTH0_MANAGEMENT_API_SECRET_ENVVAR,
                audience: `https://${AUTH0_DOMAIN_ENVVAR}/api/v2/`,
                grant_type: 'client_credentials',
              }),
            },
          );
          const data = await response.json();
          return data.access_token;
        };

        // Fetch user metadata if missing
        const token = await getManagementApiToken();
        const userFetch = await fetch(
          `https://${AUTH0_DOMAIN_ENVVAR}/api/v2/users/${encodeURIComponent(
            rawUserId,
          )}`,
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
          console.log('User fetch successful', userData);

          // Check if user_metadata exists
          const userMetadata = userData.user_metadata || {};

          const userFetchedFullname = userMetadata.fullname || '';
          console.log('User fetched fullname:', userFetchedFullname);

          const userFetchedUsername = userMetadata.username || '';
          console.log('User fetched username:', userFetchedUsername);

          const userFetchedEmail = userData.email || ''; // Fetch the user's email
          const userFetchedConnection = userData.identities[0].connection || ''; // Fetch the connection type

          // Store in AsyncStorage if not null or empty
          if (userFetchedFullname) {
            await AsyncStorage.setItem('fullName', userFetchedFullname);
          }

          if (userFetchedUsername) {
            await AsyncStorage.setItem('username', userFetchedUsername);
          }
          setUserEmail(userFetchedEmail);
          setConnectionType(userFetchedConnection);
        } else {
          console.error(
            'Failed to fetch user:',
            userFetch.status,
            userFetch.statusText,
          );
        }

        // Load data from AsyncStorage
        const storedFullName = await AsyncStorage.getItem('fullName');
        const storedUsername = await AsyncStorage.getItem('username');
        const storedBirthDate = await AsyncStorage.getItem('birthDate');
        const storedUserImage = await AsyncStorage.getItem('userImage');

        setFullName(storedFullName || '');
        setUsername(storedUsername || '');
        if (storedBirthDate) {
          setBirthDateArray(storedBirthDate.split(''));
        }

        if (storedUserImage) {
          setUserImage(storedUserImage);
        } else {
          await fetchUserImage();
        }

        setIsEditing(!storedFullName || !storedUsername);
        setSaveDisabled(true);
      } catch (error) {
        console.error('Error loading stored data:', error);
      }
    };

    loadStoredData();
  }, []);

  useEffect(() => {
    const checkDataChanges = async () => {
      const storedFullName = await AsyncStorage.getItem('fullName');
      const storedUsername = await AsyncStorage.getItem('username');
      const storedBirthDate = await AsyncStorage.getItem('birthDate');

      if (
        fullName === storedFullName &&
        username === storedUsername &&
        birthDateArray.join('') === storedBirthDate &&
        isBirthDateValid
      ) {
        setSaveDisabled(true);
        setIsEditing(false);
      } else {
        setSaveDisabled(false);
        setIsEditing(true);
      }
    };

    checkDataChanges();
  }, [fullName, username, birthDateArray, isBirthDateValid]);

  const toggleEditSave = async () => {
    if (isEditing) {
      if (!fullName.trim() || !username.trim()) {
        setError('Full name and username cannot be empty.');
        return;
      }

      setError('');
      try {
        await AsyncStorage.setItem('fullName', fullName);
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('birthDate', birthDateArray.join(''));

        await updateUserMetadata(fullName, username, birthDateArray.join(''));

        setIsEditing(false);
        setSaveDisabled(true);
      } catch (error) {
        console.error('Failed to update user metadata:', error);
        setError('Failed to update user metadata.');
      }
    } else {
      setIsEditing(true);
    }
  };

  const fetchUserImage = async () => {
    const token = await getManagementApiToken();
    const userFetch = await fetch(
      `https://${AUTH0_DOMAIN_ENVVAR}/api/v2/users/${encodeURIComponent(
        rawUserId,
      )}`,
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
      const userImageUrl = userData.picture;
      setUserImage(userImageUrl);
      await AsyncStorage.setItem('userImage', userImageUrl);
    }
  };

  const updateUserMetadata = async (newFullName, newUsername, newBirthDate) => {
    const token = await getManagementApiToken();
    const userMetadata = {
      fullname: newFullName,
      username: newUsername,
      birthdate: newBirthDate,
    };

    const response = await fetch(
      `https://${AUTH0_DOMAIN_ENVVAR}/api/v2/users/${encodeURIComponent(
        rawUserId,
      )}`,
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
      console.log('User updated successfully.');
    } else {
      console.error(
        'Failed to update user:',
        response.status,
        response.statusText,
      );
    }
  };

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

  const resetPasswordButton = async () => {
    Alert.alert(
      'Reset Password',
      'Are you sure you want to receive a password reset email? This may take a couple of minutes to be sent',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Send Email', onPress: onForgotPasswordPressed},
      ],
    );
  };

  const onForgotPasswordPressed = async () => {
    const token = await getManagementApiToken();
    const userFetch = await fetch(
      `https://${AUTH0_DOMAIN_ENVVAR}/api/v2/users/${encodeURIComponent(
        rawUserId,
      )}`,
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
      const extractedEmail = userData.email;

      setUserEmail(extractedEmail);

      try {
        await auth0.auth.resetPassword({
          email: extractedEmail,
          connection: 'Username-Password-Authentication',
        });
        setResetPasswordSuccessful(true);
        setTimeout(() => navigation.navigate('SettingsScreen'), 2000);
      } catch (error) {
        console.error('Failed to send reset password email:', error);
      }
    } else {
      console.error('Failed to fetch user:', userFetch.status);
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
    <KeyboardAwareScrollView
      style={{flex: 1, backgroundColor: theme.mainBackgroundColor}}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.backgroundColor}>
        <ScrollView style={styles.scrollview}>
          <View style={styles.backbuttonContainer}>
            <BackButton />
          </View>
          <Text style={styles.mainTitle}>Personalise Profile</Text>
          <View style={styles.root}>
            {userImage && (
              <View style={styles.imageContainer}>
                <Image source={{uri: userImage}} style={styles.userImage} />
              </View>
            )}
            {(connectionType === 'Username-Password-Authentication' ||
              connectionType === 'google-oauth2') && (
              <View style={styles.inputContainer}>
                <Text style={styles.title}>Email</Text>
                <View style={styles.emailContainer}>
                  <Text style={styles.emailTitle}>{userEmail}</Text>
                </View>
              </View>
            )}
            <View style={styles.inputContainer}>
              <Text style={styles.title}>Full Name</Text>
              <CustomInput
                placeholder="Enter your full name"
                value={fullName}
                setValue={setFullName}
                containerStyles={{paddingVertical: 10, borderWidth: 0}}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.title}>Username</Text>
              <CustomInput
                placeholder="Choose a username"
                value={username}
                setValue={setUsername}
                containerStyles={{paddingVertical: 10, borderWidth: 0}}
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.labelRow}>
                <Text style={styles.title}>Birth Date</Text>
                <Text style={styles.optionalLabel}>(optional)</Text>
              </View>
              <CustomInput
                placeholder="DD/MM/YYYY"
                value={birthDateArray.join('')}
                setValue={newValue => setBirthDateArray(newValue.split(''))}
                containerStyles={{paddingVertical: 10, borderWidth: 0}}
                isDateInput={true}
                onError={isInvalid => setIsBirthDateValid(!isInvalid)}
              />
            </View>
            <View style={styles.resetPasswordContainer}>
              <Text style={styles.sendMailButton} onPress={resetPasswordButton}>
                Edit Password
              </Text>
            </View>
            <SaveButton
              onPress={toggleEditSave}
              text={'Save'}
              disabled={saveDisabled || !isBirthDateValid}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default PersonaliseProfile;
