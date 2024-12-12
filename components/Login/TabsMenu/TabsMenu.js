import React, {useContext, useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Home from '../../Home/Home';
import Alerts from '../../Alerts/alerts';
import {Image, View} from 'react-native';
import HomeStackScreen from '../../../navigation/HomeStack';
import {AppThemeContext} from '../../../context/themeContext';
import DashboardScreen from '../../../navigation/DashboardStack';
import AccountScreen from '../../../navigation/AccountStack';
import {useNavigation} from '@react-navigation/core';
import {RevenueCatContext} from '../../../context/RevenueCatContext';
import {useScreenOrientation} from '../../../hooks/useScreenOrientation';
import AskAiScreen from '../../../navigation/AskAiStack';
import LinearGradient from 'react-native-linear-gradient';
import useNavbarStyles from './NavbarStyles';
import IntroductoryPopUpsOverlay from '../../IntroductorySlides/IntroductoryPopUps/IntroductoryPopUpsOverlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {selectUserId} from '../../../actions/userActions';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectActiveCoin,
  selectActiveSubCoin,
} from '../../../actions/categoriesActions';
import {updateActiveSubCoin} from '../../../store/categoriesSlice';
import {
  fetchAskAiData,
  fetchAvailableCoins,
} from '../../../actions/askAiActions';

// Note:
// isLandscape -> The device is rotated horizontally
// isHorizontal -> The 'rotate button' is pressed

const Tab = createBottomTabNavigator();

const MenuIcon = ({color, iconSource}) => {
  const styles = useNavbarStyles();
  const {isLandscape, isHorizontal} = useScreenOrientation();

  if (isLandscape && isHorizontal) {
    return <></>;
  }

  return (
    <View style={[styles.iconContainer]}>
      <Image
        style={[styles.icon, {tintColor: color}]}
        resizeMode={'contain'}
        source={iconSource}
      />
    </View>
  );
};

