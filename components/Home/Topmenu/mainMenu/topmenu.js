import React, {useContext} from 'react';
import {View, ScrollView, Text} from 'react-native';
import MenuItem from './menuItem/menuItem';
import useTopMenuStyles from './topmenuStyles';
import {TopMenuContext} from '../../../../context/topMenuContext';
import {useNavigation} from '@react-navigation/core';
import {CategoriesContext} from '../../../../context/categoriesContext';
import {AppThemeContext} from '../../../../context/themeContext';

const TopMenu = ({isAlertsMenu}) => {
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
  return (
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
  );
};

export default TopMenu;