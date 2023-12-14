import {React, useEffect} from 'react';
import Navigation from './navigation/Navigation';
import {SafeAreaView, StyleSheet, StatusBar, Platform} from 'react-native';
import Purchases from 'react-native-purchases';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import PaywallScreen from './components/Login/Screens/PaywallScreen/PaywallScreen';
import { IOS_API_KEY, ANDROID_API_KEY, ENTITLEMENT_ID} from '@env';
import Router from './src/navigation/Router';
import { API_KEY } from './src/constants';
import { TopMenuContextProvider } from './context/topMenuContext';


const App = () => {
  useEffect(() => {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.VERBOSE);
    if (Platform.OS === 'ios') {
      Purchases.configure({ apiKey: IOS_API_KEY });
    } else if (Platform.OS === 'android') {
      Purchases.configure({ apiKey: ANDROID_API_KEY });
    }
  }, []);
  console.log("Entitlement id: ",ENTITLEMENT_ID)


  return (
    <>
      <StatusBar barStyle="light-content" />
      <Router />
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#242427',
  },
});

/*
import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { TopMenuContextProvider } from './context/topMenuContext';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
       <TopMenuContextProvider>
           <Navigation />
       </TopMenuContextProvider>
    </SafeAreaView>
  );
};

export default App;

*/