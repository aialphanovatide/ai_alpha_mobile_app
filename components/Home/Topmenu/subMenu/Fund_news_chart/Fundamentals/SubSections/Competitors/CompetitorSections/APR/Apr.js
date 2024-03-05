import {Image, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import CryptosSelector from '../../CryptoSelector/CryptosSelector';
import useAprStyles from './AprStyles';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';
import Loader from '../../../../../../../../../Loader/Loader';
import NoContentMessage from '../../../../NoContentMessage/NoContentMessage';

const Graph = ({value, itemIndex, styles, tintColors}) => {
  const chosenColor = tintColors[itemIndex > 3 ? itemIndex % 3 : itemIndex];
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
            height: 240 * (value / 100),
            backgroundColor: chosenColor,
          },
        ]}></View>
    </View>
  );
};

const Apr = ({competitorsData}) => {
  const styles = useAprStyles();
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeOption, setActiveOption] = useState(null);
  const tintColors = ['#399AEA', '#20CBDD', '#895EF6', '#EB3ED6'];

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

  const findActiveOptionIndex = (cryptos, active) => {
    return cryptos.findIndex(crypto => crypto.crypto === active.crypto);
  };

  const handleActiveOptionChange = option => {
    setActiveOption(option);
  };

  const findKeyInCompetitorItem = (data, key, crypto) => {
    const found = data.find(
      item =>
        item.competitor.token === crypto && item.competitor.key.includes(key),
    );
    return found && found !== undefined ? found.competitor.value : null;
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
    console.log(apr_data);
    setCryptos(apr_data);
    setActiveOption(apr_data[0]);
    setLoading(false);
  }, [competitorsData]);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : cryptos?.length === 0 ? (
        <NoContentMessage />
      ) : (
        <>
          <CryptosSelector
            cryptos={cryptos}
            activeCrypto={activeOption}
            handleActiveCryptoChange={handleActiveOptionChange}
          />
          <View
            style={[
              styles.activeOptionContainer,
              // activeOption && {
              //   borderColor:
              //     tintColors[
              //       findActiveOptionIndex(cryptos, activeOption) > 3
              //         ? findActiveOptionIndex(cryptos, activeOption) % 3
              //         : findActiveOptionIndex(cryptos, activeOption)
              //     ],
              // },
            ]}>
            <Text
              style={[
                styles.activeOptionValue,
                // activeOption && {
                //   color:
                //     tintColors[
                //       findActiveOptionIndex(cryptos, activeOption) > 3
                //         ? findActiveOptionIndex(cryptos, activeOption) % 3
                //         : findActiveOptionIndex(cryptos, activeOption)
                //     ],
                // },
              ]}>
              {`${activeOption ? activeOption.apr : 0.0}%`}
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
