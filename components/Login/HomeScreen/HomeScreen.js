import {TopMenuContext} from '../../../context/topMenuContext';
import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Home from '../../Home/Home';
import Chatbot from '../../Chatbot/Chatbot';
import Alerts from '../../Alerts/alerts';
import {Image, View} from 'react-native';
import styles from './HomeScreenStyles';
import HomeStackScreen from '../../Home/HomeStack';
import {AppThemeContext} from '../../../context/themeContext';
import AnalysisScreen from '../../Analysis/AnalysisStack';
import AccountScreen from '../../Account/AccountStack';
import {useNavigation} from '@react-navigation/core';
import {RevenueCatContext} from '../../../context/RevenueCatContext';
import {useUserId} from '../../../context/UserIdContext';

const Tab = createBottomTabNavigator();

const MenuIcon = ({color, iconSource}) => {
  return (
    <View style={styles.iconContainer}>
      <Image
        style={[styles.icon, {tintColor: color}]}
        resizeMode={'contain'}
        source={iconSource}
      />
    </View>
  );
};

const HomeScreen = () => {
  const {updateActiveSubCoin, activeCoin, activeSubCoin} =
    useContext(TopMenuContext);
  const navigation = useNavigation();
  const {theme, isDarkMode} = useContext(AppThemeContext);
  const {userId} = useUserId();
  const {init} = useContext(RevenueCatContext);

  useEffect(() => {
    init(userId);
    return () => {
      console.log('RevenueCat data configured succesfully');
    };
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Tab.Navigator
        initialRouteName={Home}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.navbarBgColor,
            // shadowColor: isDarkMode ? 'transparent' : '#000000',
            // shadowOffset: isDarkMode
            //   ? {width: 0, height: 0}
            //   : {width: 2, height: 4},
            // shadowOpacity: isDarkMode ? 0 : 0.125,
            // shadowRadius: isDarkMode ? 0 : 6,
            elevation: 0,
          },
          tabBarActiveTintColor: theme.activeOrange,
          tabBarLabelStyle: {
            marginBottom: 10,
            fontSize: theme.responsiveFontSize * 0.8,
            fontFamily: theme.fontSemibold
          },
        }}>
        <Tab.Screen
          name="Home"
          listeners={{
            tabPress: e => {
              // updateActiveCoin({});
              // updateActiveSubCoin(null);
            },
          }}
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({focused, color, size}) => (
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
            tabBarIcon: ({focused, color, size}) => (
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
                updateActiveSubCoin(null);
              }
            },
          }}
        />
        {/*<Tab.Screen
          name="Chatbot"
          component={Chatbot}
          options={{
            tabBarLabel: 'Chatbot',
            tabBarIcon: ({focused, color, size}) => (
              <MenuIcon
                color={color}
                iconSource={
                  focused
                    ? require('../../../assets/images/bottomMenu/chatbot-active.png')
                    : require('../../../assets/images/bottomMenu/chatbot.png')
                }
              />
            ),
          }}
        />*/}

        <Tab.Screen
          name="Analysis"
          component={AnalysisScreen}
          options={{
            tabBarLabel: 'Analysis',
            tabBarIcon: ({focused, color, size}) => (
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
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({focused, color, size}) => (
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

export default HomeScreen;
