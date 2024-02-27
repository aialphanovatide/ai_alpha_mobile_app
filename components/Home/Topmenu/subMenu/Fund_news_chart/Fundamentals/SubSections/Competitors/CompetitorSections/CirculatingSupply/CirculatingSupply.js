import {Image, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useCirculatingSupplyStyles from './CirculatingSupplyStyles';
import {icons} from '../../icons';
import Loader from '../../../../../../../../../Loader/Loader';

const CirculatingSupplyItem = ({item, styles}) => {
  return (
    <View style={styles.circulatingSupplyItem}>
      <View style={styles.row}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.image}
            source={icons[item.name.toUpperCase()]}
            resizeMode={'contain'}
          />
        </View>
        <Text style={styles.itemName}>{item.crypto}</Text>
        <Image
          style={styles.inflationaryArrow}
          resizeMode="contain"
          source={
            item.inflationary === null
              ? require('../../../../../../../../../../assets/images/fundamentals/competitors/circulatingSupply/hybrid.png')
              : item.inflationary
              ? require('../../../../../../../../../../assets/images/fundamentals/competitors/circulatingSupply/inflationary.png')
              : require('../../../../../../../../../../assets/images/fundamentals/competitors/circulatingSupply/deflationary.png')
          }
        />
      </View>
      <View style={styles.dataContainer}>
        <ProgressBar
          maxValue={item.maxValue}
          percentageValue={item.percentageValue}
          styles={styles}
          crypto={item.crypto}
        />
      </View>
    </View>
  );
};

const ProgressBar = ({maxValue, percentageValue, styles, crypto}) => {
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
    <View style={styles.progressBarContainer}>
      <View style={[styles.row, styles.noVerticalMargin, styles.noPaddingH]}>
        <Text style={styles.valueLabel}>
          {maxValue === Infinity ? '∞' : `${formatNumber(maxValue)} ${crypto}`}
        </Text>
      </View>
      <View
        style={[
          styles.progressBar,
          maxValue === Infinity ? styles.infinityBar : {},
        ]}>
        <View
          style={[{width: `${percentageValue}%`}, styles.progressBarFill]}
        />
      </View>
      <View style={[styles.row, styles.noVerticalMargin]}>
        <Text style={styles.labelBottom}>{`${percentageValue}%`}</Text>
      </View>
    </View>
  );
};

const CirculatingSupply = ({
  cryptos,
  tokenomicsData,
  competitorsData,
  getSectionData,
  coin,
}) => {
  const [mappedData, setMappedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const findKeyInCompetitorItem = (data, key, crypto) => {
    const found = data.find(
      item => item.competitor.token === crypto && item.competitor.key === key,
    );
    return found && found !== undefined ? found.competitor.value : null;
  };

  const extractSymbol = cryptoString => {
    const string_without_spaces = cryptoString.replace(' ', '');
    const name = string_without_spaces.split('(')[0];
    const symbol_index_start = string_without_spaces.indexOf('(');
    const symbol_index_end = string_without_spaces.indexOf(')');
    const symbol =
      symbol_index_start !== -1
        ? string_without_spaces.slice(symbol_index_start + 1, symbol_index_end)
        : name;
    return symbol;
  };

  const findMaxValueInTokenomics = (tokenomicsData, crypto) => {
    const found = tokenomicsData.find(item =>
      item.name.includes(crypto[0].toUpperCase() + crypto.slice(1)),
    );
    console.log('Found value in tokenomics:', found);
    return found && found !== undefined ? found.maxSupply : null;
  };

  useEffect(() => {
    setLoading(true);
    const tokenomics_mapped = tokenomicsData.map(crypto => {
      return {
        name: crypto.tokenomics.token,
        maxSupply: crypto.tokenomics.max_supply.includes('∞')
          ? Infinity
          : parseFloat(crypto.tokenomics.max_supply.replace(/,/g, '')),
      };
    });
    console.log('Tokenomics helper data: ', tokenomics_mapped);
    // console.log(competitorsData);
    const supply_model_data = [];
    competitorsData.forEach((item, index) => {
      if (
        supply_model_data.find(mappedItem =>
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
          crypto: extractSymbol(item.competitor.token).toUpperCase(),
          percentageValue: parseFloat(
            findKeyInCompetitorItem(
              competitorsData,
              'circulating supply',
              item.competitor.token,
            ).replace('%', ''),
          ),
          inflationary:
            findKeyInCompetitorItem(
              competitorsData,
              'token supply model',
              item.competitor.token,
            ) === 'inflationary',
          maxValue: findMaxValueInTokenomics(
            tokenomics_mapped,
            extractSymbol(item.competitor.token),
          ),
        };
        supply_model_data.push(mapped_crypto);
      }
    });
    setMappedData(supply_model_data);
    setLoading(false);
  }, [competitorsData]);

  const styles = useCirculatingSupplyStyles();

  if (loading) {
    return (
      <View style={styles.container}>
        <Loader />
      </View>
    );
  }

  if (!mappedData || mappedData?.length === 0) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.referenceLabel, styles.labelLeft]}>
          Circulating Supply
        </Text>
        <Text style={[styles.referenceLabel, styles.labelRight]}>
          Total tokens in Supply
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.referenceLabel, styles.symbolLabel]}>
          <View style={styles.symbolWrapper}>
            <Image
              source={require('../../../../../../../../../../assets/images/fundamentals/competitors/circulatingSupply/deflationary.png')}
              style={styles.referenceIconImage}
              resizeMode="contain"
            />
          </View>
          Deflationary
        </Text>
        <Text
          style={[styles.referenceLabel, styles.symbolLabel, styles.noMargin]}>
          <View style={styles.symbolWrapper}>
            <Image
              source={require('../../../../../../../../../../assets/images/fundamentals/competitors/circulatingSupply/inflationary.png')}
              style={styles.referenceIconImage}
              resizeMode="contain"
            />
          </View>
          Inflationary
        </Text>
      </View>

      <View style={styles.itemsContainer}>
        {mappedData.map((item, index) => (
          <CirculatingSupplyItem item={item} key={index} styles={styles} />
        ))}
      </View>
    </View>
  );
};

export default CirculatingSupply;
