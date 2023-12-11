import React from 'react';
import Navigation from './navigation/Navigation';

import {React, useState} from 'react';
// import Navigation from './navigation';
import useDimensions from './hooks/useDimensions';
import BottomMenu from './components/BottomMenu/Menu';
import Home from './components/Home/Home';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TopMenu from './components/TopMenu/topmenu';

import Subscription from './components/Subscriptions/Subscription';
import SubscriptionSelector from './components/Subscriptions/SubscriptionSelector';

import { TopMenuContextProvider } from './context/topMenuContext';
import { SafeAreaView, StyleSheet, StatusBar, Platform, View } from 'react-native';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

// import Subscription from './components/Subscriptions/Subscription';
// import SubscriptionSelector from './components/Subscriptions/SubscriptionSelector';
import {TopMenuContextProvider} from './context/topMenuContext';
// import {
//   SafeAreaView,
//   StyleSheet,
//   StatusBar,
//   Platform,
//   View,
// } from 'react-native';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Analysis from './components/Analysis/Analysis';

const App = () => {
  const {height, width} = useDimensions();
  const [currentSection, setCurrentSection] = useState('Home');

  return (
    // <SafeAreaView style={styles.container}>
    //   <StatusBar barStyle="dark-content" />
    //   <Navigation />
    // </SafeAreaView>
    <GestureHandlerRootView style={{flex: 1, height, width}}>
      <TopMenuContextProvider>
        {currentSection === 'Home' && (
          <>
            <TopMenu />
            <Home />
          </>
        )}
        {currentSection === 'Analysis' && <Analysis />}
        <BottomMenu
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
      </TopMenuContextProvider>
    </GestureHandlerRootView>
  );
};

export default App;

