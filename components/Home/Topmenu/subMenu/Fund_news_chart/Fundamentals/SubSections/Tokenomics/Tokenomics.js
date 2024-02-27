import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useTokenomicsStyles from './TokenomicsStyles';

const TokenItem = ({item, styles}) => {
  return (
    <View style={styles.tokenItem}>
      <View style={styles.tokenRow}>
        <Text style={styles.tokenName}>{item.symbol}</Text>
        <HorizontalProgressBar
          value={item.circulatingSupply}
          maxValue={item.totalSupply}
          styles={styles}
        />
      </View>
      <View style={styles.tokenRow}>
        <Text style={styles.text}>
          {item.inflationary ? '↗ Inflationary' : '↘ Deflationary'}
        </Text>
      </View>
    </View>
  );
};

const HorizontalProgressBar = ({maxValue, value, styles}) => {
  const percentage = maxValue === Infinity ? 65 : (value / maxValue) * 100;

  function formatNumber(value) {
    const suffixes = ['', 'thousand', 'million', 'billion', 'trillion'];

    const formatRecursive = (num, suffixIndex) => {
      if (num < 1000 || suffixIndex === suffixes.length - 1) {
        return (
          num.toFixed(2).replace(/\.00$/, '') + ' ' + suffixes[suffixIndex]
        );
      } else {
        return formatRecursive(num / 1000, suffixIndex + 1);
      }
    };

    return formatRecursive(value, 0);
  }
  return (
    <View style={styles.progressBarWrapper}>
      <View style={styles.row}>
        <Text style={styles.progressBarValue}>{`${
          maxValue === Infinity
            ? formatNumber(value)
            : formatNumber(value) + ' (' + Math.round(percentage) + ')%'
        }`}</Text>
        <Text style={styles.progressBarMaxValue}>
          {maxValue === Infinity ? '∞' : formatNumber(maxValue)}
        </Text>
      </View>

      <View
        style={[
          styles.progressBarContainer,
          maxValue === Infinity ? styles.infinityBar : null,
        ]}>
        <View style={[styles.progressBar, {width: `${percentage}%`}]}></View>
      </View>
    </View>
  );
};

const Tokenomics = ({content, getSectionData, coin}) => {
  const styles = useTokenomicsStyles();
  const [cryptos, setCryptos] = useState(null);

  if (!coin || coin === undefined) {
    setCryptos(content);
  }

  const extractNameAndSymbol = cryptoString => {
    const [name, symbol] = cryptoString.split(' ');
    return {name, symbol: symbol.slice(1, -1)};
  };

  const parseNumberString = inputString => {
    const regex = /^([\d,]+)\s*(million|billion)?\s*(\w+)?$/i;

    const match = inputString.match(regex);

    if (!match) return null;

    const [, numberString, multiplier, currency] = match;

    const number = Number(numberString.replace(/,/g, ''));

    let multiplierValue = 1;
    if (multiplier) {
      switch (multiplier.toLowerCase()) {
        case 'million':
          multiplierValue = 1e6;
          break;
        case 'billion':
          multiplierValue = 1e9;
          break;
        default:
          break;
      }
    }

    const parsedNumber = number * multiplierValue;

    return {value: parsedNumber, currency};
  };

  useEffect(() => {
    const fetchTokenomicsData = async () => {
      try {
        const response = await getSectionData(
          `/api/get_tokenomics?coin_name=${coin}`,
        );

        if (response.status !== 200) {
          setCryptos([]);
        } else {
          const parsed_cryptos = response.message.tokenomics_data.map(
            crypto => {
              return {
                symbol: extractNameAndSymbol(crypto.tokenomics.token).symbol,
                name: extractNameAndSymbol(crypto.tokenomics.token).name,
                circulatingSupply: Number(
                  crypto.tokenomics.circulating_supply
                    .split(' ')[0]
                    .replace(/,/g, ''),
                ),
                totalSupply:
                  crypto.tokenomics.total_supply.replace(' ', '') === '∞'
                    ? Infinity
                    : parseNumberString(crypto.tokenomics.total_supply).value,
                maxSupply:
                  crypto.tokenomics.max_supply.replace(' ', '') === '∞'
                    ? Infinity
                    : parseNumberString(crypto.tokenomics.max_supply).value,
                inflationary: crypto.tokenomics.supply_model === 'Inflationary',
              };
            },
          );
          // console.log('Tokenomics data:', parsed_cryptos);
          setCryptos(parsed_cryptos);
        }
      } catch (error) {
        console.log('Error trying to get tokenomics data: ', error);
      }
    };
    fetchTokenomicsData();
  }, [coin]);

  if (cryptos?.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.numberTitles}>
        <Text style={styles.alignLeft}>Circulating supply</Text>
        <Text style={styles.alignRight}>Total Supply</Text>
      </View>
      <View style={styles.tokenItemsContainer}>
        {cryptos &&
          cryptos.map((crypto, index) => (
            <TokenItem key={index} item={crypto} styles={styles} />
          ))}
      </View>
    </View>
  );
};

export default Tokenomics;
