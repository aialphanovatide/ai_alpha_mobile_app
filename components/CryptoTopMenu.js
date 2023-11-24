/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  ScrollView,
  FlatList,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const CryptoTopMenu = ({cryptocurrencies, currentHomeSection, setCurrentHomeSection, setSubMenuOptions, subOptions}) => {

  const handleMenuPress = crypto => {
    setCurrentHomeSection(crypto);
    setSubMenuOptions(subOptions[crypto])
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.menuContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cryptocurrencies.map(crypto => (
            <TouchableOpacity
              key={crypto}
              style={[
                styles.menuItem
              ]}
              onPress={() => handleMenuPress(crypto)}>
              <View style={[styles.circle, currentHomeSection === crypto && styles.selectedItem]}>
                <Text style={styles.circleText}>{crypto}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2c3e50',
    paddingVertical: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  menuItem: {
    marginHorizontal: 10,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    color: 'white',
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
    backgroundColor: '#FF8515',
  },
});

export default CryptoTopMenu;
