// DailyActiveUsers.js
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import CryptoSection from './CryptoSection';
import Loader from '../../../../../../../../../Loader/Loader';
import NoContentMessage from '../../../../NoContentMessage/NoContentMessage';

const DailyActiveUsers = ({competitorsData}) => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  const coins_names = [
    {symbol: 'ETH', name: 'Ethereum'},
    {symbol: 'BTC', name: 'Bitcoin'},
    {symbol: 'ADA', name: 'Cardano'},
    {symbol: 'SOL', name: 'Solana'},
    {symbol: 'AVAX', name: 'Avalanche'},
    {symbol: 'QNT', name: 'Quantum'},
    {symbol: 'DOT', name: 'Polkadot'},
    {symbol: 'ATOM', name: 'Cosmos'},
    {symbol: 'LINK', name: 'ChainLink'},
    {symbol: 'BAND', name: 'Band Protocol'},
    {symbol: 'API3', name: 'API3'},
    {symbol: 'RPL', name: 'Rocket Pool'},
    {symbol: 'LDO', name: 'Lido Finance'},
    {symbol: 'FXS', name: 'Frax Finance'},
    {symbol: 'OP', name: 'Optimism'},
    {symbol: 'MATIC', name: 'Polygon'},
    {symbol: 'ARB', name: 'Arbitrum'},
    {symbol: 'XLM', name: 'Stellar'},
    {symbol: 'XRP', name: 'Ripple'},
    {symbol: 'ALGO', name: 'Algorand'},
    {symbol: '1INCH', name: '1Inch Network'},
    {symbol: 'AAVE', name: 'Aave'},
    {symbol: 'GMX', name: 'GMX'},
    {symbol: 'PENDLE', name: 'Pendle'},
    {symbol: 'CAKE', name: 'PanCake Swap'},
    {symbol: 'SUSHI', name: 'Sushi Swap'},
    {symbol: 'UNI', name: 'UNISWAP'},
    {symbol: 'VELO', name: 'Velo'},
    {symbol: 'DYDX', name: 'dYdX'},
  ];

  const findCoinNameBySymbol = symbol => {
    const found = coins_names.find(coin => coin.symbol === symbol);
    return found !== undefined ? found.name : null;
  };

  useEffect(() => {
    setLoading(true);
    const mapped_data = [];
    competitorsData.forEach(item => {
      if (
        mapped_data.find(
          mapped =>
            mapped.symbol ===
            item.competitor.token.replace(/\s|,/g, '').toUpperCase(),
        )
      ) {
        return;
      } else {
        const current = {
          id: item.competitor.id,
          symbol: item.competitor.token.replace(/\s|,/g, '').toUpperCase(),
          name: findCoinNameBySymbol(
            item.competitor.token.replace(/\s|,/g, '').toUpperCase(),
          ),
          activeUsers: parseLargeNumberString(
            findKeyInCompetitorItem(
              competitorsData,
              'daily active users',
              item.competitor.token,
            ),
          ),
        };
        mapped_data.push(current);
      }
    });
    setCryptos(mapped_data);
    setLoading(false);
  }, [competitorsData]);

  const findKeyInCompetitorItem = (data, key, crypto) => {
    const found = data.find(
      item =>
        item.competitor.token === crypto && item.competitor.key.includes(key),
    );
    // console.log('Daily active users value found: ', found);
    return found && found !== undefined ? found.competitor.value : null;
  };

  const parseLargeNumberString = numberString => {
    const numberWithoutSign = numberString.replace(/\s|,/g, '');
    const numericValue = Number(numberWithoutSign);
    return numericValue;
  };

  const findMaxUsersValue = cryptos => {
    let maxUsers = 0;
    cryptos.forEach(item => {
      if (item.activeUsers > maxUsers) {
        maxUsers = item.activeUsers;
      }
    });
    return maxUsers;
  };

  const max_value = findMaxUsersValue(cryptos);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : cryptos?.length === 0 ? (
        <NoContentMessage />
      ) : (
        cryptos.map((crypto, index) => (
          <CryptoSection
            key={index}
            crypto={crypto}
            maxValue={max_value}
            itemIndex={index}
          />
        ))
      )}
    </View>
  );
};

export default DailyActiveUsers;
