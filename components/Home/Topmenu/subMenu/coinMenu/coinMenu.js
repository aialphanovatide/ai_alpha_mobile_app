import React, {useContext} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import useCoinMenuStyles from './coinMenuStyles';
import {findColorByCoinName} from './coinMenuColors';
import {AppThemeContext} from '../../../../../context/themeContext';

const CoinMenu = ({subCoins, activeSubCoin, handleCoinPress}) => {
  const activeButtonColors = [
    'firstActiveButton',
    'secondActiveButton',
    'thirdActiveButton',
  ];
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
