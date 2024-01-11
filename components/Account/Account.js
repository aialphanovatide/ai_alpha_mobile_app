import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {ENTITLEMENT_ID} from '../../src/constants';
import {
  LoginForm,
  LogoutButton,
  RestorePurchasesButton,
} from '../../src/components';
import Purchases from 'react-native-purchases';
import CustomButton from '../Login/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/core';
import auth0 from '../Login/auth0';
import {useUser} from '../../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAccountStyles from './styles';
import ThemeButton from '../ThemeButton/ThemeButton';

const AccountItem = ({styles, option, handleItemTouch}) => {
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
        <View style={styles.rightArrowContainer}>
          <Image
            style={styles.rightArrow}
            source={require('../../assets/images/analysis/right-arrow.png')}
            resizeMode={'contain'}
          />
        </View>
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
  const {userEmail} = useUser();
  const navigation = useNavigation();

  console.log(route);

  const options = [
    {
      name: 'Subscription',
      logo: require('../../assets/images/account/subscription.png'),
      screenName: 'Subscription',
    },
    {
      name: 'Log Out',
      logo: require('../../assets/images/account/logout.png'),
      screenName: null,
    },
    {
      name: 'Delete Account',
      logo: require('../../assets/images/account/deleteacc.png'),
      screenName: null,
    },
  ];

  const handleItemTouch = option => {
    if (option.screenName) {
      navigation.navigate(option.screenName);
    } else {
      console.log(
        'Pressed option: ',
        option.name,
        '\nReplace this console.log with the navigation to the corresponding screen',
      );
    }
  };

  const getUserData = async () => {
    setIsAnonymous(await Purchases.isAnonymous());
    setUserId(await Purchases.getAppUserID());

    const purchaserInfo = await Purchases.getCustomerInfo();
    setSubscriptionActive(
      typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined',
    );
    //await Purchases.identify(userId);

    const activeSubscriptions = Object.keys(purchaserInfo.entitlements.active);
    if (activeSubscriptions.length > 0) {
      setSubscriptionName(activeSubscriptions[0]); // Set the first active subscription name
    }
  };
  const resetLoginForm = () => {
    navigation.navigate('SignIn', {
      resetForm: () => {
        setUsername('');
        setPassword('');
        setUserEmail(null);
      },
    });
  };
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      await AsyncStorage.removeItem('userEmail');
      resetLoginForm();
      navigation.navigate('SignIn', {resetForm: true});
    } catch (e) {
      console.error('Logout failed', e);
    }
  };

  useEffect(() => {
    if (route.params?.userEmail) {
      setUserEmail(route.params.userEmail);
    }
    getUserData();
  }, []);

  useEffect(() => {
    Purchases.addCustomerInfoUpdateListener(getUserData);
    return () => {
      Purchases.removeCustomerInfoUpdateListener();
    };
  }, []);

  return (
    <ScrollView style={styles.backgroundColor}>
      {/* <View style={styles.page}>
       <Text style={styles.headline}>Current User Identifier</Text>
       <Text style={styles.userIdentifier}>{userId}</Text>
       <Text style={styles.headline}>User Email</Text>
        <Text style={styles.userIdentifier}>{userEmail || 'Email not available'}</Text>
       <Text style={styles.headline}>Subscription Name</Text>
       <Text>{subscriptionName || 'No Active Subscription'}</Text>
       <Text style={styles.headline}>Subscription Status</Text>
       <Text style={{ color: subscriptionActive ? styles.greenColor : styles.redColor}}>
         {subscriptionActive ? 'Active' : 'Not Active'}
       </Text>
       <CustomButton text="Delete Account" onPress={() => navigation.navigate('DeleteAccountScreen')} />

 
       You should always give users the option to restore purchases to connect their purchase to their current app user ID
       <CustomButton text="Log Out" onPress={handleLogout} />
       
     </View> */}
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.alphaLogoContainer}>
            <Image
              source={require('../../assets/images/account/alphalogo.png')}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
          <Text style={styles.username}>
            {userEmail || 'User not available'}
          </Text>
        </View>
        <Text style={styles.headline}>Subscription Name</Text>
        <Text style={styles.text}>
          {subscriptionName || 'No Active Subscription'}
        </Text>
        <Text style={styles.headline}>Subscription Status</Text>
        <Text
          style={[
            styles.text,
            subscriptionActive && {
              color: subscriptionActive ? styles.greenColor : styles.redColor,
            },
          ]}>
          {subscriptionActive ? 'Active' : 'Not Active'}
        </Text>
        <View style={styles.optionsContainer}>
          {options &&
            options.map((option, index) => (
              <AccountItem
                key={index}
                option={option}
                styles={styles}
                handleItemTouch={handleItemTouch}
              />
            ))}
          <ThemeButton />
        </View>
      </View>
    </ScrollView>
  );
};

export default Account;
