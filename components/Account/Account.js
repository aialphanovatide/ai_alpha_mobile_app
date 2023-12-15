import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ENTITLEMENT_ID } from '../../src/constants';
import { LoginForm, LogoutButton, RestorePurchasesButton } from '../../src/components';
import styles from './styles.js';
import Purchases from 'react-native-purchases';
import CustomButton from '../Login/CustomButton';
import {useNavigation} from '@react-navigation/native';
import auth0 from '../Login/auth0';
import { useUser } from '../../context/UserContext';
 
 const Account = ({ route}) => {
   const [isAnonymous, setIsAnonymous] = useState(true);
   const [userId, setUserId] = useState(null);
   const [subscriptionActive, setSubscriptionActive] = useState(false);
   const [subscriptionName, setSubscriptionName] = useState('');
   const { userEmail } = useUser();
   const navigation = useNavigation();

   const getUserData = async () => {
     setIsAnonymous(await Purchases.isAnonymous());
     setUserId(await Purchases.getAppUserID());
 
     const purchaserInfo = await Purchases.getCustomerInfo();
     setSubscriptionActive(typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined');
     //await Purchases.identify(userId);

     const activeSubscriptions = Object.keys(purchaserInfo.entitlements.active);
     if (activeSubscriptions.length > 0) {
       setSubscriptionName(activeSubscriptions[0]); // Set the first active subscription name
     }
   };
   const resetLoginForm = () => {
    navigation.navigate('SignIn', { resetForm: () => {
      setUsername('');
      setPassword('');
    }});
  };
   const handleLogout = async () => {
    try {
      resetLoginForm();
      navigation.navigate('SignIn', { resetForm: true });
    } catch (e) {
      console.error("Logout failed",e);
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
     return ()=>{
       Purchases.removeCustomerInfoUpdateListener();
     }
   },[]);

   return (
     <ScrollView>
     <View style={styles.page}>
       <Text style={styles.headline}>Current User Identifier</Text>
       <Text style={styles.userIdentifier}>{userId}</Text>
       <Text style={styles.headline}>User Email</Text>
        <Text style={styles.userIdentifier}>{userEmail || 'Email not available'}</Text>
       <Text style={styles.headline}>Subscription Name</Text>
       <Text>{subscriptionName || 'No Active Subscription'}</Text>
       <Text style={styles.headline}>Subscription Status</Text>
       <Text style={{ color: subscriptionActive ? 'green' : 'red' ,marginBottom:100}}>
         {subscriptionActive ? 'Active' : 'Not Active'}
       </Text>

 
       {/* You should always give users the option to restore purchases to connect their purchase to their current app user ID */}
       <CustomButton text="Log Out" onPress={handleLogout} />

     </View>
     </ScrollView>
   );
 };
 
 export default Account;
 