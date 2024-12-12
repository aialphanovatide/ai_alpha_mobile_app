import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAccountStyles from './styles';
import {RevenueCatContext} from '../../context/RevenueCatContext';
import {NOTIFICATIONS_MOCK} from '../../assets/static_data/notificationsMock';
import RNRestart from 'react-native-restart';
import SocialMedia from './SocialMediaButtons/SocialMedia';
import {
  AUTH0_DOMAIN_ENVVAR,
  AUTH0_MANAGEMENT_API_CLIENT_ENVVAR,
  AUTH0_MANAGEMENT_API_SECRET_ENVVAR,
} from '@env';
import BackgroundGradient from '../BackgroundGradient/BackgroundGradient';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateEmail,
  updateUserId,
  updateRawUserId,
} from '../../store/userDataSlice';
import {selectRawUserId} from '../../actions/userActions';
import {loadSubscriptions} from '../../actions/notificationActions';

// Component to display an item in the Account screen. It receives the styles, the option to display, a function to handle the touch of the item, and an optional component to display in the item. It returns a view with the logo, name, and an optional component or right arrow that executes the function.

const AccountItem = ({
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
            source={option.logo.source}
            resizeMode="contain"
            style={[
              styles.itemLogo,
              {width: option.logo.width, height: option.logo.height},
            ]}
          />
        </View>
        <Text style={styles.itemName}>{option.name}</Text>
        {itemComponent !== null ? (
          itemComponent
        ) : (
          <View style={styles.rightArrowContainer}>
            <Image
              style={styles.rightArrow}
              source={require('../../assets/images/analysis/right-arrow.png')}
              resizeMode={'contain'}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

// Component to display the Account screen. It displays the user's image, username, and options to access the Membership, Legal and Information, Notifications, Settings, FAQs, and Log Out options, that allows navigating to each section. It also displays the social media buttons.

const Account = ({route}) => {
  const styles = useAccountStyles();
  const navigation = useNavigation();
  const {userInfo} = useContext(RevenueCatContext);
  const rawUserId = useSelector(selectRawUserId);
  const [userImage, setUserImage] = useState(null);
  const [username, setUsername] = useState('');
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   // Load the state of the notifications, for the usage in the Notifications panel of the Account section
  //   dispatch(loadSubscriptions());
  // }, [dispatch]);

  useEffect(() => {
    const loadStoredData = async () => {
      const storedUserImage = await AsyncStorage.getItem('userImage');
      const storedUsername = await AsyncStorage.getItem('username');

      setUsername(storedUsername || '');

      if (storedUserImage) {
        setUserImage(storedUserImage);
      } else {
        await fetchUserImage();
      }
    };

    loadStoredData();
  }, []);

  // Account menu
  const options = [
    {
      name: 'Membership',
      logo: {
        width: 28,
        height: 20,
        source: require('../../assets/images/account/subscription.png'),
      },
      screenName: 'Membership',
      component: null,
    },
    {
      name: 'Legal and Information',
      logo: {
        width: 26,
        height: 30,
        source: require('../../assets/images/account/informationicon.png'),
      },
      screenName: null,
      component: null,
    },
    {
      name: 'Notifications',
      logo: {
        width: 26,
        height: 30,
        source: require('../../assets/images/account/notifications.png'),
      },
      screenName: 'Notifications',
      component: null,
    },
    {
      name: 'Settings',
      logo: {
        width: 30,
        height: 30,
        source: require('../../assets/images/account/settingsscreenicon.png'),
      },
      screenName: null,
      component: null,
    },
    {
      name: 'FAQs',
      logo: {
        width: 31,
        height: 30,
        source: require('../../assets/images/account/faqslogo.png'),
      },
      screenName: null,
      component: null,
    },
    {
      name: 'Log Out',
      logo: {
        width: 28,
        height: 30,
        source: require('../../assets/images/account/logout.png'),
      },
      screenName: null,
      component: null,
    },
  ];

  const openManageSubscriptions = () => {
    const url = 'https://apps.apple.com/account/subscriptions';

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Unable to open the Manage Subscriptions page.');
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  const handleItemTouch = option => {
    switch (option.name) {
      case 'Log Out':
        logoutWarning();
        navigation.navigate('SignIn');
        break;
      case 'Settings':
        navigation.navigate('SettingsScreen');
        break;
      case 'Membership':
        navigation.navigate(option.screenName);
        break;
      case 'Legal and Information':
        navigation.navigate('Legal');
        break;
      case 'FAQs':
        navigation.navigate('FAQs');
        break;
      case 'Notifications':
        navigation.navigate('Notifications', {options: NOTIFICATIONS_MOCK});
        break;
      default:
        console.log('Option not handled:', option.name);
    }
  };

  // const getUserData = async () => {
  //   setIsAnonymous(await Purchases.isAnonymous());
  //   setUserId(await Purchases.getAppUserID());

  //   const purchaserInfo = await Purchases.getCustomerInfo();
  //   setSubscriptionActive(
  //     typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined',
  //   );
  //   //await Purchases.identify(userId);

  //   const activeSubscriptions = Object.keys(purchaserInfo.entitlements.active);
  //   if (activeSubscriptions.length > 0) {
  //     setSubscriptionName(activeSubscriptions[0]); // Set the first active subscription name
  //   }
  // };

  const resetLoginForm = () => {
    navigation.navigate('SignIn', {
      resetForm: () => {
        setUsername('');
        setPassword('');
        setFullName('');
        setUsername('');
        setBirthDate('');
        setIsEditing(null);
        dispatch(updateEmail(null));
        dispatch(updateUserId(''));
        dispatch(updateRawUserId(''));
      },
    });
  };

  const logoutWarning = async () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Log Out', onPress: handleLogout},
    ]);
  };

  const handleLogout = async () => {
    try {
      console.log('Logging out and removing login data...');
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
      await AsyncStorage.removeItem('signupDate');
      await AsyncStorage.removeItem('signupDateValidator');
      console.log('Successfully removed login data...');
      resetLoginForm();
      console.log('After loginForm reset');
      navigation.navigate('SignIn', {resetForm: true});
      RNRestart.restart();
      console.log('After logout navigation');
    } catch (e) {
      console.error('Logout failed', e);
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

  const fetchUserImage = async () => {
    console.log('Fetching user image...');
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
    const userData = await userFetch.json();
    const userImageUrl = userData.picture;
    setUserImage(userImageUrl);
    await AsyncStorage.setItem('userImage', userImageUrl);
  };

  return (
    <SafeAreaView style={styles.backgroundColor}>
      <View style={styles.mainView}>
        <BackgroundGradient />
        <ScrollView style={styles.backgroundColor}>
          <View style={styles.container}>
            <View style={styles.alphaLogoContainer}>
              <Image
                source={require('../../assets/images/account/alphalogo.png')}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
            {userImage && (
              <View style={styles.imageContainer}>
                <Image source={{uri: userImage}} style={styles.userImage} />
              </View>
            )}
            <Text style={styles.username}>
              {username ? `@${username}` : ''}
            </Text>

            <View style={styles.optionsContainer}>
              {options &&
                options.map((option, index) => {
                  const isLastItem = index === options.length - 1;
                  return (
                    <React.Fragment key={index}>
                      {isLastItem && <SocialMedia />}
                      <AccountItem
                        option={option}
                        styles={styles}
                        handleItemTouch={handleItemTouch}
                        itemComponent={option.component && option.component}
                      />
                    </React.Fragment>
                  );
                })}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Account;
