import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import useCoinMenuStyles from './coinMenuStyles';

const CoinMenu = ({subCoins, activeSubCoin, handleCoinPress}) => {
  const activeButtonColors = [
    'firstActiveButton',
    'secondActiveButton',
    'thirdActiveButton',
  ];
  const styles = useCoinMenuStyles();
  return subCoins?.length > 1 ? (
    <View style={styles.menu}>
      <View style={styles.subMenu}>
        {subCoins.map((coin, index) => (
          <TouchableOpacity
            key={coin.bot_id}
            style={[
              styles.subMenuButton,
              activeSubCoin === coin.bot_name &&
                styles[activeButtonColors[index]],
            ]}
            onPress={() => {
              handleCoinPress(coin.bot_name);
            }}>
            {activeSubCoin === coin.bot_name && (
              <Image
                source={require('../../../../../assets/images/topMenu/submenu_triangle.png')}
                style={styles.activeCoinIndicator}
                resizeMode="contain"
              />
            )}
            <View style={styles.buttonContainer}>
              <Image
                source={{
                  uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/coins/${coin.bot_name}.png`,
                }}
                style={styles.buttonImage}
              />
              <Text
                style={[
                  styles.buttonText,
                  activeSubCoin === coin.bot_name && styles.activeButtonText,
                ]}>
                {coin.bot_name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  ) : (
    <></>
  );
};

export default CoinMenu;
