import React, {useContext, useEffect, useState} from 'react';
import {View, ScrollView, Text} from 'react-native';
import MenuItem from './menuItem/menuItem';
import styles from './topmenuStyles';
import {TopMenuContext} from '../../../../context/topMenuContext';
import {useNavigation} from '@react-navigation/core';
import {CategoriesContext} from '../../../../context/categoriesContext';

const TopMenu = () => {
  const {updateActiveCoin, updateActiveSubCoin} = useContext(TopMenuContext);
  const {categories} = useContext(CategoriesContext);
  const navigation = useNavigation();

  const handleButtonPress = category => {
    updateActiveCoin(category);
    updateActiveSubCoin(category.coin_bots[0].bot_name);
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
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories ? (
          categories.map(category => (
            <MenuItem
              key={category.category_id}
              icon={category.category}
              onPress={() => handleButtonPress(category)}
              category={category}
              isActive={category.is_active}
            />
          ))
        ) : (
          <View style={styles.loadingMessage}>
            <Text style={styles.text}>Loading...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default TopMenu;
