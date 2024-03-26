import React, {useContext, useEffect, useState} from 'react';
import Navigation from './navigation/Navigation';
import {
  View,
  Button,
  Alert,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  Appearance,
} from 'react-native';
import {useAuth0, Auth0Provider} from 'react-native-auth0';
import Keys from 'react-native-keys';
import {TopMenuContextProvider} from './context/topMenuContext';
import {UserProvider} from './context/UserContext';
import {UserIdProvider} from './context/UserIdContext';
import {CategoriesContextProvider} from './context/categoriesContext';
import {AppThemeProvider} from './context/themeContext';
import SplashScreen from 'react-native-splash-screen';
import {RevenueCatProvider} from './context/RevenueCatContext';
import {AboutModalProvider} from './context/AboutModalContext';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {AnalysisContextProvider} from './context/AnalysisContext';
import NetInfo from "@react-native-community/netinfo";
import RNRestart from 'react-native-restart';

const App = () => {
  const colorScheme = Appearance.getColorScheme();
  const [barScheme, setBarScheme] = useState('default');
  const [isConnected, setIsConnected] = useState(true);


  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
    const bar_theme = colorScheme === 'dark' ? 'dark-content' : 'light-content';
    setBarScheme(bar_theme);
  }, []);


    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected === false){
        //console.log("Not connected");
        Alert.alert('Unable to Connect', 'Please check your internet connection and try again', [
          {
          text: 'Try Again',
          onPress: () => RNRestart.restart(),
          },
      ]);
      } else if (state.isConnected === true){
        console.log("Connected to Internet")
      }
    
    // Examples on what's seen on console are:
    // 'Connection type', 'wifi'
    // 'Connection type', 'none'
    });

    useEffect(() => {
      unsubscribe();
    }, []);

  

  const handleStatusBarChange = theme => {
    setBarScheme(theme);
  };
  const handleNotification = () => {
    console.log('Button pressed, sending notification...');
    PushNotificationIOS.addNotificationRequest({
      id: '1', // Unique ID for the notification
      title: 'Hello',
      body: 'This is a notification!',
      userInfo: {}, // Optional additional data
      fireDate: new Date().getTime() + 1000, // Ensures the notification is scheduled for immediate delivery
    });
  };

  return (
    <Auth0Provider
      domain={'dev-zoejuo0jssw5jiid.us.auth0.com'}
      clientId={'K5bEigOfEtz4Devpc7kiZSYzzemPLIlg'}>
      <RevenueCatProvider>
        <UserProvider>
          <UserIdProvider>
            <AppThemeProvider>
              <SafeAreaView
                style={[
                  styles.container,
                  {
                    backgroundColor:
                      colorScheme === 'dark' ? '#0A0A0A' : '#EDEDED',
                  },
                ]}>
                <StatusBar barStyle={barScheme} />
                <CategoriesContextProvider>
                  <TopMenuContextProvider>
                    <AnalysisContextProvider>
                      <AboutModalProvider>
                        <Navigation />
                        {/* <View >
                        <Button title="Trigger Notification" onPress={handleNotification} />
                      </View> */}
                      </AboutModalProvider>
                    </AnalysisContextProvider>
                  </TopMenuContextProvider>
                </CategoriesContextProvider>
              </SafeAreaView>
            </AppThemeProvider>
          </UserIdProvider>
        </UserProvider>
      </RevenueCatProvider>
    </Auth0Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
  },
});
