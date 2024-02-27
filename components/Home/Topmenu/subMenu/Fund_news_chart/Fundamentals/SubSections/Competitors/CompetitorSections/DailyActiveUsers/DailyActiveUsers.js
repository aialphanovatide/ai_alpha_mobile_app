// DailyActiveUsers.js
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import CryptoSection from './CryptoSection';
import Loader from '../../../../../../../../../Loader/Loader';

const DailyActiveUsers = ({competitorsData}) => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const mapped_data = [];
    competitorsData.forEach(item => {
      if (
        mapped_data.find(
          mapped => mapped.symbol === extractSymbol(item.competitor.token),
        )
      ) {
        return;
      } else {
        const current = {
          id: item.competitor.id,
          symbol: extractSymbol(item.competitor.token),
          name:
            item.competitor.token.indexOf('(') !== -1
              ? item.competitor.token.slice(
                  0,
                  item.competitor.token.indexOf('(') - 1,
                )
              : item.competitor.token.replace(' ', ''),
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

  const extractSymbol = cryptoString => {
    const string_without_spaces = cryptoString.replace(' ', '');
    const name = string_without_spaces.split('(')[0];
    const symbol_index_start = string_without_spaces.indexOf('(');
    const symbol_index_end = string_without_spaces.indexOf(')');
    const symbol =
      symbol_index_start !== -1
        ? string_without_spaces
            .slice(symbol_index_start + 1, symbol_index_end)
            .toUpperCase()
        : name[0].toUpperCase() + name.slice(1);
    return symbol;
  };

  const findKeyInCompetitorItem = (data, key, crypto) => {
    const found = data.find(
      item =>
        item.competitor.token === crypto && item.competitor.key.includes(key),
    );
    // console.log('Daily active users value found: ', found);
    return found && found !== undefined ? found.competitor.value : null;
  };

  const parseLargeNumberString = numberString => {
    const numberWithoutSign = numberString.replace(/\$/g, '');
    const decimalNumberString = numberWithoutSign.replace(/,/g, '.');
    const [numberPart, unitPart] = decimalNumberString.split(/(?=[a-zA-Z])/);
    const numericValue = Number(numberPart);
    const unitValues = {
      k: 1000,
      m: 1000000,
      b: 1000000000,
      t: 1000000000000,
    };

    const scaledValue = numericValue * unitValues[unitPart.toLowerCase()];
    return Number(scaledValue.toFixed(3));
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

  if (loading) {
    return (
      <View>
        <Loader />
      </View>
    );
  }

  if (!cryptos || cryptos?.length === 0) {
    return null;
  }

  const max_value = findMaxUsersValue(cryptos);

  return (
    <View>
      {cryptos.map((crypto, index) => (
        <CryptoSection
          key={index}
          crypto={crypto}
          maxValue={max_value}
          itemIndex={index}
        />
      ))}
    </View>
  );
};

export default DailyActiveUsers;
