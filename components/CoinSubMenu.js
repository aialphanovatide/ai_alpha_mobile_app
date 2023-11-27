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
  },
  menuContainer: {
    flexDirection: 'row',
    padding: 2,
    backgroundColor: '#EFEFEF75',
    borderRadius: '25%',
    borderColor: '#EFEFEF75',
    borderWidth: 1,
  },
  menuItem: {
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#EFEFEF',
    borderRadius: 15,
    borderColor: '#B8BBBC'
  },
  selectedItem: {
    backgroundColor: '#E6007A',
    color: '#F7F7F7',
  },
  menuText: {
    color: '#B8BBBC',
  },
});
export default CoinSubMenu;
