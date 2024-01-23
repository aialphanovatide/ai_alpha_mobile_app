import React, {useEffect} from 'react';
import Navigation from './navigation/Navigation';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  Appearance,
} from 'react-native';
import Keys from 'react-native-keys';
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
import SplashScreen from 'react-native-splash-screen';
import {RevenueCatProvider} from './context/RevenueCatContext';

const App = () => {
  const colorScheme = Appearance.getColorScheme();
  /*
  useEffect(() => {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.VERBOSE);
    if (Platform.OS === 'ios') {
      Purchases.configure({apiKey: API_KEY});
    } else if (Platform.OS === 'android') {
      Purchases.configure({apiKey: ANDROID_API_KEY});
    }
    const showUserSubscriptionData = async () => {
      try {
        const customerInfo = await Purchases.getCustomerInfo();
        console.log('Customer info:', customerInfo);
      } catch (error) {
        console.log('Error purchasing package:', error);
      }
    };
    showUserSubscriptionData();
  }, []);
    //const purchaseMade = await Purchases.purchasePackage(purchasePackage);
    // console.log('Monthly offerings: ', offerings.all.Default.monthly);
    console.log(
      'Default available packages: ',
      offerings.all.Default.availablePackages,
    );
    setTimeout(async () => {
      try {
        const purchaseMade = await Purchases.purchasePackage(
          offerings.all.Default.monthly,
        );
        const customerInfo = await Purchases.getCustomerInfo();
        if (
          typeof purchaseMade.customerInfo.entitlements.active[
            ENTITLEMENT_ID
          ] !== 'undefined'
        ) {
          console.log('User bought a package!');
        }
      } catch (error) {
        console.log('Error purchasing the package: ', error);
      }
    }, 5000);
    // if (offerings.current !== null) {
    //   console.log(offerings.current);
    // }
    // if (
    //   typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !==
    //   'undefined'
    // ) {
    //   console.log('User is pro');
    // }
    // console.log('Customer info:', customerInfo);

  */

  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  console.log('Entitlement id: ', ENTITLEMENT_ID);

  console.log("Aca: ", Keys.API_URL);
  Keys.URI_SCHEME;

  // const showUserSubscriptionData = async () => {
  //   try {
  //     //const purchaseMade = await Purchases.purchasePackage(purchasePackage);
  //     const customerInfo = await Purchases.getCustomerInfo();

  //     if (
  //       typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined'
  //     ) {
  //       console.log('User is pro');
  //     }
  //     console.log('Customer info:', customerInfo);
  //   } catch (error) {
  //     console.log('Error purchasing package:', error);
  //   }
  // };
  // showUserSubscriptionData();

  return (
    <RevenueCatProvider>
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
    </RevenueCatProvider>
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
