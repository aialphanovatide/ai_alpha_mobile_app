import React, {useContext, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import Fundamentals from './Topmenu/subMenu/Fund_news_chart/Fundamentals/Fundamentals';
import TopMenu from './Topmenu/mainMenu/topmenu';
import SubMenu from './Topmenu/subMenu/SubMenu';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CandlestickChart from './Topmenu/subMenu/Fund_news_chart/Charts';
import NewsComponent from './Topmenu/subMenu/Fund_news_chart/News/NewsComponent.js';
import {TopMenuContext} from '../../context/topMenuContext';
import NewsArticle from './Topmenu/subMenu/Fund_news_chart/News/NewsArticle';
import {AppThemeContext} from '../../context/themeContext';

const HomeStack = createNativeStackNavigator();
const TopmenuStack = createNativeStackNavigator();
const SubMenuStack = createMaterialTopTabNavigator();
const NewsStack = createNativeStackNavigator();

const NewsScreen = () => {
  const {activeSubCoin} = useContext(TopMenuContext);
  return (
    <NewsStack.Navigator
      initialRouteName="NewsMain"
      backBehavior={'none'}
      screenOptions={{headerShown: false}}>
      <NewsStack.Screen
        name="NewsMain"
        component={NewsComponent}
        initialParams={{botname: activeSubCoin}}
      />
      <NewsStack.Screen name="NewsArticle" component={NewsArticle} />
    </NewsStack.Navigator>
  );
};

const SubMenuScreen = () => {
  const {activeSubCoin} = useContext(TopMenuContext);
  const {theme} = useContext(AppThemeContext);
  return (
    <SubMenuStack.Navigator
      initialRouteName="Charts"
      backBehavior={'none'}
      style={{backgroundColor: theme.mainBackgroundColor}}
      screenOptions={{
        swipeEnabled: false,
        tabBarShowLabel: true,
        tabBarShowIcon: false,
        tabBarLabelStyle: {
          fontSize: theme.responsiveFontSize * 0.75,
          fontWeight: 'bold',
          color: theme.subMenuTextColor,
        },
        tabBarStyle: {
          height: '8%',
          marginVertical: 2.5,
          marginHorizontal: 5,
          backgroundColor: theme.subMenuBgColor,
          borderRadius: 5,
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#42444550',
          height: '100%',
        },
        tabBarGap: 5,
        tabBarPressColor: 'transparent',
        tabBarActiveTintColor: '#959BB260',
      }}>
      <SubMenuStack.Screen name="Fundamentals" component={Fundamentals} />
      <SubMenuStack.Screen
        name="Charts"
        component={CandlestickChart}
        initialParams={{
          interval: '1h',
          symbol: `${activeSubCoin}USDT`,
          coinBot: activeSubCoin,
        }}
        // Replace the component prop with the correct component, passing the props that it needs with the initialParams prop, structuring it the way that is right before this comment. I tried to do it the way that was before but throws an error with the request so you may fix that.
        // component={ChartScreen}
      />
      <SubMenuStack.Screen name="News" component={NewsScreen} />
    </SubMenuStack.Navigator>
  );
};

const TopmenuScreen = () => {
  const {activeSubCoin, activeCoin} = useContext(TopMenuContext);
  const [forceUpdate, setForceUpdate] = useState(false);
  const {theme} = useContext(AppThemeContext);

  useEffect(() => {
    setForceUpdate(prevState => !prevState);
  }, [activeSubCoin, activeCoin]);
  return (
    <TopmenuStack.Navigator
      initialRouteName={'SubMenuScreen'}
      backBehavior="initialRoute"
      screenOptions={{
        header: () => <SubMenu />,
        headerStyle: {
          backgroundColor: theme.mainBackgroundColor,
        },
      }}>
      <TopmenuStack.Screen
        name="SubMenuScreen"
        component={SubMenuScreen}
        key={forceUpdate}
      />
    </TopmenuStack.Navigator>
  );
};

const HomeStackScreen = () => {
  const {updateActiveCoin} = useContext(TopMenuContext);

  return (
    <HomeStack.Navigator
      initialRouteName="InitialHome"
      backBehavior="initialRoute"
      screenOptions={{header: () => <TopMenu />}}>
      <HomeStack.Screen
        name="InitialHome"
        component={Home}
        listeners={{
          focus: e => {
            updateActiveCoin({});
          },
        }}
      />
      <HomeStack.Screen name="TopMenuScreen" component={TopmenuScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
