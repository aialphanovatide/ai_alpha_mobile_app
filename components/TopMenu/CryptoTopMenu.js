/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ScrollView, GestureHandlerRootView} from 'react-native-gesture-handler';
import Icon from './Icon';
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
          {cryptocurrencies.map(cryptocurrency => (
            <TouchableOpacity
              key={cryptocurrency.crypto}
              style={[styles.menuItem]}
              onPress={() => handleMenuPress(cryptocurrency.crypto)}>
              <View
                style={[
                  styles.circle,
                  currentHomeSection === cryptocurrency.crypto && styles.selectedItem,
                ]}>
                {(cryptocurrency.crypto === 'BTC' || cryptocurrency.crypto === 'ETH') && (cryptocurrency.icon !== null) && (
                  <Icon
                    width={40}
                    height={40}
                    xml={cryptocurrency.icon}
                    isCurrent={cryptocurrency.crypto === currentHomeSection}
                    ></Icon>
                )}
                {cryptocurrency.crypto !== 'BTC' && cryptocurrency.crypto !== 'ETH' && (
                  <Text style={styles.circleText}>{cryptocurrency.crypto}</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

export default CryptoTopMenu;
