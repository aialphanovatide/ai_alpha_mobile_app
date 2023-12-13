import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './coinMenuStyles';
import CoinMenuCategories from '../coinMenuCategories/subMenu';


const CoinMenu = ({subCoins, activeTab, setActiveTab, activeSubCoin, setActiveSubCoin}) => {


  if (subCoins === null){
     return (
      <CoinMenuCategories activeTab={activeTab} setActiveTab={setActiveTab}/>
     )
  }

  return (
    <View style={styles.menu}>
    <View style={styles.subMenu}>
      {subCoins?.length > 0 && subCoins.map((coin) => (
        <TouchableOpacity
          key={coin.id}
          style={[
            styles.subMenuButton,
            activeSubCoin === coin.coin && styles.activeButton,
          ]}
          onPress={() => setActiveSubCoin(coin.coin)}
        >
          <View style={styles.buttonContainer}>
          <Image source={{ uri: coin.imageUri }} style={styles.buttonImage} />
          <Text style={[styles.buttonText, activeSubCoin === coin.coin && styles.activeButtonText]}>{coin.coin}</Text>
        </View>
        </TouchableOpacity>
      ))}
    </View>
    <CoinMenuCategories activeTab={activeTab} setActiveTab={setActiveTab}/>
    </View>
  );
};

export default CoinMenu