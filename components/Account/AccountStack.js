import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Account from './Account';
import PackageSubscriptions from './PackageSubscriptions/PackageSubscriptions';
import PrivacyPolicy from './LegalAndInformation/PrivacyPolicy/PrivacyPolicy';
import NotificationsPanel from './NotificationsPanel/NotificationsPanel';
import {NOTIFICATIONS_MOCK} from './NotificationsPanel/notificationsMock';
import LegalAndInformation from './LegalAndInformation/LegalAndInformation';
import Eula from './LegalAndInformation/Eula/Eula';
import CurrentPackages from './CurrentPackages/CurrentPackages';
import SettingsScreen from './SettingsScreen/SettingsScreen';
import { LoginForm } from '../../src/components';
import PersonaliseProfile from './SettingsScreen/PersonaliseProfile/PersonaliseProfile';

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
      <AccountStack.Screen name="Legal" component={LegalAndInformation} />
      <AccountStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <AccountStack.Screen name="Eula" component={Eula} />
      <AccountStack.Screen name="CurrentPackages" component={CurrentPackages} />
      <AccountStack.Screen name="SettingsScreen" component={SettingsScreen} />
      <AccountStack.Screen name="PersonaliseProfile" component={PersonaliseProfile} />

      <AccountStack.Screen
        name="Notifications"
        component={NotificationsPanel}
        initialParams={{options: NOTIFICATIONS_MOCK}}
      />
    </AccountStack.Navigator>
  );
};

export default AccountScreen;
