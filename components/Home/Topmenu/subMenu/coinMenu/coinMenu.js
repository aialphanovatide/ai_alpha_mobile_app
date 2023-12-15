import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './coinMenuStyles';
import CoinMenuCategories from '../coinMenuCategories/subMenu';


const CoinMenu = ({subCoins, activeTab, setActiveTab, activeSubCoin, setActiveSubCoin}) => {


  if (subCoins.length === 1){
     return (
      <CoinMenuCategories activeTab={activeTab} setActiveTab={setActiveTab}/>
     )
  }

  return (
    <View style={styles.menu}>
    <View style={styles.subMenu}>
      {subCoins?.length > 0 && subCoins.map((coin) => (
        <TouchableOpacity
          key={coin.bot_id}
          style={[
            styles.subMenuButton,
            activeSubCoin === coin.bot_name && styles.activeButton,
          ]}
          onPress={() => setActiveSubCoin(coin.bot_name)}
        >
          <View style={styles.buttonContainer}>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png' }} style={styles.buttonImage} />
          <Text style={[styles.buttonText, activeSubCoin === coin.bot_name && styles.activeButtonText]}>{coin.bot_name}</Text>
        </View>
        </TouchableOpacity>
      ))}
    </View>
    <CoinMenuCategories activeTab={activeTab} setActiveTab={setActiveTab}/>
    </View>
  );
};

export default CoinMenu