import React, {useContext, useEffect} from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginForm from '../components/Login/Screens/LoginForm/LoginForm';
import SignupForm from '../components/Login/Screens/SignUp/SignupForm';
import ForgotPasswordForm from '../components/Login/Screens/ForgotPassword/ForgotPasswordForm';
import TabsMenu from '../components/Login/TabsMenu/TabsMenu';
import TermsAndConditions from '../components/Login/Screens/TermsAndConditions/TermsAndConditions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IntroductorySlides from '../components/IntroductorySlides/IntroductorySlides';
import {useUser} from '../context/UserContext';
import {useUserId} from '../context/UserIdContext';
import {useRawUserId} from '../context/RawUserIdContext';
import {RevenueCatContext} from '../context/RevenueCatContext';

const Stack = createNativeStackNavigator();

// Navigation component to handle the navigation between the different screens of the app. It uses the NavigationContainer and StackNavigator from the @react-navigation/native library to create the navigation stack.

const Navigation = ({initialRoute}) => {
  const {setUserEmail} = useUser();
  const {setUserId} = useUserId();
  const {setRawUserId} = useRawUserId();
  const {updateUserEmail} = useContext(RevenueCatContext);

  const formatUserId = user_id => {
    let separator = user_id.indexOf('|');
    let formatted_id = user_id.slice(separator + 1, user_id.length);
    return formatted_id;
  };

  useEffect(() => {
    const checkUserData = async () => {
      const userId = await AsyncStorage.getItem('userId');
      const userEmail = await AsyncStorage.getItem('userEmail');
      const rawUserId = await AsyncStorage.getItem('rawUserId');

      if (userId) {
        const user_id = formatUserId(userId);
        setUserId(user_id);
      }

      if (rawUserId) {
        setRawUserId(rawUserId);
      }

      if (userEmail) {
        setUserEmail(userEmail);
        updateUserEmail(userEmail);
      }
    };

    checkUserData();
  }, []);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName={initialRoute}
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
                statusBarHidden: true, // This will only apply to Android
              },
            }),
            gestureEnabled: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={LoginForm}
          options={{unmountOnBlur: true, animation: 'slide_from_right'}}
        />
        <Stack.Screen name="SignUp" component={SignupForm} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordForm} />

        <Stack.Screen
          name="TabsMenu"
          component={TabsMenu}
          options={{
            gestureEnabled: false,
            headerShown: false,
            animation: 'fade',
          }}
          listeners={({navigation}) => ({
            focus: () => {
              navigation.reset({
                index: 0,
                routes: [{name: 'TabsMenu'}],
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
