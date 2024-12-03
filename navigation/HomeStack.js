import React, {useContext, useEffect, useRef, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../components/Home/Home';
import Fundamentals from '../components/Home/Topmenu/subMenu/Fund_news_chart/Fundamentals/Fundamentals';
import TopMenu from '../components/Home/Topmenu/mainMenu/topmenu';
import SubMenu from '../components/Home/Topmenu/subMenu/SubMenu';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CandlestickChart from '../components/Home/Topmenu/subMenu/Fund_news_chart/Charts/CandlestickChart';
import NewsComponent from '../components/Home/Topmenu/subMenu/Fund_news_chart/News/NewsComponent.js';
import NewsArticle from '../components/Home/Topmenu/subMenu/Fund_news_chart/News/NewsArticle';
import {AppThemeContext} from '../context/themeContext';
import {Animated, TouchableOpacity, View} from 'react-native';
import useHomeStyles from '../components/Home/HomeStyles';
import MarketNarrativesArticle from '../components/Home/HomeNarrativeTradings/MarketNarrativesArticle';
import {useScreenOrientation} from '../hooks/useScreenOrientation';
import {useNavigation} from '@react-navigation/native';
import Search from '../components/Search/Search';
import HomeNotifications from '../components/Home/HomeNotifications/HomeNotifications';
import ChartsSection from '../components/Home/Topmenu/subMenu/Fund_news_chart/Charts/NewCharts/ChartsSection';
import StoryArticle from '../components/Home/TopStories/StoryArticle';
import DailyDeepArticle from '../components/Home/Analysis/DailyDeepArticle';
import {useDispatch, useSelector} from 'react-redux';
import {selectActiveCoin, selectActiveSubCoin} from '../actions/categoriesActions';
import { resetActiveCoin } from '../store/categoriesSlice';

const HomeStack = createNativeStackNavigator();
const TopmenuStack = createNativeStackNavigator();
const SubMenuStack = createMaterialTopTabNavigator();
const NewsStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();

const SearchScreen = () => {
  return (
    <SearchStack.Navigator
      initialRouteName="SearchMain"
      screenOptions={{
        animation: 'fade',
        animationDuration: 200,
        lazy: true,
        swipeEnabled: false,
        header: () => null,
      }}>
      <SearchStack.Screen
        name={'SearchMain'}
        component={Search}
        initialParams={{searchText: ''}}
      />
    </SearchStack.Navigator>
  );
};

const NewsScreen = () => {
  const activeSubCoin = useSelector(selectActiveSubCoin);

  return (
    <NewsStack.Navigator
      initialRouteName="NewsMain"
      backBehavior={'none'}
      screenOptions={{
        headerShown: false,
      }}>
      <NewsStack.Screen
        name="NewsMain"
        component={NewsComponent}
        initialParams={{botname: activeSubCoin}}
        options={{
          animation: 'fade',
        }}
      />
      <NewsStack.Screen
        name="NewsArticle"
        component={NewsArticle}
        options={{
          animation: 'slide_from_right',
          animationDuration: 150,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
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
  const activeSubCoin = useSelector(selectActiveSubCoin);
  const navigation = useNavigation();
  const {isLandscape, isHorizontal, handleScreenOrientationChange} =
    useScreenOrientation();

  useEffect(() => {
    const handleBackInteraction = e => {
      if (isLandscape && isHorizontal) {
        e.preventDefault();
        handleScreenOrientationChange('PORTRAIT');
        navigation.canGoBack(false);
      }
    };

    const listenerHandler = navigation.addListener('beforeRemove', e => {
      handleBackInteraction(e);
    });
    return () => {
      listenerHandler();
    };
  }, [isLandscape, isHorizontal, navigation]);

  return (
    <SubMenuStack.Navigator
      backBehavior={
        isLandscape && isHorizontal ? 'initialRoute' : 'initialRoute'
      }
      initialRouteName="Fundamentals"
      screenOptions={{
        lazy: true,
        swipeEnabled: false,
        gestureEnabled: isLandscape && isHorizontal ? false : true,
      }}
      tabBar={props =>
        isLandscape && isHorizontal ? null : <FundNewsChartsMenu {...props} />
      }>
      <SubMenuStack.Screen
        name="Fundamentals"
        component={Fundamentals}
        initialParams={{
          activeCoin: activeSubCoin,
        }}
        options={{
          animation: 'fade',
        }}
      />
      <SubMenuStack.Screen
        name="Charts"
        component={CandlestickChart}
        initialParams={{
          interval: '1w',
          symbol: `${activeSubCoin}USDT`,
          coinBot: activeSubCoin,
        }}
        options={{
          animation: 'fade',
        }}
      />
      <SubMenuStack.Screen name="News" component={NewsScreen} />
    </SubMenuStack.Navigator>
  );
};

const TopmenuScreen = () => {
  const activeSubCoin = useSelector(selectActiveSubCoin);
  const activeCoin = useSelector(selectActiveCoin);
  const [forceUpdate, setForceUpdate] = useState(false);
  const {theme} = useContext(AppThemeContext);

  const {isLandscape, isHorizontal} = useScreenOrientation();

  useEffect(() => {
    setForceUpdate(prevState => !prevState);
  }, [activeSubCoin, activeCoin]);
  return (
    <TopmenuStack.Navigator
      initialRouteName={'SubMenuScreen'}
      screenOptions={{
        animation: 'fade',
        gestureEnabled: isLandscape && isHorizontal ? false : true,
        header: () =>
          isLandscape && isHorizontal ? null : <SubMenu isAlertsMenu={false} />,
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
  const {isLandscape, isHorizontal} = useScreenOrientation();
  const {theme} = useContext(AppThemeContext);
  const dispatch = useDispatch();

  return (
    <HomeStack.Navigator
      initialRouteName="InitialHome"
      gestureEnabled="false"
      screenOptions={{
        animationDuration: 250,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        header: () =>
          isLandscape && isHorizontal ? null : <TopMenu isAlertsMenu={false} />,
      }}>
      <HomeStack.Screen
        name="InitialHome"
        component={Home}
        gestureEnabled="false"
        listeners={{
          focus: e => {
            dispatch(resetActiveCoin());
          },
        }}
        options={{
          animation: 'slide_from_left',
        }}
      />
      <HomeStack.Screen
        name="TopMenuScreen"
        component={TopmenuScreen}
        options={{
          animation: 'fade',
        }}
      />
      <HomeStack.Screen
        name="DailyDeepScreen"
        component={DailyDeepArticle}
        options={{
          animation: 'fade',
          animationDuration: 250,
          gestureEnabled: 'true',
          gestureDirection: 'horizontal',
        }}
      />
      <HomeStack.Screen
        name="TopStoriesArticle"
        component={StoryArticle}
        options={{
          animation: 'slide_from_right',
          animationDuration: 250,
          gestureEnabled: 'true',
          gestureDirection: 'horizontal',
        }}
      />
      <HomeStack.Screen
        name="MarketNarrativeArticleScreen"
        component={MarketNarrativesArticle}
        options={{
          animation: 'fade',
          animationDuration: 250,
          gestureEnabled: 'true',
          gestureDirection: 'horizontal',
        }}
      />
      <HomeStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          animation: 'fade',
        }}
      />
      <HomeStack.Screen
        name="HomeNotificationsScreen"
        component={HomeNotifications}
        options={{
          animation: 'slide_from_right',
          animationDuration: 200,
        }}
      />
    </HomeStack.Navigator>
  );
};
export default HomeStackScreen;
