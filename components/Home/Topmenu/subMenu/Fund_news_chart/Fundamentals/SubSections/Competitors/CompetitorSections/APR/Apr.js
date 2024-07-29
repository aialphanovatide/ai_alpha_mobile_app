import {Image, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import CryptosSelector from '../../CryptoSelector/CryptosSelector';
import useAprStyles from './AprStyles';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';
import NoContentMessage from '../../../../NoContentMessage/NoContentMessage';
import {findCoinNameBySymbol} from '../../coinsNames';
import SkeletonLoader from '../../../../../../../../../Loader/SkeletonLoader';

const Graph = ({value, itemIndex, styles, tintColors}) => {
  const chosenColor = tintColors[itemIndex > 3 ? itemIndex % 3 : itemIndex];
  const calculus_value = isNaN(value) ? 0 : value;
  const {isDarkMode} = useContext(AppThemeContext);
  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={
          isDarkMode
            ? require('../../../../../../../../../../assets/images/fundamentals/competitors/apr/apr-dark.png')
            : require('../../../../../../../../../../assets/images/fundamentals/competitors/apr/apr.png')
        }
        resizeMode="contain"
      />
      <View
        style={[
          styles.overlay,
          ,
          {
            height: 240 * (calculus_value / 100),
            backgroundColor: chosenColor,
          },
        ]}></View>
    </View>
  );
};

const Apr = ({competitorsData, isSectionWithoutData}) => {
  const styles = useAprStyles();
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeOption, setActiveOption] = useState(null);
  const tintColors = ['#399AEA', '#20CBDD', '#895EF6', '#EB3ED6'];

  const findActiveOptionIndex = (cryptos, active) => {
    return cryptos.findIndex(crypto => crypto.crypto === active.crypto);
  };

  const handleActiveOptionChange = option => {
    setActiveOption(option);
  };

  const findKeyInCompetitorItem = (data, key, crypto) => {
    const found = data.find(
      item =>
        item.competitor.key.includes(key) &&
        item.competitor.token.replace(/\s/g, '') === crypto.replace(/\s/g, ''),
    );
    return found && found !== undefined
      ? found.competitor.value !== '-'
        ? found.competitor.value
        : ''
      : null;
  };

  const parseAprString = stringValue => {
    return stringValue ? Number(stringValue.replace(/\s/g, '')) : 0;
  };

  useEffect(() => {
    setLoading(true);
    const apr_data = [];
    competitorsData.forEach((item, index) => {
      if (
        apr_data.find(
          mappedItem =>
            mappedItem.crypto ===
            item.competitor.token.replace(/\s/g, '').toUpperCase(),
        )
      ) {
        return;
      } else {
        const mapped_crypto = {
          id: index + 1,
          name: findCoinNameBySymbol(
            item.competitor.token.replace(/\s/g, '').toUpperCase(),
          ),
          crypto: item.competitor.token.replace(/\s/g, '').toUpperCase(),
          apr: parseAprString(
            findKeyInCompetitorItem(
              competitorsData,
              'apr',
              item.competitor.token,
            ),
          ),
        };
        apr_data.push(mapped_crypto);
      }
    });
    // console.log(apr_data);
    setCryptos(apr_data);
    setActiveOption(apr_data[0]);
    setLoading(false);
  }, [competitorsData]);

  return (
    <View>
      {loading ? (
        <SkeletonLoader type={'selector'} quantity={4} />
      ) : cryptos?.length === 0 ||
        isSectionWithoutData(competitorsData, 'apr', '-') ? (
        <NoContentMessage />
      ) : (
        <>
          <CryptosSelector
            cryptos={cryptos}
            activeCrypto={activeOption}
            handleActiveCryptoChange={handleActiveOptionChange}
          />
          <View style={[styles.activeOptionContainer]}>
            <Text style={[styles.activeOptionValue]}>
              {`${
                activeOption
                  ? isNaN(activeOption.apr)
                    ? 0.0
                    : activeOption.apr
                  : 0.0
              }%`}
            </Text>
          </View>
          <View style={styles.graphsContainer}>
            <Graph
              value={activeOption ? activeOption.apr : 0}
              itemIndex={findActiveOptionIndex(cryptos, activeOption)}
              styles={styles}
              tintColors={tintColors}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default Apr;
