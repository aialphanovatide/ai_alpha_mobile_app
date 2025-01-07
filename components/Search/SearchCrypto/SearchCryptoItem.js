import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {findCoinNameBySymbol} from '../../Home/Topmenu/subMenu/Fund_news_chart/Fundamentals/SubSections/Competitors/coinsNames';
import FastImage from 'react-native-fast-image';

// Component to render the Crypto item in the Search section. It displays the image, name, and acronym of the crypto. It receives the crypto data, the category, the function to handle the press on the item, the styles, and flags to check if it is the last item and if it is in dark mode as props.

export const SearchCryptoItem = ({
  crypto,
  category,
  styles,
  handleCryptoItemNavigation,
  isDarkMode,
  isLastItem,
}) => {
  const name = findCoinNameBySymbol(crypto.bot_name.toUpperCase());
  return (
    <TouchableOpacity
      onPress={() => handleCryptoItemNavigation(category, crypto)}
      style={[styles.cryptoItem, isLastItem ? {borderBottomWidth: 0} : {}]}>
      <FastImage
        source={{
          uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/coins/${crypto.bot_name}.png`,
          priority: FastImage.priority.normal,
        }}
        resizeMode="contain"
        style={styles.cryptoItemImage}
      />
      <View style={styles.row}>
        <Text style={styles.cryptoName}>{name}</Text>
        <Text style={styles.cryptoAcronym}>
          {crypto.bot_name.toUpperCase()}
        </Text>
      </View>
      <Image
        source={require('../../../assets/images/arrow-right.png')}
        style={styles.rightArrowImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};
