import React, {useEffect} from 'react';
import Navigation from './navigation/Navigation';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  Appearance,
} from 'react-native';
<<<<<<< HEAD
import Purchases from 'react-native-purchases';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import PaywallScreen from './components/Login/Screens/PaywallScreen';
//import {IOS_API_KEY, ANDROID_API_KEY} from '@env';
import {ENTITLEMENT_ID} from './src/constants';
import Router from './src/navigation/Router';
import {API_KEY} from './src/constants';
=======
import {useAuth0, Auth0Provider} from 'react-native-auth0';
import Keys from 'react-native-keys';
>>>>>>> f923d6e37d2cf50fbe583fe5fd48d0c1186a194d
import {TopMenuContextProvider} from './context/topMenuContext';
import {UserProvider} from './context/UserContext';
import {UserIdProvider} from './context/UserIdContext';
import {CategoriesContextProvider} from './context/categoriesContext';
import {AppThemeProvider} from './context/themeContext';
import SplashScreen from 'react-native-splash-screen';
import {RevenueCatProvider} from './context/RevenueCatContext';


const App = () => {
  const colorScheme = Appearance.getColorScheme();

  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <Auth0Provider
      domain={'dev-zoejuo0jssw5jiid.us.auth0.com'}
      clientId={'K5bEigOfEtz4Devpc7kiZSYzzemPLIlg'}>
      <RevenueCatProvider>
        <UserProvider>
          <UserIdProvider>
            <SafeAreaView
              style={[
                styles.container,
                {
                  backgroundColor:
                    colorScheme === 'dark' ? '#242427' : '#E7EAF1',
                },
              ]}>
              <StatusBar barStyle="dark-content" />
              <AppThemeProvider>
                <CategoriesContextProvider>
                  <TopMenuContextProvider>
                    <Navigation />
                  </TopMenuContextProvider>
                </CategoriesContextProvider>
              </AppThemeProvider>
            </SafeAreaView>
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
    backgroundColor: '#242427',
  },
});
