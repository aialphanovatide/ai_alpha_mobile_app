import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import useCryptoSelectorStyles from './CryptosSelectorStyles';

// Crypto selector component used in the Competitors section. It is used to select the crypto to compare with the main crypto.

const CryptosSelector = ({cryptos, activeCrypto, handleActiveCryptoChange}) => {
  const styles = useCryptoSelectorStyles();
  const tintColors = ['#399AEA', '#20CBDD', '#895EF6', '#EB3ED6'];
  return (
    <View style={styles.selectorContainer}>
      {cryptos.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleActiveCryptoChange(item)}>
          <View
            style={[
              styles.selectorItem,
              {borderColor: tintColors[index > 3 ? index % 3 : index]},
              activeCrypto &&
                activeCrypto.crypto === item.crypto &&
                styles.activeItem,
              activeCrypto &&
                activeCrypto.crypto === item.crypto && {
                  backgroundColor: tintColors[index > 3 ? index % 3 : index],
                },
            ]}>
            <Text
              style={[
                styles.itemText,
                activeCrypto &&
                  activeCrypto.crypto === item.crypto &&
                  styles.activeText,
              ]}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CryptosSelector;
