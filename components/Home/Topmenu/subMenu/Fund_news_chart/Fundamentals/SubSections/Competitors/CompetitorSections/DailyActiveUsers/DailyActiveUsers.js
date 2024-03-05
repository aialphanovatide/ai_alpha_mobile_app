// DailyActiveUsers.js
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import CryptoSection from './CryptoSection';
import Loader from '../../../../../../../../../Loader/Loader';
import NoContentMessage from '../../../../NoContentMessage/NoContentMessage';
import {findCoinNameBySymbol} from '../../coinsNames';

const DailyActiveUsers = ({competitorsData, isSectionWithoutData}) => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

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
    return found && found !== undefined
      ? found.competitor.value !== '-'
        ? found.competitor.value
        : ''
      : null;
  };

  const parseLargeNumberString = numberString => {
    const numberWithoutSign = numberString.replace(/\s|,/g, '');
    const numericValue = Number(numberWithoutSign);
    return isNaN(numericValue) ? 0 : numericValue;
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
      ) : cryptos?.length === 0 ||
        isSectionWithoutData(competitorsData, 'daily active users', '-') ? (
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
