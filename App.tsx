import React, {useContext, useEffect, useState} from 'react';
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
import {AboutModalProvider} from './context/AboutModalContext';

const App = () => {
  const colorScheme = Appearance.getColorScheme();
  const [barScheme, setBarScheme] = useState('default');

  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
    const bar_theme = colorScheme === 'dark' ? 'dark-content' : 'light-content';
    setBarScheme(bar_theme);
  }, []);

  const handleStatusBarChange = theme => {
    setBarScheme(theme);
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
                    <AboutModalProvider>
                      <Navigation />
                    </AboutModalProvider>
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