const TabsMenu = () => {
  // const {updateActiveCoin, updateActiveSubCoin, activeCoin, activeSubCoin} =
  //   useContext(TopMenuContext);
  const activeCoin = useSelector(selectActiveCoin);
  const activeSubCoin = useSelector(selectActiveSubCoin);
  const navigation = useNavigation();
  const {theme, isDarkMode} = useContext(AppThemeContext);
  const userId = useSelector(selectUserId);
  const {init} = useContext(RevenueCatContext);
  const {isLandscape, isHorizontal} = useScreenOrientation();
  const styles = useNavbarStyles();
  const [activePopUps, setActivePopUps] = useState(false);
  const dispatch = useDispatch();

  // Hook to load the variable to know if it is the first time that the user opens the app, or not, to show the introductory pop-ups at the Home section

  useEffect(() => {
    const checkShowIntroductoryPopUp = async () => {
      const popUpsData = await AsyncStorage.getItem('hasIntroduced');
      let shouldShowPopUp = popUpsData === 'false' ? true : false;
      setActivePopUps(shouldShowPopUp);
      await AsyncStorage.setItem('hasIntroduced', 'true');
    };
    checkShowIntroductoryPopUp();
  }, []);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
      }),
    [navigation],
  );

  useEffect(() => {
    init(userId);
    return () => {
      console.log('RevenueCat data configured succesfully');
    };
  }, []);

  // Hook to dispatch the ask ai available coins, for having them to make the initial searchs

  useEffect(() => {
    dispatch(fetchAvailableCoins());
  }, [dispatch]);

  const handleActivePopUps = () => {
    setActivePopUps(false);
  };

  return (
    <GestureHandlerRootView style={[{flex: 1}]}>
      {activePopUps && activePopUps !== undefined ? (
        <IntroductoryPopUpsOverlay
          handleActivePopUps={handleActivePopUps}
          visible={activePopUps}
        />
      ) : (
        <></>
      )}

      <Tab.Navigator
        initialRouteName={Home}
        backBehavior={isLandscape && isHorizontal ? 'none' : 'initialRoute'}
        screenOptions={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarStyle: Platform.select({
            ios: {
              borderBlockColor: 'transparent',
              height: isLandscape || isHorizontal ? 0 : 90,
              paddingTop: 8,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: theme.navbarBgColor,
              shadowColor: '#000',
              shadowOpacity: 0.19,
              shadowRadius: 4,
            },
            android: {
              borderBlockColor: 'transparent',
              height: isLandscape && isHorizontal ? 0 : 90,
              paddingTop: 8,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: theme.navbarBgColor,
              elevation: 0,
            },
          }),
          tabBarActiveTintColor: theme.activeOrange,
          tabBarLabelStyle: {
            marginBottom: 10,
            fontSize: theme.responsiveFontSize * 0.8,
            fontFamily: theme.fontSemibold,
          },
          tabBarHideOnKeyboard: true,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({focused, color}) =>
              isHorizontal ? null : (
                <MenuIcon
                  color={color}
                  iconSource={
                    focused
                      ? require('../../../assets/images/bottomMenu/home-active.png')
                      : require('../../../assets/images/bottomMenu/home.png')
                  }
                />
              ),
          }}
        />
        <Tab.Screen
          name="Alerts"
          component={Alerts}
          options={{
            tabBarLabel: 'Alerts',
            tabBarIcon: ({focused, color}) =>
              isHorizontal ? null : (
                <MenuIcon
                  color={color}
                  iconSource={
                    focused
                      ? require('../../../assets/images/bottomMenu/alerts-active.png')
                      : require('../../../assets/images/bottomMenu/alerts.png')
                  }
                />
              ),
          }}
          listeners={{
            focus: e => {
              if (activeSubCoin && (!activeCoin || activeCoin === undefined)) {
                dispatch(updateActiveSubCoin(null));
              }
            },
          }}
        />
        <Tab.Screen
          name="AskAi"
          component={AskAiScreen}
          options={{
            tabBarLabel: 'ASK AI',
            tabBarIcon: ({focused}) =>
              isHorizontal ? null : (
                <View
                  style={[
                    styles.buttonWrapper,
                    focused ? styles.focusedButton : {},
                  ]}>
                  <LinearGradient
                    useAngle={false}
                    colors={['#F9B208', '#FC5404']}
                    style={styles.askAiButton}>
                    <Image
                      style={styles.buttonImage}
                      source={require('../../../assets/images/askAi/askai-icon.png')}
                      resizeMode="contain"
                    />
                  </LinearGradient>
                </View>
              ),
          }}
          listeners={{
            focus: e => {
              if (activeSubCoin && (!activeCoin || activeCoin === undefined)) {
                dispatch(updateActiveSubCoin(null));
              }
            },
          }}
        />
        <Tab.Screen
          name="Analysis"
          component={DashboardScreen}
          options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({focused, color}) =>
              isHorizontal ? null : (
                <MenuIcon
                  color={color}
                  iconSource={
                    focused
                      ? require('../../../assets/images/bottomMenu/analysis-active.png')
                      : require('../../../assets/images/bottomMenu/analysis.png')
                  }
                />
              ),
          }}
          listeners={{
            tabPress: e => {
              navigation.navigate('Analysis', {screen: 'DashboardMain'});
            },
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({focused, color}) =>
              isHorizontal ? null : (
                <MenuIcon
                  color={color}
                  iconSource={
                    focused
                      ? require('../../../assets/images/bottomMenu/account-active.png')
                      : require('../../../assets/images/bottomMenu/account.png')
                  }
                />
              ),
          }}
          initialParams={{
            screen: 'AccountMain',
          }}
          listeners={{
            tabPress: e => {
              navigation.navigate('Account', {screen: 'AccountMain'});
            },
          }}
        />
      </Tab.Navigator>
    </GestureHandlerRootView>
  );
};

export default TabsMenu;
