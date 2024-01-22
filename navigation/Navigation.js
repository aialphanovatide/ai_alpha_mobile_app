import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginForm from '../components/Login/Screens/LoginForm/LoginForm';
import SignupForm from '../components/Login/Screens/SignUp/SignupForm';
import ForgotPasswordForm from '../components/Login/Screens/ForgotPassword/ForgotPasswordForm';
import HomeScreen from '../components/Login/HomeScreen/HomeScreen';
import PaywallScreen from '../src/screens/PaywallScreen';
import DeleteAccountForm from '../components/Login/DeleteAccount/DeleteUserForm';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        
        <Stack.Screen name="SignIn" component={LoginForm} options={{ unmountOnBlur: true }}/>
        <Stack.Screen name="SignUp" component={SignupForm} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordForm} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PaywallScreen" component={PaywallScreen} />
        <Stack.Screen name="DeleteAccountScreen" component={DeleteAccountForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
