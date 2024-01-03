import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import useCryptoSelectorStyles from './CryptosSelectorStyles';

const CryptosSelector = ({cryptos, activeCrypto, handleActiveCryptoChange}) => {
  const styles = useCryptoSelectorStyles();
  return (
    <View style={styles.selectorContainer}>
      {cryptos.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleActiveCryptoChange(item)}>
          <View
            style={[
              styles.selectorItem,
              {borderColor: item.color},
              activeCrypto &&
                activeCrypto.crypto === item.crypto &&
                styles.activeItem,
              activeCrypto &&
                activeCrypto.crypto === item.crypto && {
                  backgroundColor: item.color,
                },
            ]}>
            <Text
              style={[
                styles.itemText,
                activeCrypto &&
                  activeCrypto.crypto === item.crypto &&
                  styles.activeText,
              ]}>
              {item.crypto}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CryptosSelector;
