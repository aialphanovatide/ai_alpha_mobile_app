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
  Dimensions,
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
import { RawUserIdProvider } from './context/RawUserIdContext';
import {CategoriesContextProvider} from './context/categoriesContext';
import {AppThemeProvider} from './context/themeContext';
import SplashScreen from 'react-native-splash-screen';
import {RevenueCatProvider} from './context/RevenueCatContext';
import {AboutModalProvider} from './context/AboutModalContext';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {AnalysisContextProvider} from './context/AnalysisContext';
import NetInfo from "@react-native-community/netinfo";
import RNRestart from 'react-native-restart';
import useWebSocket, {ReadyState}  from 'react-native-use-websocket';
import ThemeButton from './components/ThemeButton/ThemeButton';
import {AppThemeContext} from './context/themeContext';
import { getService } from './services/aiAlphaApi';
import { SocketProvider } from './components/Alerts/Socket';
import { SocketContext } from './components/Alerts/Socket';

const App = () => {
  const colorScheme = Appearance.getColorScheme();
  //console.log("color scheme ->", colorScheme);
  const [barScheme, setBarScheme] = useState('default');
  const [isConnected, setIsConnected] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const {socket} = useContext(SocketContext);
  const [serverWentDown, setServerWentDown] = useState(0);

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


  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
    const bar_theme = colorScheme === 'dark' ? 'light-content' : 'dark-content';
    setBarScheme(bar_theme);
  }, [colorScheme]); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getService('/get_categories');
        //console.log("CATEGORIES -> ", data)
        setServerError(false);
        if (serverWentDown == 1){
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

  const checkConnectivityAndCloseModal = async () => {
    const state = await NetInfo.fetch();
    setIsConnected(state.isConnected);
    // If the internet is back, close the modal
    if (state.isConnected) {
      setModalVisible(false);
    } else {
      // Optionally, you can alert the user that they're still offline
      Alert.alert('No Internet Connection', 'You are still offline. Please check your internet connection.');
    }
  };

  return (
    <SocketProvider>
    <Auth0Provider
      domain={'dev-zoejuo0jssw5jiid.us.auth0.com'}
      clientId={'K5bEigOfEtz4Devpc7kiZSYzzemPLIlg'}>
      <RevenueCatProvider>
        <UserProvider>
          <UserIdProvider>
            <RawUserIdProvider>
            <AppThemeProvider>
              <SafeAreaView
                style={[
                  styles.container,
                  {
                    backgroundColor:
                      colorScheme === 'dark' ? '#0b0b0a' : '#fbfbfa',
                  },
                ]}>
                <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
                <CategoriesContextProvider>
                  <TopMenuContextProvider>
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
                          <View style={[styles.orangeBox, {backgroundColor:
                              colorScheme === 'dark' ? '#451205' : '#FFF7EC'},]}>
                            <View style={styles.row}>
                              <Image source={require('./assets/images/login/nointernet.png')} style={styles.imageStyle1} />
                              <Text style={[styles.labelText1,{
                                  color:
                                  colorScheme === 'dark' ? '#FF8D34' : '#FF6C0D',
                              },]}>It seems that you are offline.</Text>
                            </View>
                            <View style={styles.row}>
                              <Image source={require('./assets/images/login/reloadsymbol.png')} style={styles.imageStyle2} />
                              <TouchableOpacity onPress={checkConnectivityAndCloseModal}>
                                <Text style={styles.labelText2}>Reload</Text>
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
                          <View style={[styles.orangeBox, {backgroundColor:
                            colorScheme === 'dark' ? '#451205' : '#FFF7EC'},]}>
                            <View style={styles.row}>
                              <Image source={require('./assets/images/login/serverdown.png')} style={styles.imageStyle3} />
                              <Text style={[styles.labelText1,{
                                color: colorScheme === 'dark' ? '#FF8D34' : '#FF6C0D',
                              },]}>Seems like the server is down</Text>
                            </View>
                            <Text style={[styles.labelText3,{
                                color: colorScheme === 'dark' ? '#FF6C0D' : '#A02E0C',
                            },]}>Please wait a few minutes while our technicians work to solve this problem</Text>
                          </View>
                        </View>
                      </Modal>
                    </AboutModalProvider>
                    </AnalysisContextProvider>
                  </TopMenuContextProvider>
                </CategoriesContextProvider>
              </SafeAreaView>
            </AppThemeProvider>
            </RawUserIdProvider>
          </UserIdProvider>
        </UserProvider>
      </RevenueCatProvider>
    </Auth0Provider>
    </SocketProvider>
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
    justifyContent: "center",
    alignItems: "center",
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
