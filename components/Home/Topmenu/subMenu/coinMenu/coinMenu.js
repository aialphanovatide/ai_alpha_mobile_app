import React, {useContext} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import useCoinMenuStyles from './coinMenuStyles';
import {findColorByCoinName} from './coinMenuColors';
import {AppThemeContext} from '../../../../../context/themeContext';

// This component is used in the TopMenu component to show the subcoins of the selected coin. It receives the subcoins, the active subcoin, and a function to handle the press of a subcoin. It returns a view with the subcoins as buttons.

const CoinMenu = ({subCoins, activeSubCoin, handleCoinPress}) => {
  const styles = useCoinMenuStyles();
  const {theme} = useContext(AppThemeContext);
  return subCoins?.length > 1 ? (
    <View style={styles.menu}>
      <Image
        source={require('../../../../../assets/images/topMenu/submenu_triangle.png')}
        style={styles.activeCoinIndicator}
        resizeMode="contain"
      />
      <View style={styles.subMenu}>
        {subCoins.map((coin, index) => {
          // TEMPORARY FIX FOR TAO COIN
          if (coin.bot_name.toLowerCase() === 'tao') {
            return null;
          }
          const coinColor = findColorByCoinName(coin.bot_name.toLowerCase());
          return (
            <TouchableOpacity
              key={coin.bot_id}
              style={[
                styles.subMenuButton,
                activeSubCoin === coin.bot_name && {
                  color: theme.activeWhite,
                  backgroundColor: coinColor,
                  borderColor: coinColor,
                },
              ]}
              onPress={() => {
                handleCoinPress(coin.bot_name);
              }}>
              <View style={styles.buttonContainer}>
                <Image
                  source={{
                    uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/submenuicons/${coin.bot_name}.png`,
                  }}
                  style={[
                    styles.buttonImage,
                    activeSubCoin === coin.bot_name
                      ? {tintColor: '#FFFFFF'}
                      : {},
                  ]}
                  resizeMode="contain"
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
          );
        })}
      </View>
    </View>
  ) : (
    <></>
  );
};

export default CoinMenu;
