import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Account from './Account';
import PackageSubscriptions from './PackageSubscriptions/PackageSubscriptions';

const AccountStack = createNativeStackNavigator();

const AccountScreen = () => {
  return (
    <AccountStack.Navigator
      initialRouteName="AccountMain"
      screenOptions={{header: () => null, headerShown: false}}>
      <AccountStack.Screen name="AccountMain" component={Account} />
      <AccountStack.Screen
        name="Subscription"
        component={PackageSubscriptions}
      />
    </AccountStack.Navigator>
  );
};

export default AccountScreen;
