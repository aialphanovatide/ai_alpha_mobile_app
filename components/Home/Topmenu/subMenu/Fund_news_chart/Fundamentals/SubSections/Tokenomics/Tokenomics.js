import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useTokenomicsStyles from './TokenomicsStyles';

// Hardcoded data - TODO: fetch or get this information from another sources, and connect it to the current package of topMenu

const tokenomicsInfo = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
    circulatingSupply: 120251000,
    totalSupply: Infinity,
    inflationary: true,
  },
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    circulatingSupply: 19540000,
    totalSupply: 21000000,
    inflationary: false,
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    circulatingSupply: 34964744027,
    totalSupply: 45000000000,
    inflationary: true,
  },
];

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

const Tokenomics = () => {
  const styles = useTokenomicsStyles();
  const [cryptos, setCryptos] = useState(null);

  useEffect(() => {
    setCryptos(tokenomicsInfo);
  }, []);

  return (
    <View style={styles.tokenItemsContainer}>
      <View style={styles.numberTitles}>
        <Text style={styles.alignLeft}>Circulating supply</Text>
        <Text style={styles.alignRight}>Total Supply</Text>
      </View>
      {cryptos &&
        cryptos.map((crypto, index) => (
          <TokenItem key={index} item={crypto} styles={styles} />
        ))}
    </View>
  );
};

export default Tokenomics;
