import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Speedometer from './Speedometer/Speedometer';
import CryptosSelector from '../../CryptoSelector/CryptosSelector';
import useTransactionSpeedStyles from './TransactionSpeedStyles';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';
import Loader from '../../../../../../../../../Loader/Loader';
import NoContentMessage from '../../../../NoContentMessage/NoContentMessage';
import {findCoinNameBySymbol} from '../../coinsNames';

const TransactionSpeed = ({competitorsData}) => {
  const {theme} = useContext(AppThemeContext);
  const [cryptos, setCryptos] = useState([]);
  const [activeCrypto, setActiveCrypto] = useState(null);
  const [loading, setLoading] = useState(true);
  const styles = useTransactionSpeedStyles();

  const handleActiveCryptoChange = crypto => {
    setActiveCrypto(crypto);
  };

  const extractNumberFromString = str => {
    const match = str.replace(/,/g, '').match(/\d+/);
    console.log(match);
    if (match) {
      const number = Number(match[0]);
      return number;
    } else {
      return null;
    }
  };

  const findKeyInCompetitorItem = (data, key, crypto) => {
    const found = data.find(
      item =>
        item.competitor.token === crypto && item.competitor.key.includes(key),
    );
    return found && found !== undefined
      ? found.competitor.value !== '-'
        ? found.competitor.value
        : ''
      : null;
  };

  useEffect(() => {
    setLoading(true);
    const transaction_speed = [];
    competitorsData.forEach((item, index) => {
      if (
        transaction_speed.find(
          mappedItem =>
            mappedItem.crypto ===
            item.competitor.token.replace(/\s|/g, '').toUpperCase(),
        )
      ) {
        return;
      } else {
        const mapped_crypto = {
          id: index + 1,
          name: findCoinNameBySymbol(
            item.competitor.token.replace(/\s|/g, '').toUpperCase(),
          ),
          crypto: item.competitor.token.replace(/\s|/g, '').toUpperCase(),
          tps: extractNumberFromString(
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
    console.log(transaction_speed);
    setLoading(false);
    setCryptos(transaction_speed);
    setActiveCrypto(transaction_speed[0]);
  }, [competitorsData]);

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
      {loading ? (
        <Loader />
      ) : cryptos?.length === 0 ? (
        <NoContentMessage />
      ) : (
        <>
          <CryptosSelector
            cryptos={cryptos}
            activeCrypto={activeCrypto}
            handleActiveCryptoChange={handleActiveCryptoChange}
          />
          <Text
            style={styles.activeCryptoValue}>{`${activeCrypto.tps} TPS`}</Text>
          <Speedometer
            outerColor={theme.graphSecondaryColor}
            internalColor={chosenColor}
            innerColor={theme.boxesBackgroundColor}
            totalValue={getMaxTpsValue(cryptos)}
            value={activeCrypto.tps}
            indicatorColor={theme.indicatorColor}
            showIndicator={true}
          />
        </>
      )}
    </View>
  );
};

export default TransactionSpeed;
