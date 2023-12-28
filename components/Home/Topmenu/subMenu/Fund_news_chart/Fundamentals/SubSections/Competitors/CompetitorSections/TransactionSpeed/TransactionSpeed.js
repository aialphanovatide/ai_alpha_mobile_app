import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Speedometer from './Speedometer/Speedometer';
import styles from './TransactionSpeedStyles';
import CryptosSelector from '../../CryptoSelector/CryptosSelector';

const TransactionSpeed = ({cryptos}) => {
  const [activeCrypto, setActiveCrypto] = useState(cryptos[0]);

  const handleActiveCryptoChange = crypto => {
    setActiveCrypto(crypto);
  };

  const getMaxTpsValue = cryptos => {
    let max = 0;

    cryptos.forEach(crypto => {
      let maxCryptoTpsValue = crypto.tps[crypto.tps.length - 1];
      if (maxCryptoTpsValue > max) {
        max = maxCryptoTpsValue;
      }
    });
    return max;
  };

  return (
    <View style={styles.container}>
      <CryptosSelector
        cryptos={cryptos}
        activeCrypto={activeCrypto}
        handleActiveCryptoChange={handleActiveCryptoChange}
      />
      <Text style={styles.activeCryptoValue}>
        {`${activeCrypto.tps[activeCrypto.tps.length - 1]} TPS`}
      </Text>
      <Speedometer
        outerColor={'#DDE1E2'}
        internalColor={activeCrypto.color}
        innerColor={'#EFEBEF'}
        totalValue={getMaxTpsValue(cryptos)}
        value={activeCrypto.tps[activeCrypto.tps.length - 1]}
        indicatorColor={'#4D4D4D'}
        showIndicator={true}
      />
    </View>
  );
};

export default TransactionSpeed;
