import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CryptoSubMenuOptions = ({
  mainSubOptions,
  mainCoinsOption,
  handleSubMenuOptionPress,
}) => {
  return (
    <View style={styles.container}>
      {mainSubOptions.map(option => (
        <TouchableOpacity
          key={option}
          style={[
            styles.menuItem,
            mainCoinsOption === option && styles.selectedItem,
          ]}
          onPress={() => handleSubMenuOptionPress(option)}>
          <Text style={styles.menuText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%', // Ocupa el 100% del ancho de la pantalla
    paddingVertical: 10,
  },
  menuItem: {
    flex: 1, // Ocupa el espacio disponible
    paddingVertical: 8,
    paddingHorizontal: 16,
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

export default CryptoSubMenuOptions;
