/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {
  ScrollView,
  FlatList,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Icon from './Icon';

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

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDE1E2',
    paddingVertical: 15,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
  },
  menuItem: {
    marginHorizontal: 10,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#B8BBBC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  circleText: {
    color: '#F7F7F7',
    fontWeight: 'bold',
  },
  arrowContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  arrow: {
    fontSize: 20,
    color: 'white',
    marginHorizontal: 10,
  },
  selectedItem: {
    backgroundColor: '#F7931A',
    color: '#F7F7F7',
  },
});

export default CryptoTopMenu;
