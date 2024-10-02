import React, {useContext, useEffect, useState} from 'react';
import { Platform } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginForm from '../components/Login/Screens/LoginForm/LoginForm';
import SignupForm from '../components/Login/Screens/SignUp/SignupForm';
import ForgotPasswordForm from '../components/Login/Screens/ForgotPassword/ForgotPasswordForm';
import HomeScreen from '../components/Login/HomeScreen/HomeScreen';
import TermsAndConditions from '../components/Login/Screens/TermsAndConditions/TermsAndConditions';
import {AppThemeContext} from '../context/themeContext';
import {Appearance} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IntroductorySlides from '../components/IntroductorySlides/IntroductorySlides';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const colorScheme = Appearance.getColorScheme();
  const {isDarkMode, toggleDarkMode} = useContext(AppThemeContext);
  const [chosenScreen, setChosenScreen] = useState('SignIn');

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');

      if (accessToken && refreshToken) {
        setChosenScreen('HomeScreen');
      } else {
        setChosenScreen('SignIn');
      }
    };

    checkToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={chosenScreen}
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}>
<Stack.Screen
  name="IntroductoryScreen"
  component={IntroductorySlides}
  options={{
    ...Platform.select({
      android: {
        statusBarHidden: true,  // This will only apply to Android
      },
    }),
    gestureEnabled: false,
    animation: 'slide_from_right',
  }}
  initialParams={{ chosenScreen: chosenScreen }}
/>
        <Stack.Screen
          name="SignIn"
          component={LoginForm}
          options={{unmountOnBlur: true}}
        />
        <Stack.Screen name="SignUp" component={SignupForm} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordForm} />

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            gestureEnabled: false,
            headerShown: false,
            animation: 'fade',
          }}
          listeners={({ navigation }) => ({
            focus: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }],
              });
            },
          })}
        />

        <Stack.Screen
          name="TermsAndConditionsScreen"
          component={TermsAndConditions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
