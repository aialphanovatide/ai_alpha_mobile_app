import React from 'react';
import Navigation from './navigation/Navigation';

import useDimensions from './hooks/useDimensions';
import BottomMenu from './components/BottomMenu/Menu';
import Home from './components/Home/Home';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TopMenu from './components/TopMenu/topmenu';

import Subscription from './components/Subscriptions/Subscription';
import SubscriptionSelector from './components/Subscriptions/SubscriptionSelector';

import { TopMenuContextProvider } from './context/topMenuContext';
import { SafeAreaView, StyleSheet, StatusBar, Platform, View } from 'react-native';

import { GoogleSignin } from '@react-native-google-signin/google-signin';


const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // This ensures that the SafeAreaView takes up the entire screen
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Additional padding for Android
    backgroundColor:'#242427',
  },
});

export default App;
