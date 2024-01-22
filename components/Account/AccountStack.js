import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Account from './Account';
import PackageSubscriptions from './PackageSubscriptions/PackageSubscriptions';
import PrivacyPolicy from './PrivacyPolicy/PrivacyPolicy';

const AccountStack = createNativeStackNavigator();

const AccountScreen = () => {
  return (
    <AccountStack.Navigator
      initialRouteName="AccountMain"
      screenOptions={{header: () => null, headerShown: false}}>
      <AccountStack.Screen name="AccountMain" component={Account} />
      <AccountStack.Screen
        name="Subscriptions"
        component={PackageSubscriptions}
      />
      <AccountStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </AccountStack.Navigator>
  );
};

export default AccountScreen;
