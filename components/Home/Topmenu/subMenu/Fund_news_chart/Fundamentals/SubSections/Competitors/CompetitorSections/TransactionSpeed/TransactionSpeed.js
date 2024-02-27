import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Speedometer from './Speedometer/Speedometer';
import CryptosSelector from '../../CryptoSelector/CryptosSelector';
import useTransactionSpeedStyles from './TransactionSpeedStyles';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';
import Loader from '../../../../../../../../../Loader/Loader';

const TransactionSpeed = ({competitorsData}) => {
  const {theme} = useContext(AppThemeContext);
  const [cryptos, setCryptos] = useState([]);
  const [activeCrypto, setActiveCrypto] = useState(null);
  const [loading, setLoading] = useState(true);
  const styles = useTransactionSpeedStyles();

  const handleActiveCryptoChange = crypto => {
    setActiveCrypto(crypto);
  };

  const formatTpsValue = stringValue => {
    const filtered_string = stringValue.replace(',', '');
    console.log('TPS: ', filtered_string.split(' ')[0]);
    return Number(filtered_string.split(' ')[0]);
  };

  const findKeyInCompetitorItem = (data, key, crypto) => {
    const found = data.find(
      item => item.competitor.token === crypto && item.competitor.key === key,
    );
    return found && found !== undefined ? found.competitor.value : null;
  };

  useEffect(() => {
    setLoading(true);
    const transaction_speed = [];
    competitorsData.forEach((item, index) => {
      if (
        transaction_speed.find(mappedItem =>
          item.competitor.token.includes(mappedItem.name),
        )
      ) {
        return;
      } else {
        const mapped_crypto = {
          id: index + 1,
          name:
            item.competitor.token.indexOf('(') !== -1
              ? item.competitor.token.slice(
                  0,
                  item.competitor.token.indexOf('(') - 1,
                )
              : item.competitor.token.replace(' ', ''),
          crypto:
            item.competitor.token.indexOf('(') !== -1
              ? item.competitor.token
                  .slice(0, item.competitor.token.indexOf('(') - 1)
                  .toUpperCase()[0] +
                item.competitor.token
                  .slice(0, item.competitor.token.indexOf('(') - 1)
                  .slice(1)
              : item.competitor.token.replace(' ', '').toUpperCase()[0] +
                item.competitor.token.replace(' ', '').slice(1),
          tps: formatTpsValue(
            findKeyInCompetitorItem(
              competitorsData,
              'transaction speed',
              item.competitor.token,
            ),
          ),
        };
        transaction_speed.push(mapped_crypto);
      }
    });
    // console.log(transaction_speed);
    setLoading(false);
    setCryptos(transaction_speed);
    setActiveCrypto(transaction_speed[0]);
  }, [competitorsData]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Loader />
      </View>
    );
  }

  if (!cryptos || cryptos?.length === 0) {
    return null;
  }

  const activeCryptoIndex = cryptos.findIndex(
    crypto => crypto.crypto === activeCrypto.crypto,
  );

  const tintColors = ['#399AEA', '#20CBDD', '#895EF6', '#EB3ED6'];
  const chosenColor =
    tintColors[
      activeCryptoIndex > 3 ? activeCryptoIndex % 3 : activeCryptoIndex
    ];

  const getMaxTpsValue = cryptos => {
    let max = 0;

    cryptos.forEach(crypto => {
      let maxCryptoTpsValue = crypto.tps;
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
      <Text style={styles.activeCryptoValue}>{`${activeCrypto.tps} TPS`}</Text>
      <Speedometer
        outerColor={theme.graphSecondaryColor}
        internalColor={chosenColor}
        innerColor={theme.boxesBackgroundColor}
        totalValue={getMaxTpsValue(cryptos)}
        value={activeCrypto.tps}
        indicatorColor={theme.indicatorColor}
        showIndicator={true}
      />
    </View>
  );
};

export default TransactionSpeed;
