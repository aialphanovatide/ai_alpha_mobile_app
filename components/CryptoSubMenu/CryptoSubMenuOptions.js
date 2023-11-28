import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './CryptoSubMenuStyles';

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



export default CryptoSubMenuOptions;
