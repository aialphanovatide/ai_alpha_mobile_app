import React, {useEffect} from 'react';
import Navigation from './navigation/Navigation';
import {
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
