import React, {useContext} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import useTopTenGainersStyles from '../TopTenGainersStyle';
import FastImage from 'react-native-fast-image';
import {AppThemeContext} from '../../../../context/themeContext';

export const GainerLoserCard = ({
  item,
  position,
  handleItemPress,
  categories,
}) => {
  const styles = useTopTenGainersStyles();
  const {isDarkMode} = useContext(AppThemeContext);
  const findCategoryOfItem = (coin, fullName) => {
    if (!categories || categories.length === 0) {
      return null;
    }
    if (coin.toLowerCase() === 'matic') {
      coin = 'pol';
    }
    const found = categories.find(category => {
      return (
        category.coin_bots.length > 0 &&
        category.coin_bots.some(categoryCoin => {
          return (
            categoryCoin.bot_name.toLowerCase() === coin.toLowerCase() ||
            categoryCoin.bot_name.toLowerCase() === fullName.toLowerCase()
          );
        })
      );
    });
    return found !== undefined ? found : null;
  };
  const itemCategory = findCategoryOfItem(item.symbol, item.name);
  return (
    <TouchableOpacity
      onPress={() => handleItemPress(item.symbol.toLowerCase(), itemCategory)}
      style={[
        styles.itemContainer,
        position !== 10
          ? {
              borderRightWidth: 2,
              borderRightColor: isDarkMode ? '#18181B' : '#F4F4F5',
            }
          : {
              marginRight: 16,
            },
      ]}>
      <Text style={styles.itemPosition}>{position}</Text>
      <FastImage
        style={styles.icon}
        source={{uri: item.image, cache: FastImage.cacheControl.immutable}}
        resizeMode="contain"
      />
      <View style={styles.column}>
        <View style={styles.dataRow}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemSymbol}>{item.symbol}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.price}>{item.currentPrice.toFixed(2)}</Text>
          <View
            style={[
              styles.priceChangeContainer,
              item.priceChange24H >= 0
                ? styles.incrementBackground
                : styles.decrementBackground,
            ]}>
            {item.priceChange24H >= 0 ? (
              <Text style={[styles.priceChange, styles.increment]}>▲</Text>
            ) : (
              <Text style={[styles.priceChange, styles.decrement]}>▼</Text>
            )}
            <Text
              style={[
                styles.priceChange,
                item.priceChange24H >= 0 ? styles.increment : styles.decrement,
              ]}>
              {item.priceChange24H.toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
