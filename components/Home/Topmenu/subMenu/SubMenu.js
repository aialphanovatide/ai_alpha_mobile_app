import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TopMenuContext} from '../../../../context/topMenuContext';
import CoinMenu from './coinMenu/coinMenu';
import {CategoriesContext} from '../../../../context/categoriesContext';

const SubMenu = ({coinBotId = null}) => {
  const {activeCoin, activeSubCoin, updateActiveSubCoin} =
    useContext(TopMenuContext);
  const {categories} = useContext(CategoriesContext);

  return (
    <View style={styles.container}>
      {activeCoin &&
        activeCoin.coin_bots &&
        activeCoin.coin_bots.length >= 1 && (
          <CoinMenu
            activeSubCoin={activeSubCoin}
            updateActiveSubCoin={updateActiveSubCoin}
            subCoins={activeCoin.coin_bots}
          />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
});

export default SubMenu;
