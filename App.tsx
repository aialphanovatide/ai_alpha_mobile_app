import React, {useEffect, useState, useContext} from 'react';
import Navigation from './navigation/Navigation';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  Appearance,
  Dimensions,
} from 'react-native';
import {useAuth0, Auth0Provider} from 'react-native-auth0';
import {TopMenuContextProvider} from './context/topMenuContext';
import {AppThemeProvider} from './context/themeContext';
import {RevenueCatProvider} from './context/RevenueCatContext';
import NetInfo from '@react-native-community/netinfo';
import RNRestart from 'react-native-restart';
import {getService} from './services/aiAlphaApi';
import {SingletonHooksContainer} from 'react-singleton-hook';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
import {AUTH0_CLIENT_ENVVAR, AUTH0_DOMAIN_ENVVAR} from '@env';
import eventEmitter from './eventEmitter';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ConnectivityModal from './components/ConnectivityModal/ConnectivityModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomSplashScreen from './components/SplashScreen/SplashScreen';
import {HeaderVisibilityProvider} from './context/HeadersVisibilityContext';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {
  findCoinNameBySymbol,
  findCoinSymbolByName,
} from './components/Home/Topmenu/subMenu/Fund_news_chart/Fundamentals/SubSections/Competitors/coinsNames';

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
const {width, height} = Dimensions.get('window');

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState(
    isDarkMode ? '#0b0b0a' : '#fbfbfa',
  );
  const [upperBackgroundColor, setUpperBackgroundColor] = useState(
    isDarkMode ? '#0F0F0F' : '#E5E5E5',
  );
  const colorScheme = Appearance.getColorScheme();
  const [barScheme, setBarScheme] = useState('default');
  const [isConnected, setIsConnected] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [serverWentDown, setServerWentDown] = useState(0);
  const [initialAnimationFinished, setInitialAnimationFinished] =
    useState(false);

  useEffect(() => {
    setTimeout(() => {
      setInitialAnimationFinished(true);
    }, 3500);
  }, []);

  useEffect(() => {
    const darkModeSubscription = eventEmitter.addListener(
      'darkModeChanged',
      isDark => {
        setIsDarkMode(isDark);
        setBackgroundColor(isDark ? '#0b0b0a' : '#fbfbfa');
        setUpperBackgroundColor(isDark ? '#0F0F0F' : '#E5E5E5');
      },
    );

    const backgroundColorSubscription = eventEmitter.addListener(
      'backgroundColorChange',
      color => {
        setBackgroundColor(color);
        setUpperBackgroundColor(color);
      },
    );

    return () => {
      darkModeSubscription.remove();
      backgroundColorSubscription.remove();
    };
  }, []);

  const saveNotification = async alertData => {
    const MAX_NOTIFICATIONS = 50;
    try {
      const symbol =
        findCoinSymbolByName(alertData.data.coin) || alertData.data.coin;
      const storedNotifications = await AsyncStorage.getItem('notifications');
      const currentNotifications = storedNotifications
        ? JSON.parse(storedNotifications)
        : [];

      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      const notificationDate = `${day}/${month}/${year}`;

      const notificationCoin = symbol;
      const notificationType =
        alertData.data.type !== undefined
          ? alertData.data.type
          : alertData.notification.title.toLowerCase().includes('chart')
          ? 'alerts'
          : 'analysis';

      const newNotification = {
        title: alertData.notification.title,
        description:
          alertData.data.type !== 'analysis'
            ? alertData.notification.body
            : 'New analysis posted!',
        coin: notificationCoin,
        date: notificationDate,
        category: null,
        type: notificationType,
      };

      const combinedNotifications = [
        ...currentNotifications,
        newNotification,
      ].filter(
        (item, index, self) =>
          index ===
          self.findIndex(t => t.title === item.title && t.date === item.date),
      );

      if (combinedNotifications.length > MAX_NOTIFICATIONS) {
        combinedNotifications.splice(
          0,
          combinedNotifications.length - MAX_NOTIFICATIONS,
        );
      }

      console.log('Saving notification: ', newNotification);
      await AsyncStorage.setItem(
        'notifications',
        JSON.stringify(combinedNotifications),
      );
    } catch (error) {
      console.error('Error saving notifications:', error);
    }
  };

  useEffect(() => {
    const bar_theme = colorScheme === 'dark' ? 'light-content' : 'dark-content';
    setBarScheme(bar_theme);
  }, [colorScheme]);

  // useEffect that checks the Server status for showing the "server down" pop-up, it sends a request
  // to the categories endpoint since it is the one that gives the data used across all the app, and
  // which is the most visible indicator of the server status

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getService('/get_categories');
        setServerError(false);
        if (data.length === 0) {
          throw new Error(
            'Error trying to get categories: the server is down.',
          );
        }
        if (serverWentDown === 1) {
          RNRestart.restart();
          setServerWentDown(0);
        }
      } catch (error) {
        setServerWentDown(1);
        setServerError(true);
      }
    };
    fetchCategories();
    const intervalId = setInterval(fetchCategories, 120000); // 120000 milliseconds = 2 minutes
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const getUserNotificationsToken = async () => {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      console.log('User firebase token: ', token);
    };
    const pushNotificationsSubscriber = messaging().onMessage(
      async remoteMessage => {
        console.log('Received notification: ', remoteMessage);
        Alert.alert(
          `${remoteMessage.notification?.title}`,
          `${remoteMessage.notification?.body}`,
          [
            {
              text: 'Got it!',
              onPress: () => {
                saveNotification(remoteMessage);
              },
              style: 'destructive',
            },
          ],
        );
      },
    );

    getUserNotificationsToken();

    return () => {
      pushNotificationsSubscriber();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setModalVisible(!state.isConnected);
      if (state.isConnected) {
        setRefreshTrigger(prev => prev + 1);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (refreshTrigger > 0) {
    }
  }, [refreshTrigger]);

  const checkConnectivityAndCloseModal = async () => {
    const state = await NetInfo.fetch();
    setIsConnected(state.isConnected);
    // If the internet is back, close the modal
    if (state.isConnected) {
      setModalVisible(false);
    } else {
      // Optionally, you can alert the user that they're still offline
      Alert.alert(
        'No Internet Connection',
        'You are still offline. Please check your internet connection.',
      );
    }
  };

  return (
    <Auth0Provider domain={AUTH0_DOMAIN_ENVVAR} clientId={AUTH0_CLIENT_ENVVAR}>
      <Provider store={store}>
        <TopMenuContextProvider>
          <RevenueCatProvider>
            <HeaderVisibilityProvider>
              <AppThemeProvider>
                <SafeAreaView
                  style={{
                    flex: 0,
                    backgroundColor:
                      upperBackgroundColor === '#FC5404'
                        ? '#FFB76E'
                        : upperBackgroundColor,
                  }}></SafeAreaView>
                <SafeAreaView
                  style={[
                    styles.container,
                    {
                      flex: 1,
                      backgroundColor:
                        backgroundColor === '#FFB76E'
                          ? '#FC5404'
                          : backgroundColor,
                    },
                  ]}>
                  <StatusBar
                    barStyle={
                      isDarkMode
                        ? 'light-content'
                        : 'dark-content' /*This changes the font color for SafeAreaView*/
                    }
                  />
                  <SingletonHooksContainer />
                  <GestureHandlerRootView style={{flex: 1}}>
                    {!initialAnimationFinished ? (
                      <CustomSplashScreen />
                    ) : (
                      <Navigation />
                    )}
                    <ConnectivityModal
                      serverError={serverError}
                      setModalVisible={setModalVisible}
                      modalVisible={modalVisible}
                      setServerError={setServerError}
                      checkConnectivityAndCloseModal={
                        checkConnectivityAndCloseModal
                      }
                      type="connection"
                    />
                    <ConnectivityModal
                      serverError={serverError}
                      setModalVisible={setModalVisible}
                      modalVisible={modalVisible}
                      setServerError={setServerError}
                      checkConnectivityAndCloseModal={
                        checkConnectivityAndCloseModal
                      }
                      type="serverDown"
                    />
                  </GestureHandlerRootView>
                </SafeAreaView>
              </AppThemeProvider>
            </HeaderVisibilityProvider>
          </RevenueCatProvider>
        </TopMenuContextProvider>
      </Provider>
    </Auth0Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  orangeBox: {
    top: '30%',
    width: '98%',
    backgroundColor: '#FFF7EC',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 20,
    borderWidth: 1,
    borderColor: '#FF6C0D',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  imageStyle1: {
    width: 35,
    height: 28,
    marginRight: 30,
  },
  imageStyle2: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  imageStyle3: {
    width: 26,
    height: 25,
    marginLeft: 40,
    marginRight: 20,
    marginBottom: 10,
  },
  labelText1: {
    color: '#FF6C0D',
    fontSize: 16,
    marginRight: 60,
    fontFamily: 'Prompt',
  },
  labelText2: {
    color: '#FF6C0D',
    fontSize: 16,
    textDecorationLine: 'underline',
    fontFamily: 'Prompt',
    fontWeight: '500',
  },
  labelText3: {
    fontSize: 10,
    fontFamily: 'Prompt',
    textAlign: 'center',
  },
});
