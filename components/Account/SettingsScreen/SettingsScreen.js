import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {
  AUTH0_DOMAIN_ENVVAR,
  AUTH0_DELETE_ACCOUNT_CLIENT_ENVVAR,
  AUTH0_DELETE_ACCOUNT_SECRET_ENVVAR,
  AUTH0_MANAGEMENT_API_CLIENT_ENVVAR,
  AUTH0_MANAGEMENT_API_SECRET_ENVVAR,
} from '@env';
import auth0 from '../../Login/auth0';
import {useNavigation} from '@react-navigation/core';
import useSettingsScreenStyles from './SettingsScreenStyles';
import ThemeButton from '../../ThemeButton/ThemeButton';
import BackButton from '../../BackButton/BackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RevenueCatContext} from '../../../context/RevenueCatContext';
import RNRestart from 'react-native-restart';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectRawUserId,
  selectUserEmail,
  selectUserId,
} from '../../../actions/userActions';
import {
  updateEmail,
  updateRawUserId,
  updateUserId,
} from '../../../store/userDataSlice';

const SettingsItem = ({
  styles,
  option,
  handleItemTouch,
  itemComponent = null,
}) => {
  return (
    <TouchableOpacity onPress={() => handleItemTouch(option)}>
      <View style={styles.itemContainer}>
        <View style={styles.itemLogoContainer}>
          <Image
            source={option.logo}
            resizeMode="contain"
            style={styles.itemLogo}
          />
        </View>
        <Text style={styles.itemName}>{option.name}</Text>
        {itemComponent !== null ? (
          itemComponent
        ) : (
          <View style={styles.rightArrowContainer}>
            <Image
              style={styles.rightArrow}
              source={require('../../../assets/images/analysis/right-arrow.png')}
              resizeMode={'contain'}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const SettingsScreen = ({route}) => {
  const styles = useSettingsScreenStyles();
  const navigation = useNavigation();
  // Below are the state variables that come from the previous DeleteUserForm
  const [isProcessing, setIsProcessing] = useState(false);
  const userId = useSelector(selectUserId);
  const userEmail = useSelector(selectUserEmail);
  const rawUserId = useSelector(selectRawUserId);
  const {restorePurchases} = useContext(RevenueCatContext);
  const dispatch = useDispatch();

  const options = [
    {
      name: 'Dark Mode',
      logo: require('../../../assets/images/account/darkmode.png'),
      screenName: null,
      component: <ThemeButton />,
    },
    {
      name: 'Restore Purchases',
      logo: require('../../../assets/images/account/restorepurchases.png'),
      screenName: null,
      component: null,
    },
    {
      name: 'Personalise Profile',
      logo: require('../../../assets/images/account/personalise-profile.png'),
      screenName: null,
      component: null,
    },
    {
      name: 'Delete Account',
      logo: require('../../../assets/images/account/delete-account.png'),
      screenName: null,
      component: null,
    },
  ];

  useEffect(() => {
    console.log('user id: ', userId);
    console.log('user email: ', userEmail);
  }, []);

  // Elements from previous 'DeleteUserForm'

  const getDeleteApiToken = async () => {
    const response = await fetch(`https://${AUTH0_DOMAIN_ENVVAR}/oauth/token`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        client_id: AUTH0_DELETE_ACCOUNT_CLIENT_ENVVAR,
        client_secret: AUTH0_DELETE_ACCOUNT_SECRET_ENVVAR,
        audience: `https://${AUTH0_DOMAIN_ENVVAR}/api/v2/`,
        grant_type: 'client_credentials',
      }),
    });
    const data = await response.json();
    return data.access_token;
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

  const resetLoginForm = () => {
    navigation.navigate('SignIn', {
      resetForm: () => {
        setUsername('');
        setPassword('');
        setFullName('');
        setBirthDate('');
        setIsEditing(null);
        dispatch(updateRawUserId(''));
        dispatch(updateUserId(''));
        dispatch(updateEmail(null));
      },
    });
  };

  const deleteUserAccount = async () => {
    setIsProcessing(true);
    try {
      const deleteToken = await getDeleteApiToken();
      const token = await getManagementApiToken();

      console.log(
        'url: ',
        `https://${AUTH0_DOMAIN_ENVVAR}/api/v2/users/auth0|${encodeURIComponent(
          userId,
        )}`,
      );

      let prefix;

      if (rawUserId.startsWith('apple')) {
        prefix = '';
      } else {
        prefix = 'auth0|';
      }

      console.log(
        'url: ',
        `https://${AUTH0_DOMAIN_ENVVAR}/api/v2/users/${encodeURIComponent(
          rawUserId,
        )}`,
      );

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

      console.log('user fetch: ', userFetch);
      const userData = await userFetch.json();
      //console.log('User Data:', userData);

      const response = await fetch(
        `https://${AUTH0_DOMAIN_ENVVAR}/api/v2/users/${encodeURIComponent(
          rawUserId,
        )}`,
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

        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        await AsyncStorage.removeItem('userEmail');
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('rawUserId');
        await AsyncStorage.removeItem('loginMethod');
        await AsyncStorage.removeItem('fullName');
        await AsyncStorage.removeItem('username');
        await AsyncStorage.removeItem('birthDate');
        await AsyncStorage.removeItem('userImage');

        const backendDeleteResponse = await fetch(
          `https://aialpha.ngrok.io/delete_user`,
          {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              user_id: userId,
            }),
          },
        );
        const data = await backendDeleteResponse.json();
        console.log('DATA SENT TO BACKEND', data);

        resetLoginForm();
        RNRestart.restart();
        //navigation.navigate('SignIn', {resetForm: true});
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
      // Case for Username-Password users
      try {
        let isUsernamePasswordAuthenticationUser = false;

        if (rawUserId && rawUserId.startsWith('auth0|')) {
          isUsernamePasswordAuthenticationUser = true;
        }

        if (isUsernamePasswordAuthenticationUser) {
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
                onPress: async enteredPassword => {
                  try {
                    const credentials = await auth0.auth.passwordRealm({
                      username: userEmail,
                      password: enteredPassword,
                      realm: 'Username-Password-Authentication',
                      scope: 'openid profile email offline_access',
                    });

                    if (credentials.idToken) {
                      Alert.alert(
                        'Delete Account',
                        'Are you sure you want to permanently delete your account? This action cannot be undone and all your information will be eliminated from our servers.',
                        [
                          {text: 'Cancel', style: 'cancel'},
                          {text: 'Delete', onPress: deleteUserAccount},
                        ],
                      );
                    }
                  } catch (error) {
                    Alert.alert(
                      'Wrong Password',
                      'Please enter the correct password.',
                    );
                    console.error('- Failed to authenticate:', error);
                  }
                },
              },
            ],
            'secure-text',
          );
        } else {
          // Case for Google/Apple users
          console.log('Will proceed in passwordless delete process');
          Alert.alert(
            'Delete Account',
            'Are you sure you want to permanently delete your account? This action cannot be undone.',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Delete', onPress: deleteUserAccount},
            ],
          );
        }
      } catch (error) {
        // Case for Apple users that don't provide an email
        console.log('Entered error catch');
      }
    } catch (error) {
      // Handle errors from the outer try block
      console.log('Error in main try:', error);
    }
  };

  // Restore purchases handles

  const handleRestorePurchase = () => {
    Alert.alert(
      'Restore Purchases',
      'Warning: This must only be activated when your previous account is lost, as all subscriptions will be removed from the previous account.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Restore', onPress: restorePurchases},
      ],
    );
  };

  // Switch case for 'options' array

  const handleItemTouch = option => {
    switch (option.name) {
      case 'Dark Mode':
        break;
      case 'Delete Account':
        handleDeleteAccount();
        break;
      case 'Restore Purchases':
        handleRestorePurchase();
        break;
      case 'Personalise Profile':
        navigation.navigate('PersonaliseProfile');
        break;
      default:
        console.log('Option not handled:', option.name);
    }
  };

  return (
    <SafeAreaView style={styles.backgroundColor}>
      <ScrollView style={[styles.backgroundColor, styles.paddingV]}>
        <BackButton />
        <Text style={styles.title}>Settings</Text>
        <View style={styles.container}>
          <View style={styles.optionsContainer}>
            {options &&
              options.map((option, index) => (
                <SettingsItem
                  key={index}
                  option={option}
                  styles={styles}
                  handleItemTouch={handleItemTouch}
                  itemComponent={option.component && option.component}
                />
              ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
