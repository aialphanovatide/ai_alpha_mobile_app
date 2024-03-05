import {Image, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useTokenomicsStyles from './TokenomicsStyles';
import Loader from '../../../../../../../Loader/Loader';
import NoContentMessage from '../../NoContentMessage/NoContentMessage';

const TokenItem = ({item, styles}) => {
  return (
    <View style={styles.tokenItem}>
      <View style={styles.tokenRow}>
        <Text style={styles.tokenName}>{item.symbol}</Text>
        <HorizontalProgressBar
          value={item.circulatingSupply}
          maxValue={item.maxSupply}
          styles={styles}
        />
      </View>
      <View style={styles.tokenRow}>
        <Image
          style={styles.inflationaryArrow}
          resizeMode="contain"
          source={
            item.inflationary === null
              ? require('../../../../../../../../assets/images/fundamentals/tokenomics/hybrid.png')
              : item.inflationary === true
              ? require('../../../../../../../../assets/images/fundamentals/tokenomics/inflationary.png')
              : require('../../../../../../../../assets/images/fundamentals/tokenomics/deflationary.png')
          }
        />
        <Text style={styles.text}>
          {item.inflationary === null
            ? 'Hybrid'
            : item.inflationary === true
            ? 'Inflationary'
            : 'Deflationary'}
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

const Tokenomics = ({getSectionData, coin}) => {
  const styles = useTokenomicsStyles();
  const [cryptos, setCryptos] = useState(null);
  const [loading, setLoading] = useState(true);

  const parseNumberFromString = str => {
    const cleanedStr = str.replace(/\s|,/g, '');
    const numberValue = Number(cleanedStr);
    return numberValue;
  };

  useEffect(() => {
    setLoading(true);
    setCryptos([]);
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
                symbol: crypto.tokenomics.token.replace(' ', '').toUpperCase(),
                circulatingSupply: Number(
                  crypto.tokenomics.circulating_supply.replace(/,/g, ''),
                ),
                totalSupply:
                  crypto.tokenomics.total_supply.replace(' ', '') === '∞'
                    ? Infinity
                    : parseNumberFromString(crypto.tokenomics.total_supply),
                maxSupply:
                  crypto.tokenomics.max_supply.replace(' ', '') === '∞'
                    ? Infinity
                    : parseNumberFromString(crypto.tokenomics.max_supply),
                inflationary:
                  crypto.tokenomics.supply_model === 'Inflationary'
                    ? true
                    : crypto.tokenomics.supply_model === 'Deflationary'
                    ? false
                    : null,
              };
            },
          );
          setCryptos(parsed_cryptos);
        }
      } catch (error) {
        console.log('Error trying to get tokenomics data: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTokenomicsData();
  }, [coin]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : cryptos?.length === 0 ? (
        <NoContentMessage hasSectionName={false} />
      ) : (
        <>
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
        </>
      )}
    </View>
  );
};

export default Tokenomics;
