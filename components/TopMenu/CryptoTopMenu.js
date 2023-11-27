/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  ScrollView,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
// import Icon from './Icon';
import styles from './CryptoTopStyles';

const CryptoTopMenu = ({
  cryptocurrencies,
  currentHomeSection,
  setCurrentHomeSection,
  setSubMenuOptions,
  subOptions,
}) => {
  const handleMenuPress = crypto => {
    setCurrentHomeSection(crypto);
    setSubMenuOptions(subOptions[crypto]);
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.menuContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cryptocurrencies.map(crypto => (
            <TouchableOpacity
              key={crypto}
              style={[styles.menuItem]}
              onPress={() => handleMenuPress(crypto)}>
              <View
                style={[
                  styles.circle,
                  currentHomeSection === crypto && styles.selectedItem,
                ]}>
                {/* {(crypto === 'BTC' || crypto === 'ETH') && (
                  <Icon
                    width={40}
                    height={40}
                    svg={'./resources/bitcoing.svg'}></Icon>
                )} */}
                {/* {crypto !== 'BTC' && crypto !== 'ETH' && ( */}
                  <Text style={styles.circleText}>{crypto}</Text>
                {/* )} */}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

export default CryptoTopMenu;
