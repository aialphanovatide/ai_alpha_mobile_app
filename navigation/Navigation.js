import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginForm from '../components/Login/Screens/LoginScreen/LoginForm';
import SignupForm from '../components/Login/Screens/SignupScreen/SignupForm';
import ConfirmForm from '../components/Login/Screens/ConfirmEmailScreen/ConfirmForm';
import ForgotPasswordForm from '../components/Login/Screens/ForgotPasswordScreen/ForgotPasswordForm';
import NewPasswordForm from '../components/Login/Screens/NewPasswordScreen/NewPasswordForm';
import HomeScreen from '../components/Login/HomeScreen/HomeScreen';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={LoginForm} />
        <Stack.Screen name="SignUp" component={SignupForm} />
        <Stack.Screen name="Confirm" component={ConfirmForm} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordForm} />
        <Stack.Screen name="NewPassword" component={NewPasswordForm} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
