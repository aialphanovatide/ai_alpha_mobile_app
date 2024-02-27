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
import {Animated, TouchableOpacity, View} from 'react-native';
import useHomeStyles from './HomeStyles';
import AnalysisArticle from './Analysis/AnalysisArticle';

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

const FundNewsChartsMenu = ({state, descriptors, navigation, position}) => {
  const styles = useHomeStyles();

  return (
    <View style={styles.menuContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, isFocused && styles.activeItem]}
            onPress={onPress}
            onLongPress={onLongPress}>
            <Animated.Text
              style={[styles.menuItemText, isFocused && styles.activeText]}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const SubMenuScreen = () => {
  const {activeSubCoin} = useContext(TopMenuContext);
  const {theme} = useContext(AppThemeContext);
  return (
    <SubMenuStack.Navigator
      initialRouteName="Charts"
      backBehavior={'none'}
      screenOptions={{
        swipeEnabled: false,
      }}
      tabBar={props => <FundNewsChartsMenu {...props} />}>
      <SubMenuStack.Screen
        name="Fundamentals"
        component={Fundamentals}
        initialParams={{
          activeCoin: activeSubCoin,
        }}
      />
      <SubMenuStack.Screen
        name="Charts"
        component={CandlestickChart}
        initialParams={{
          interval: '1h',
          symbol: `${activeSubCoin}USDT`,
          coinBot: activeSubCoin,
        }}
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
        header: () => <SubMenu isAlertsMenu={false} />,
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
      screenOptions={{header: () => <TopMenu isAlertsMenu={false} />}}>
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
      <HomeStack.Screen
        name="AnalysisArticleScreen"
        component={AnalysisArticle}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
