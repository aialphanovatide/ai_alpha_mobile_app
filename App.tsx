import React, {useEffect} from 'react';
import Navigation from './navigation/Navigation';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  Appearance,
} from 'react-native';
import Purchases from 'react-native-purchases';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import PaywallScreen from './components/Login/Screens/PaywallScreen';
import {IOS_API_KEY, ANDROID_API_KEY} from '@env';
import {ENTITLEMENT_ID} from './src/constants';
import Router from './src/navigation/Router';
import {API_KEY} from './src/constants';
import {TopMenuContextProvider} from './context/topMenuContext';
import {UserProvider} from './context/UserContext';
import topTenGainersService from './services/TopTenGainersService';
import {UserIdProvider} from './context/UserIdContext';
import {CategoriesContextProvider} from './context/categoriesContext';
import {AppThemeProvider} from './context/themeContext';

const App = () => {
  const colorScheme = Appearance.getColorScheme();
  useEffect(() => {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.VERBOSE);
    if (Platform.OS === 'ios') {
      Purchases.configure({apiKey: IOS_API_KEY});
    } else if (Platform.OS === 'android') {
      Purchases.configure({apiKey: ANDROID_API_KEY});
    }
  }, []);

  console.log('Entitlement id: ', ENTITLEMENT_ID);

  const showUserSubscriptionData = async () => {
    try {
      //const purchaseMade = await Purchases.purchasePackage(purchasePackage);
      const customerInfo = await Purchases.getCustomerInfo();

      if (
        typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined'
      ) {
        console.log('User is pro');
      }
      console.log('Customer info:', customerInfo);
    } catch (error) {
      console.log('Error purchasing package:', error);
    }
  };
  showUserSubscriptionData();

  return (
    <UserProvider>
      <UserIdProvider>
        <SafeAreaView
          style={[
            styles.container,
            {backgroundColor: colorScheme === 'dark' ? '#242427' : '#E7EAF1'},
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
