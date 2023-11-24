import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const CoinSubMenu = ({currencies}) => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  const handleOptionPress = currency => {
    setSelectedCurrency(currency);
    // onOptionPress(option);
    console.log(currency);
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.menuContainer}>
          {currencies.map(currency => (
            <TouchableOpacity
              key={currency}
              style={[
                styles.menuItem,
                selectedCurrency === currency && styles.selectedItem,
              ]}
              onPress={() => handleOptionPress(currency)}>
              <Text style={styles.menuText}>{currency}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  menuContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  menuItem: {
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#3498db',
  },
  selectedItem: {
    backgroundColor: '#2c3e50',
  },
  menuText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default CoinSubMenu;
