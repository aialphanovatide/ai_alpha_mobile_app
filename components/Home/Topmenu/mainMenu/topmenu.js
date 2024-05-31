import React, {useContext, useEffect, useState} from 'react';
import {View, ScrollView, Text} from 'react-native';
import MenuItem from './menuItem/menuItem';
import useTopMenuStyles from './topmenuStyles';
import {TopMenuContext} from '../../../../context/topMenuContext';
import {useNavigation, useRoute} from '@react-navigation/core';
import {CategoriesContext} from '../../../../context/categoriesContext';
import {AppThemeContext} from '../../../../context/themeContext';
import SearchBar from '../../SearchBar/SearchBar';
import LinearGradient from 'react-native-linear-gradient';

const TopMenu = ({isAlertsMenu}) => {
  const routeName = useRoute().name;
  const styles = useTopMenuStyles();
  const {updateActiveCoin, updateActiveSubCoin, activeCoin} =
    useContext(TopMenuContext);
  const {categories} = useContext(CategoriesContext);
  const navigation = useNavigation();
  const {isDarkMode} = useContext(AppThemeContext);
  const handleButtonPress = category => {
    updateActiveCoin(category);
    updateActiveSubCoin(category.coin_bots[0].bot_name);
    if (!isAlertsMenu) {
      navigation.pop(1);
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
  };

  const handleSearchSectionNavigation = () => {
    navigation.navigate('SearchScreen', {
      screen: 'SearchMain',
    });
  };

  if (routeName.includes('Search')) {
    return null;
  }

  return (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
      style={styles.topContentWrapper}>
      {isAlertsMenu || routeName.includes('TopMenu') ? (
        <></>
      ) : (
        <SearchBar
          handleSearchSectionNavigation={handleSearchSectionNavigation}
        />
      )}
      <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories ? (
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
            <View style={styles.loadingMessage}>
              <Text style={styles.text}>Loading...</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default TopMenu;
