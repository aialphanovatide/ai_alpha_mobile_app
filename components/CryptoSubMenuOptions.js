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
          <Text
            style={[
              styles.menuText,
              mainCoinsOption === option && styles.selectedText,
            ]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 5,
  },
  menuItem: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: '#DDE1E2',
    borderWidth: 2,
    borderColor: '#F7F7F7',
    borderRadius: 5,
  },
  selectedItem: {
    backgroundColor: '#F7F7F7',
  },
  menuText: {
    color: '#F7F7F7',
  },
  selectedText: {
    color: '#B8BBBC',
    fontWeight: 'bold',
  },
});

export default CryptoSubMenuOptions;
