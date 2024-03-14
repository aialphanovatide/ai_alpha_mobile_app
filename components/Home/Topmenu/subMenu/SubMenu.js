import React, {useContext} from 'react';
import {View} from 'react-native';
import {TopMenuContext} from '../../../../context/topMenuContext';
import CoinMenu from './coinMenu/coinMenu';
import {useNavigation} from '@react-navigation/native';
import useSubMenuStyles from './SubMenuStyles';

const SubMenu = ({isAlertsMenu}) => {
  const {activeCoin, activeSubCoin, updateActiveSubCoin} =
    useContext(TopMenuContext);
  const navigation = useNavigation();
  const styles = useSubMenuStyles();

  const handleCoinPress = coin => {
    updateActiveSubCoin(coin);
    if (!isAlertsMenu) {
      navigation.navigate('SubMenuScreen', {
        screen: 'Charts',
        params: {
          interval: '1h',
          symbol: `${coin}USDT`,
          coinBot: coin,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      {activeCoin &&
        activeCoin.coin_bots &&
        activeCoin.coin_bots.length >= 1 && (
          <CoinMenu
            activeSubCoin={activeSubCoin}
            handleCoinPress={handleCoinPress}
            subCoins={activeCoin.coin_bots}
          />
        )}
    </View>
  );
};

export default SubMenu;
