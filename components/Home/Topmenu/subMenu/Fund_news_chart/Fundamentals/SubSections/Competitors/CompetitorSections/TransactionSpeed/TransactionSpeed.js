import {View, Text} from 'react-native';
import React, {useContext, useState} from 'react';
import Speedometer from './Speedometer/Speedometer';
import CryptosSelector from '../../CryptoSelector/CryptosSelector';
import useTransactionSpeedStyles from './TransactionSpeedStyles';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const TransactionSpeed = ({cryptos}) => {
  const {theme} = useContext(AppThemeContext);
  const [activeCrypto, setActiveCrypto] = useState(cryptos[0]);
  const styles = useTransactionSpeedStyles();
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
        outerColor={theme.graphSecondaryColor}
        internalColor={activeCrypto.color}
        innerColor={theme.boxesBackgroundColor}
        totalValue={getMaxTpsValue(cryptos)}
        value={activeCrypto.tps[activeCrypto.tps.length - 1]}
        indicatorColor={theme.indicatorColor}
        showIndicator={true}
      />
    </View>
  );
};

export default TransactionSpeed;
