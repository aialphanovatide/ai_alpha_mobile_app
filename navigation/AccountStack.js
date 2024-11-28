import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Account from '../components/Account/Account';
import PackageSubscriptions from '../components/Account/PackageSubscriptions/PackageSubscriptions';
import PrivacyPolicy from '../components/Account/LegalAndInformation/PrivacyPolicy/PrivacyPolicy';
import NotificationsPanel from '../components/Account/NotificationsPanel/NotificationsPanel';
import LegalAndInformation from '../components/Account/LegalAndInformation/LegalAndInformation';
import Eula from '../components/Account/LegalAndInformation/Eula/Eula';
import SettingsScreen from '../components/Account/SettingsScreen/SettingsScreen';
import PersonaliseProfile from '../components/Account/SettingsScreen/PersonaliseProfile/PersonaliseProfile';
import FAQs from '../components/Account/FAQs/FAQs';
import TermsAndConditions from '../components/Login/Screens/TermsAndConditions/TermsAndConditions';
import NewNotificationsPanel from '../components/Account/NotificationsPanel/NewNotificationsPanel';

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
        options={{
          animation: 'fade',
          animationDuration: 250,
        }}
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
        component={NewNotificationsPanel}
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
