import {TopMenuContext} from '../../../context/topMenuContext';
import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Home from '../../Home/Home';
import Chatbot from '../../Chatbot/Chatbot';
import Alerts from '../../Alerts/alerts';
import {Image, View} from 'react-native';
import HomeStackScreen from '../../Home/HomeStack';
import {AppThemeContext} from '../../../context/themeContext';
import AnalysisScreen from '../../Analysis/AnalysisStack';
import AccountScreen from '../../Account/AccountStack';
import {useNavigation} from '@react-navigation/core';
import {RevenueCatContext} from '../../../context/RevenueCatContext';
import {useUserId} from '../../../context/UserIdContext';
import {useScreenOrientation} from '../../../hooks/useScreenOrientation';
import AskAiScreen from '../../AskAi/AskAiStack';
import LinearGradient from 'react-native-linear-gradient';
import useNavbarStyles from './HomeScreenStyles';

const Tab = createBottomTabNavigator();

const MenuIcon = ({color, iconSource}) => {
  const styles = useNavbarStyles();
  const {isLandscape, isHorizontal} = useScreenOrientation();
  return (
    <View
      style={[
        styles.iconContainer,
        isLandscape && isHorizontal && {display: 'none'},
      ]}>
      <Image
        style={[styles.icon, {tintColor: color}]}
        resizeMode={'contain'}
        source={iconSource}
      />
    </View>
  );
};

const HomeScreen = () => {
  const {updateActiveCoin, updateActiveSubCoin, activeCoin, activeSubCoin} =
    useContext(TopMenuContext);
  const navigation = useNavigation();
  const {theme, isDarkMode} = useContext(AppThemeContext);
  const {userId} = useUserId();
  const {init} = useContext(RevenueCatContext);
  const {isLandscape, isHorizontal} = useScreenOrientation();
  const styles = useNavbarStyles();

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

  return (
    <GestureHandlerRootView style={[{flex: 1}]}>
      <Tab.Navigator
        initialRouteName={Home}
        backBehavior={isLandscape && isHorizontal ? 'none' : 'initialRoute'}
        screenOptions={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarStyle: {
            height: isLandscape && isHorizontal ? 0 : 70,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.navbarBgColor,
            elevation: 0,
          },
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
        <Tab.Screen
          name="AskAi"
          component={AskAiScreen}
          options={{
            tabBarLabel: 'Ask AI',
            tabBarIcon: ({focused}) => {
              return (
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
              );
            },
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
        {/* <Tab.Screen
          name="Search"
          component={SearchScreen}
          listeners={{
            tabPress: e => {
              navigation.navigate('Search', {updatedSection: true});
            },
          }}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({focused, color, size}) => (
              <MenuIcon
                color={color}
                iconSource={
                  focused
                    ? require('../../../assets/images/bottomMenu/search-active.png')
                    : require('../../../assets/images/bottomMenu/search.png')
                }
              />
            ),
          }}
        /> */}
      </Tab.Navigator>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
