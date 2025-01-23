import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, ScrollView, Animated} from 'react-native';
import MenuItem from './menuItem/menuItem';
import useTopMenuStyles from './topmenuStyles';
import {useNavigation, useRoute} from '@react-navigation/core';
import {AppThemeContext} from '../../../../context/themeContext';
import SkeletonLoader from '../../../Loader/SkeletonLoader';
import NotificationsButton from '../../HomeNotifications/NotificationsButton';
import SearchWithBar from '../../../Search/SearchWithBar';
import BackgroundGradient from '../../../BackgroundGradient/BackgroundGradient';
import {HeaderVisibilityContext} from '../../../../context/HeadersVisibilityContext';
import {useScreenOrientation} from '../../../../hooks/useScreenOrientation';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchCategories,
  fetchCategoriesV2,
  selectActiveCoin,
  selectCategories,
  selectCategoriesLoading,
} from '../../../../actions/categoriesActions';
import {
  updateActiveCoin,
  updateActiveSubCoin,
} from '../../../../store/categoriesSlice';
import {loadNotificationItems} from '../../../../actions/notificationActions';
import {setLastCoin} from '../../../../store/alertsSlice';
import {fetchAlertsByCoin} from '../../../../actions/alertsActions';

const TopMenu = ({isAlertsMenu}) => {
  const routeName = useRoute().name;
  const styles = useTopMenuStyles();
  const [searchText, setSearchText] = useState('');
  const [activeSearchBar, setActiveSearchBar] = useState(false);
  const [menuVisible, setMenuVisible] = useState(true);
  const activeCoin = useSelector(selectActiveCoin);
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectCategoriesLoading);
  const navigation = useNavigation();
  const {isDarkMode} = useContext(AppThemeContext);
  const topMenuScrollRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);
  const {isLandscape, isHorizontal} = useScreenOrientation();
  const dispatch = useDispatch();

  // Fetch the categories data from the store
  useEffect(() => {
    dispatch(fetchCategoriesV2());
  }, [dispatch]);

  // Function to handle the button pressing of a category, setting it as active and navigating to the corresponding section. In case the category has more coins, set the first coin as active. Also, the top menu scrolls the category to the middle of the view.
  const handleButtonPress = (category, index) => {
    if (activeCoin.category_name === category.category_name) {
      setScrollX(0);
      setTimeout(() => {
        if (topMenuScrollRef.current) {
          topMenuScrollRef.current.scrollTo({
            x: 0,
            animated: true,
          });
        }
      }, 20);
      navigation.navigate('Home', {screen: 'InitialHome'});
    } else {
      dispatch(updateActiveCoin(category));
      dispatch(updateActiveSubCoin(category.coin_bots[0].bot_name));
      // dispatch(
      //   fetchAlertsByCoin({
      //     coins: category.coin_bots[0].bot_name,
      //     timeInterval: '4H',
      //   }),
      // );
      if (!isAlertsMenu) {
        navigation.navigate('TopMenuScreen', {
          screen: 'SubMenuScreen',
          params: {
            screen: 'Fundamentals',
          },
        });
      }
    }
  };

  const scrollToActiveCategory = category => {
    const index = findIndexByCategory(category);
    setTimeout(() => {
      if (topMenuScrollRef.current) {
        const itemWidth = 60;
        const scrollViewWidth = itemWidth * categories.length;
        const scrollOffset = itemWidth * index;
        const scrollPosition =
          scrollOffset > scrollViewWidth || index <= 2
            ? 0
            : scrollOffset > scrollX && scrollOffset <= 300
            ? scrollOffset - 30
            : scrollOffset > scrollX
            ? scrollOffset + 10
            : scrollOffset - 30;
        topMenuScrollRef.current.scrollTo({
          x: scrollX >= 700 ? 700 : scrollPosition,
          animated: true,
        });
      }
    }, 100);
  };

  // Hook to handle the scroll feature of the top menu when switching between categories or redirecting from clicking a topTenGainers item

  useEffect(() => {
    if (
      Object.keys(activeCoin).length !== 0 &&
      activeCoin &&
      activeCoin !== undefined
    ) {
      scrollToActiveCategory(activeCoin);
    } else {
      setScrollX(0);
      setTimeout(() => {
        if (topMenuScrollRef.current) {
          topMenuScrollRef.current.scrollTo({
            x: 0,
            animated: true,
          });
        }
      }, 20);
    }
  }, [activeCoin]);

  const findIndexByCategory = category => {
    const found = categories.findIndex(
      cat =>
        category.category_name.toLowerCase() ===
        cat.category_name.toLowerCase(),
    );
    return found !== -1 ? found : 0;
  };

  const toggleActiveSearchBar = value => {
    setActiveSearchBar(value);
  };

  const toggleMenuVisible = value => {
    setMenuVisible(value);
  };

  const toggleTextValue = value => {
    setSearchText(value);
  };

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    setScrollX(offsetX);
  };

  // Function to handle the redirect to the home notifications screen, loading the latest notification items
  const handleNotificationsNavigation = () => {
    dispatch(loadNotificationItems());
    if (routeName.includes('Alerts')) {
      navigation.navigate('Home', {screen: 'HomeNotificationsScreen'});
    } else {
      navigation.navigate('HomeNotificationsScreen');
    }
  };

  // Scroll and hide the top menu variables and functions

  const {headersVisibility} = useContext(HeaderVisibilityContext);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedValue, {
        toValue: headersVisibility.TopMenu ? 0 : isAlertsMenu ? -75 : -100,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {});
  }, [headersVisibility.TopMenu, animatedValue, opacity]);

  if (routeName.includes('HomeNotifications')) {
    return null;
  }

  return (
    <View
      style={[
        styles.topContentWrapper,
        searchText.length === 0
          ? {}
          : {
              // height: 700
            },
        !headersVisibility.TopMenu
          ? isAlertsMenu
            ? {height: 115}
            : {height: 1}
          : {},
        isLandscape && isHorizontal ? {height: 0} : {},
      ]}>
      <BackgroundGradient />
      <Animated.View
        style={[
          {
            transform: [{translateY: animatedValue}],
            opacity: opacity,
            overflow: 'hidden',
          },
        ]}>
        <View
          style={[
            styles.marginWrapper,
            searchText.length > 0
              ? {width: '100%', height: '100%', alignItems: 'flex-start'}
              : {},
          ]}>
          {menuVisible && (
            <NotificationsButton
              handleButtonPress={handleNotificationsNavigation}
              activeSearchBar={activeSearchBar}
            />
          )}
          <SearchWithBar
            toggleMenuVisible={toggleMenuVisible}
            toggleTextValue={toggleTextValue}
            searchText={searchText}
            activeSearchBar={activeSearchBar}
            toggleSearchBar={toggleActiveSearchBar}
          />
        </View>
        <View style={styles.container}>
          {menuVisible ? (
            <ScrollView
              horizontal
              ref={topMenuScrollRef}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              bounces={false}>
              {loading === 'idle' ? (
                <SkeletonLoader type={'circle'} quantity={14} />
              ) : categories ? (
                categories.map((category, index) => (
                  <MenuItem
                    key={category.category_id}
                    onPress={() => handleButtonPress(category, index)}
                    category={category}
                    isDarkMode={isDarkMode}
                    isActive={
                      activeCoin &&
                      activeCoin !== undefined &&
                      activeCoin === category
                    }
                  />
                ))
              ) : (
                <></>
              )}
            </ScrollView>
          ) : (
            <></>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

export default TopMenu;
