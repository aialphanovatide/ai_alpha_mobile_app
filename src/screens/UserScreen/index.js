/**
 * @file User Screen.
 * @author Vadim Savin
 */

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { ENTITLEMENT_ID } from '../../constants';
import { LoginForm, LogoutButton, RestorePurchasesButton, Credits } from '../../components';
import styles from './styles.js';
import Purchases from 'react-native-purchases';

const UserScreen = () => {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [userId, setUserId] = useState(null);
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const getUserData = async () => {
    setIsAnonymous(await Purchases.isAnonymous());
    setUserId(await Purchases.getAppUserID());

    const purchaserInfo = await Purchases.getCustomerInfo();
    setSubscriptionActive(typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined');
  };

  useEffect(() => {
    getUserData();
  },[]);

  useEffect(() => {
    Purchases.addCustomerInfoUpdateListener(getUserData);

    return ()=>{
      Purchases.removeCustomerInfoUpdateListener();
    }
  },[]);
  return (
    <View style={styles.page}>
      {/* The user's current app user ID and subscription status */}
      <Text style={styles.headline}>Current User Identifier</Text>
      <Text style={styles.userIdentifier}>{userId}</Text>

      <Text style={styles.headline}>Subscription Status</Text>
      <Text style={{ color: subscriptionActive ? 'green' : 'red' }}>
        {subscriptionActive ? 'Active' : 'Not Active'}
      </Text>

      {/* Authentication UI */}
      {isAnonymous ? <LoginForm onLogin={getUserData} /> : <LogoutButton onLogout={getUserData} />}

      {/* You should always give users the option to restore purchases to connect their purchase to their current app user ID */}
      <RestorePurchasesButton />

      <Credits />
    </View>
  );
};

export default UserScreen;
