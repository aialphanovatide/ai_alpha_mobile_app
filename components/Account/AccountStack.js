import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Account from './Account';
import PackageSubscriptions from './PackageSubscriptions/PackageSubscriptions';
import PrivacyPolicy from './LegalAndInformation/PrivacyPolicy/PrivacyPolicy';
import NotificationsPanel from './NotificationsPanel/NotificationsPanel';
import {NOTIFICATIONS_MOCK} from './NotificationsPanel/notificationsMock';
import LegalAndInformation from './LegalAndInformation/LegalAndInformation';
import Eula from './LegalAndInformation/Eula/Eula';
import SettingsScreen from './SettingsScreen/SettingsScreen';
import {LoginForm} from '../../src/components';
import PersonaliseProfile from './SettingsScreen/PersonaliseProfile/PersonaliseProfile';
import FAQs from './FAQs/FAQs';
import TermsAndConditions from '../Login/Screens/TermsAndConditions/TermsAndConditions';

const AccountStack = createNativeStackNavigator();

const AccountScreen = () => {
  return (
    <AccountStack.Navigator
      initialRouteName="AccountMain"
      screenOptions={{header: () => null, headerShown: false}}>
      <AccountStack.Screen name="AccountMain" component={Account} />
      <AccountStack.Screen
        name="Membership"
        component={PackageSubscriptions}
      />
      <AccountStack.Screen name="Legal" component={LegalAndInformation} />
      <AccountStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <AccountStack.Screen name="Eula" component={Eula} />
      <AccountStack.Screen name="TermsAndConditionsInAppScreen" component={TermsAndConditions} />
      <AccountStack.Screen name="SettingsScreen" component={SettingsScreen} />
      <AccountStack.Screen
        name="PersonaliseProfile"
        component={PersonaliseProfile}
      />
      <AccountStack.Screen name="FAQs" component={FAQs} />

      <AccountStack.Screen
        name="Notifications"
        component={NotificationsPanel}
        initialParams={{options: NOTIFICATIONS_MOCK}}
        options={{
          animation: 'slide_from_right',
          animationDuration: 250,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
    </AccountStack.Navigator>
  );
};

export default AccountScreen;
