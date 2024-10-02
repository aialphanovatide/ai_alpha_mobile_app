import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Modal,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import MenuItem from './menuItem/menuItem';
import useTopMenuStyles from './topmenuStyles';
import {TopMenuContext} from '../../../../context/topMenuContext';
import {useNavigation, useRoute} from '@react-navigation/core';
import {CategoriesContext} from '../../../../context/categoriesContext';
import {AppThemeContext} from '../../../../context/themeContext';
import LinearGradient from 'react-native-linear-gradient';
import SkeletonLoader from '../../../Loader/SkeletonLoader';
import NotificationsButton from '../../HomeNotifications/NotificationsButton';
import SearchWithBar from '../../../Search/SearchWithBar';

const TopMenu = ({isAlertsMenu}) => {
  const routeName = useRoute().name;
  const styles = useTopMenuStyles();
  const [searchText, setSearchText] = useState('');
  const [activeSearchBar, setActiveSearchBar] = useState(false);
  const [menuVisible, setMenuVisible] = useState(true);
  const {updateActiveCoin, updateActiveSubCoin, activeCoin} =
    useContext(TopMenuContext);
  const {categories, loading} = useContext(CategoriesContext);
  const navigation = useNavigation();
  const {theme, isDarkMode} = useContext(AppThemeContext);
  const topMenuScrollRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);

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
      updateActiveCoin(category);
      updateActiveSubCoin(category.coin_bots[0].bot_name);
      if (!isAlertsMenu) {
        navigation.navigate('TopMenuScreen', {
          screen: 'SubMenuScreen',
          params: {
            screen: 'Charts',
            params: {
              interval: '1h',
              symbol: `${category.coin_bots[0].bot_name}USDT`,
              coinBot: category.coin_bots[0].bot_name,
            },
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
        // console.log('Scroll view width: ', scrollViewWidth);
        // console.log('Scroll view scroll x: ', scrollX);
        // console.log('Scroll view new position: ', scrollPosition);
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

  const handleNotificationsNavigation = () => {
    if (routeName.includes('Alerts')) {
      navigation.navigate('Home', {screen: 'HomeNotificationsScreen'});
    } else {
      navigation.navigate('HomeNotificationsScreen');
    }
  };

  if (routeName.includes('HomeNotifications')) {
    return null;
  }

  return (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0F0F0F', '#171717'] : ['#F5F5F5', '#E5E5E5']}
      locations={[0.22, 0.97]}
      style={styles.topContentWrapper}>
      <View style={[
          styles.marginWrapper,
          searchText.length > 0 && Platform.OS === 'ios'
            ? {width: '100%', height: 650, alignItems: 'flex-end'}
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
            {loading ? (
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
    </LinearGradient>
  );
};

export default TopMenu;
