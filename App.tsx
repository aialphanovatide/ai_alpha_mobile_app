import React, {useEffect, useState, useContext} from 'react';
import Navigation from './navigation/Navigation';
import {
  View,
  Alert,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  Appearance,
  Text,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import {useAuth0, Auth0Provider} from 'react-native-auth0';
import Keys from 'react-native-keys';
import {TopMenuContextProvider} from './context/topMenuContext';
import {UserProvider} from './context/UserContext';
import {UserIdProvider} from './context/UserIdContext';
import {RawUserIdProvider, useRawUserId} from './context/RawUserIdContext';
import {CategoriesContextProvider} from './context/categoriesContext';
import {AppThemeProvider, AppThemeContext} from './context/themeContext';
import SplashScreen from 'react-native-splash-screen';
import {RevenueCatProvider} from './context/RevenueCatContext';
import {AboutModalProvider} from './context/AboutModalContext';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {AnalysisContextProvider} from './context/AnalysisContext';
import NetInfo from '@react-native-community/netinfo';
import RNRestart from 'react-native-restart';
import {getService} from './services/aiAlphaApi';
import {SocketProvider} from './components/Alerts/Socket';
import io from 'socket.io-client';
import {NarrativeTradingContextProvider} from './context/NarrativeTradingContext';
import {SingletonHooksContainer} from 'react-singleton-hook';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
import {
  auth0Client,
  auth0Domain,
  auth0ManagementAPI_Client,
  auth0ManagementAPI_Secret,
} from './src/constants/index';
import UserService from './services/UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import eventEmitter from './eventEmitter';
import LinearGradient from 'react-native-linear-gradient';


PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const colorScheme = Appearance.getColorScheme();
  const [barScheme, setBarScheme] = useState('default');
  const [isConnected, setIsConnected] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [serverWentDown, setServerWentDown] = useState(0);

  useEffect(() => {
    console.log('HERE 1111111111');
    const subscription = eventEmitter.addListener('darkModeChanged', isDark => {
      console.log('HERE 22222222');
      setIsDarkMode(isDark);
    });

    return () => {
      subscription.remove();
    };
  }, []);
  /*
  useEffect(() => {
    console.log("socket->", socket);
    //socket.emit('message', 'Hello server!');
    if (socket) { // Only proceed if `socket` is not null
      console.log('Entered not null socket flow')
      socket.on('new_alert', (data) => {
        console.log(`Received message: ${data}`);
      });
  
      // Clean up the event listener when the component unmounts or the socket changes
      return () => {
        socket.off('new_alert');
      };
    }
  }, [socket]); // Re-run the effect if `socket` changes
  */

  const saveNotification = async alertData => {
    const extractCryptoName = symbol => {
      const suffix = 'USDT';
      const index = symbol.indexOf(suffix);
      if (index !== -1) {
        console.log(
          'Found the coin name',
          symbol.substring(0, index).toLowerCase(),
        );
        return symbol.substring(0, index).toLowerCase();
      }
      return symbol;
    };

    try {
      const storedNotifications = await AsyncStorage.getItem('notifications');
      const currentNotifications = storedNotifications
        ? JSON.parse(storedNotifications)
        : [];

      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      const notificationDate = `${day}/${month}/${year}`;

      const notificationCoin = extractCryptoName(alertData.title);
      const notificationType = alertData.type;

      const newNotification = {
        title: alertData.title,
        description: alertData.body,
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

      console.log('Saving notification: ', newNotification);
      await AsyncStorage.setItem(
        'notifications',
        JSON.stringify(combinedNotifications),
      );
    } catch (error) {
      console.error('Error saving notifications:', error);
    }
  };

  // useEffect(() => {
  //   console.log('NEw INITIALIZING SOCKET');
  //   const socket = io('https://aialpha.ngrok.io/');
  //   socket.on('new_alert', messageData => {
  //     console.log('Received message:', messageData);
  //     console.log('SOCKET ID --->', socket.id);
  //     const data =
  //       typeof messageData === 'string' ? JSON.parse(messageData) : messageData;
  //     const {alert_name, message} = data;

  //     let {last_price} = data;
  //     last_price = last_price.replace(/\.$/, '');

  //     if (Platform.OS === 'android') {
  //       Alert.alert(alert_name, `${message}\nPrice: ${last_price}`);
  //     }
  //     saveNotification(data);
  //   });
  // }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
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
        if (serverWentDown == 1) {
          RNRestart.restart();
          setServerWentDown(0);
        }
      } catch (error) {
        setServerWentDown(1);
        setServerError(true);
      }
    };
    console.log('Fetching categories');
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
        Alert.alert(
          `${remoteMessage.notification?.title}`,
          `${remoteMessage.notification?.body}`,
          [
            {
              text: 'Got it!',
              onPress: () => {
                saveNotification(remoteMessage.notification);
              },
              style: 'destructive',
            },
          ],
        );
      },
    );

    getUserNotificationsToken();

    return () => {
      pushNotificationsSubscriber;
    };
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setModalVisible(!state.isConnected); // Show modal when not connected
      if (state.isConnected) {
        //console.log("Connected to Internet");
        setRefreshTrigger(prev => prev + 1);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (refreshTrigger > 0) {
      //console.log('Internet is back, refreshing content...');
    }
  }, [refreshTrigger]);

  const handleStatusBarChange = theme => {
    setBarScheme(theme);
  };

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
    <AppThemeProvider>
      <Auth0Provider domain={auth0Domain} clientId={auth0Client}>
        <RevenueCatProvider>
          <UserProvider>
            <UserIdProvider>
              <RawUserIdProvider>
                <AppThemeProvider>
                <SafeAreaView style={{ flex:0, backgroundColor: isDarkMode ? '#0F0F0F' : '#EDEDED'}}>
                </SafeAreaView>
                  <SafeAreaView
                    style={[
                      styles.container,
                      {
                        flex: 1,
                        backgroundColor: isDarkMode ? '#0b0b0a' : '#fbfbfa',
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
                    <CategoriesContextProvider>
                      <TopMenuContextProvider>
                        <NarrativeTradingContextProvider>
                          <AnalysisContextProvider>
                            <AboutModalProvider>
                              <Navigation />
                              {/* <View >
                        <Button title="Trigger Notification" onPress={handleNotification} />
                      </View>
                      */}
                              <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                  setModalVisible(false);
                                }}>
                                <View style={styles.centeredView}>
                                  <View
                                    style={[
                                      styles.orangeBox,
                                      {
                                        backgroundColor:
                                          colorScheme === 'dark'
                                            ? '#451205'
                                            : '#FFF7EC',
                                      },
                                    ]}>
                                    <View style={styles.row}>
                                      <Image
                                        source={require('./assets/images/login/nointernet.png')}
                                        style={styles.imageStyle1}
                                      />
                                      <Text
                                        style={[
                                          styles.labelText1,
                                          {
                                            color:
                                              colorScheme === 'dark'
                                                ? '#FF8D34'
                                                : '#FF6C0D',
                                          },
                                        ]}>
                                        It seems that you are offline.
                                      </Text>
                                    </View>
                                    <View style={styles.row}>
                                      <Image
                                        source={require('./assets/images/login/reloadsymbol.png')}
                                        style={styles.imageStyle2}
                                      />
                                      <TouchableOpacity
                                        onPress={
                                          checkConnectivityAndCloseModal
                                        }>
                                        <Text style={styles.labelText2}>
                                          Reload
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                </View>
                              </Modal>
                              <Modal
                                animationType="slide"
                                transparent={true}
                                visible={serverError}
                                onRequestClose={() => {
                                  setServerError(false);
                                }}>
                                <View style={styles.centeredView}>
                                  <View
                                    style={[
                                      styles.orangeBox,
                                      {
                                        backgroundColor:
                                          colorScheme === 'dark'
                                            ? '#451205'
                                            : '#FFF7EC',
                                      },
                                    ]}>
                                    <View style={styles.row}>
                                      <Image
                                        source={require('./assets/images/login/serverdown.png')}
                                        style={styles.imageStyle3}
                                      />
                                      <Text
                                        style={[
                                          styles.labelText1,
                                          {
                                            color:
                                              colorScheme === 'dark'
                                                ? '#FF8D34'
                                                : '#FF6C0D',
                                          },
                                        ]}>
                                        Seems like the server is down
                                      </Text>
                                    </View>
                                    <Text
                                      style={[
                                        styles.labelText3,
                                        {
                                          color:
                                            colorScheme === 'dark'
                                              ? '#FF6C0D'
                                              : '#A02E0C',
                                        },
                                      ]}>
                                      Please wait a few minutes while our
                                      technicians work to solve this problem
                                    </Text>
                                  </View>
                                </View>
                              </Modal>
                            </AboutModalProvider>
                          </AnalysisContextProvider>
                        </NarrativeTradingContextProvider>
                      </TopMenuContextProvider>
                    </CategoriesContextProvider>
                  </SafeAreaView>
                </AppThemeProvider>
              </RawUserIdProvider>
            </UserIdProvider>
          </UserProvider>
        </RevenueCatProvider>
      </Auth0Provider>
    </AppThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
