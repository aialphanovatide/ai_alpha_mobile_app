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
import Purchases from 'react-native-purchases';
import {useNavigation} from '@react-navigation/core';
import {useUser} from '../../context/UserContext';
import {useRawUserId} from '../../context/RawUserIdContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAccountStyles from './styles';
import {API_KEY} from '../../src/constants';
import {RevenueCatContext} from '../../context/RevenueCatContext';
import {NOTIFICATIONS_MOCK} from './NotificationsPanel/notificationsMock';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../context/themeContext';
import RNRestart from 'react-native-restart';
import SocialMedia from './SocialMediaButtons/SocialMedia';
import {
  auth0Domain,
  auth0ManagementAPI_Client,
  auth0ManagementAPI_Secret,
} from '../../src/constants';
import BackgroundGradient from '../BackgroundGradient/BackgroundGradient';

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

const Account = ({route}) => {
  const styles = useAccountStyles();
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [userId, setUserId] = useState(null);
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [subscriptionName, setSubscriptionName] = useState('');
  const {userEmail, setUserEmail} = useUser();
  const navigation = useNavigation();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const {userInfo} = useContext(RevenueCatContext);
  const {isDarkMode} = useContext(AppThemeContext);
  const {rawUserId, setRawUserId} = useRawUserId();
  const [userImage, setUserImage] = useState(null);
  const [username, setUsername] = useState('');

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
      name: 'Subscriptions Options',
      logo: {
        width: 28,
        height: 20,
        source: require('../../assets/images/account/subscription.png'),
      },
      screenName: 'Subscriptions',
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
    } /*
    {
      name: 'Test',
      logo: {
        width: 31,
        height: 30,
        source: require('../../assets/images/account/faqslogo.png'),
      },
      screenName: null,
      component: null,
    },*/,
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
      case 'Subscriptions Options':
        navigation.navigate(option.screenName);
        break;
      case 'Legal and Information':
        navigation.navigate('Legal');
        break;
      case 'FAQs':
        navigation.navigate('FAQs');
        break;
      /*case 'Test':
        openManageSubscriptions();
        break;*/
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
        setUserId('');
        setRawUserId('');
        setUserEmail(null);
        setFullName('');
        setUsername('');
        setBirthDate('');
        setIsEditing(null);
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

  const fetchUserImage = async () => {
    console.log('Fetching user image...');
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

  // useEffect(() => {
  //   if (route.params?.userEmail) {
  //     setUserEmail(route.params.userEmail);
  //   }
  //   getUserData();
  // }, []);

  // useEffect(() => {
  //   Purchases.addCustomerInfoUpdateListener(getUserData);
  //   return () => {
  //     Purchases.removeCustomerInfoUpdateListener();
  //   };
  // }, []);

  // useEffect(() => {
  //   Purchases.setLogLevel(Purchases.LOG_LEVEL.VERBOSE);
  //   if (Platform.OS === 'ios') {
  //     Purchases.configure({apiKey: API_KEY});
  //   } else if (Platform.OS === 'android') {
  //     //Purchases.configure({apiKey: ANDROID_API_KEY});
  //   }
  // }, []);
  // console.log('Entitlement id: ', ENTITLEMENT_ID);
  // async function Buy_now() {
  //   try {
  //     // Get offerings
  //     const offerings = await Purchases.getOfferings();
  //     // Check if the desired package is available
  //     const packageIdentifier = 'packageIdentifier_product_id';
  //     const availablePackages =
  //       offerings.all['Bitcoin_4999_m1'].availablePackages;
  //     if (availablePackages.length !== 0) {
  //       // Display packages for sale (you can customize this part based on your UI)
  //       // For simplicity, let's assume you want to purchase the first available package
  //       const selectedPackage = availablePackages[0];
  //       // Make the purchase
  //       const {customerInfo, productIdentifier} =
  //         await Purchases.purchasePackage(selectedPackage);
  //       // Check if the entitlement is active
  //       const entitlementIdentifier = 'Bitcoin_4999_m1';
  //       if (
  //         customerInfo.entitlements.active[entitlementIdentifier] !== undefined
  //       ) {
  //         console.log(':white_check_mark: PURCHASE SUCCESSFUL');
  //         // Do something after a successful purchase
  //         setIsSubscribed(true);
  //         console.log(isSubscribed);
  //       }
  //     }
  //   } catch (error) {
  //     if (!error.userCancelled) {
  //       console.error('PURCHASE FAILED', error);
  //       // Handle error (show an error message, etc.)
  //     }
  //   }
  // }

  /*Solution1.
import { Purchases } from 'react-native-purchases';
async function Buy_now() {
  try {
    const offerings = await Purchases.getOfferings();
    if (offerings.all["offering_name"].availablePackages.length !== 0) {
      const {customerInfo, productIdentifier} = await Purchases.purchasePackage(offerings.all["offering_name"].availablePackages[0]);
      if (typeof customerInfo.entitlements.active['offering_name'] !== "undefined") {
        console.log(":white_check_mark: PURCHASE SUCCESSFUL");
      }
    }
  } catch (e) {
    console.log("PURCHASE FAILED");
    if (!e.userCancelled) {
      showError(e);
    }
  }
}
Solution2
import { Purchases } from 'react-native-purchases';
async function Buy_now() {
  try {
    const offerings = await Purchases.getOfferings();
    if (offerings.all["offering_name"].availablePackages.length !== 0) {
      const {customerInfo, productIdentifier} = await Purchases.purchasePackage(offerings.all["offering_name"].availablePackages[0]);
      if (typeof customerInfo.entitlements.active['offering_name'] !== "undefined") {
        console.log(":white_check_mark: PURCHASE SUCCESSFUL");
      }
    }
  } catch (e) {
    console.log("PURCHASE FAILED");
    if (!e.userCancelled) {
      showError(e);
    }
  }
}
Solution3
import Purchases from 'react-native-purchases';
async function Buy_now() {
  try {
    // Get offerings
    const offerings = await Purchases.getOfferings();
    // Check if the desired package is available
    const packageIdentifier = "packageIdentifier_product_id";
    const availablePackages = offerings.all["experiment_group"].availablePackages;
    if (availablePackages.length !== 0) {
      // Display packages for sale (you can customize this part based on your UI)
      // For simplicity, let's assume you want to purchase the first available package
      const selectedPackage = availablePackages[0];
      // Make the purchase
      const { customerInfo, productIdentifier } = await Purchases.purchasePackage(selectedPackage);
      // Check if the entitlement is active
      const entitlementIdentifier = "entitlement_name";
      if (customerInfo.entitlements.active[entitlementIdentifier] !== undefined) {
        console.log(":white_check_mark: PURCHASE SUCCESSFUL");
        // Do something after a successful purchase
      }
    }
  } catch (error) {
    if (!error.userCancelled) {
      console.error("PURCHASE FAILED", error);
      // Handle error (show an error message, etc.)
    }
  }
}
*/

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
