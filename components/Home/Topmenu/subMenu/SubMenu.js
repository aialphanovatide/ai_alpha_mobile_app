import React, {useContext, useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';
import {TopMenuContext} from '../../../../context/topMenuContext';
import CoinMenu from './coinMenu/coinMenu';
import {useNavigation} from '@react-navigation/native';
import useSubMenuStyles from './SubMenuStyles';
import {HeaderVisibilityContext} from '../../../../context/HeadersVisibilityContext';

// This component is used in the TopMenu component to show the subcoins of the selected coin. It receives a boolean to determine if it is the alerts menu or not. It returns a view with the subcoins as buttons.

const SubMenu = ({isAlertsMenu}) => {
  const {activeCoin, activeSubCoin, updateActiveSubCoin} =
    useContext(TopMenuContext);
  const navigation = useNavigation();
  const styles = useSubMenuStyles();

  const handleCoinPress = coin => {
    updateActiveSubCoin(coin);
    if (!isAlertsMenu) {
      navigation.navigate('SubMenuScreen', {
        screen: 'Fundamentals',
      });
    }
  };

  // Scroll and hide the top menu variables and functions
  const {headersVisibility} = useContext(HeaderVisibilityContext);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedValue, {
        toValue: headersVisibility.SubMenu ? 0 : -100,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {});
  }, [headersVisibility.SubMenu, animatedValue]);

  return (
    <View
      style={[
        styles.background,
        {width: '100%'},
        !headersVisibility.TopMenu && {height: 1},
      ]}>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{translateY: animatedValue}],
            overflow: 'hidden',
          },
        ]}>
        {activeCoin &&
          activeCoin.category !== 'bitcoin' &&
          activeCoin.coin_bots &&
          activeCoin.coin_bots.length >= 1 && (
            <CoinMenu
              activeSubCoin={activeSubCoin}
              handleCoinPress={handleCoinPress}
              subCoins={activeCoin.coin_bots}
            />
          )}
      </Animated.View>
    </View>
  );
};

export default SubMenu;
