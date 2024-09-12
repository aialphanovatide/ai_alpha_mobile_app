import React, {useContext, useEffect, useState} from 'react';
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
  const {isDarkMode} = useContext(AppThemeContext);
  const handleButtonPress = category => {
    if (activeCoin.category_name === category.category_name) {
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

  const toggleActiveSearchBar = value => {
    setActiveSearchBar(value);
  };

  const toggleMenuVisible = value => {
    setMenuVisible(value);
  };

  const toggleTextValue = value => {
    setSearchText(value);
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
      <View style={[styles.marginWrapper]}>
        {menuVisible && (
          <NotificationsButton
            handleButtonPress={handleNotificationsNavigation}
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
            showsHorizontalScrollIndicator={false}
            bounces={false}>
            {loading ? (
              <SkeletonLoader type={'circle'} quantity={14} />
            ) : categories ? (
              categories.map(category => (
                <MenuItem
                  key={category.category_id}
                  onPress={() => handleButtonPress(category)}
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
