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
import SearchBar from '../../SearchBar/SearchBar';
import LinearGradient from 'react-native-linear-gradient';
import SkeletonLoader from '../../../Loader/SkeletonLoader';
import NotificationsButton from '../../HomeNotifications/NotificationsButton';
import Search from '../../../Search/Search';

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
    navigation.navigate('HomeNotificationsScreen');
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
      <Modal transparent={true} visible={searchText.length > 0}>
        <View style={styles.modal}>
          <SearchBar
            toggleMenuVisible={toggleMenuVisible}
            toggleTextValue={toggleTextValue}
            searchText={searchText}
            activeSearchBar={true}
            toggleSearchBar={toggleActiveSearchBar}
          />
          <Search
            currentTextValue={searchText}
            contentVisible={searchText.length > 0}
          />
        </View>
      </Modal>
      <View style={[styles.marginWrapper]}>
        <SearchBar
          toggleMenuVisible={toggleMenuVisible}
          toggleTextValue={toggleTextValue}
          searchText={searchText}
          activeSearchBar={activeSearchBar}
          toggleSearchBar={toggleActiveSearchBar}
        />
        <NotificationsButton
          handleButtonPress={handleNotificationsNavigation}
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
              <View style={styles.loadingMessage}>
                <Text style={styles.text}>Loading...</Text>
              </View>
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