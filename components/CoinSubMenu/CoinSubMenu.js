import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import styles from './CoinSubMenuStyles';

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


export default CoinSubMenu;
