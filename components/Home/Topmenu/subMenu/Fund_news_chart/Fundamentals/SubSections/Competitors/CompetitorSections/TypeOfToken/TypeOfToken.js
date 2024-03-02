import {Text, View, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import useTypeOfTokenStyles from './TypeOfTokenStyles';
import {icons} from '../../icons';
import Loader from '../../../../../../../../../Loader/Loader';
import NoContentMessage from '../../../../NoContentMessage/NoContentMessage';

const TokenItem = ({crypto, styles}) => {
  return (
    <View style={styles.tokenContainer}>
      <View style={styles.row}>
        <View style={styles.tokenImageContainer}>
          <Image
            style={styles.tokenImage}
            source={icons[crypto.name.toUpperCase()]}
            resizeMode={'contain'}
          />
        </View>
        <Text style={styles.tokenName}>{crypto.name}</Text>
      </View>
      <ScrollView style={styles.buttonContainer} horizontal>
        {crypto.typeOfToken?.map((type, index) => (
          <View style={styles.tokenButton} key={index}>
            <Text style={styles.tokenButtonText}>{type}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const TypeOfToken = ({competitorsData}) => {
  const styles = useTypeOfTokenStyles();
  const [mappedData, setMappedData] = useState([]);
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

  const findKeyInCompetitorItem = (data, key, crypto) => {
    const found = data.find(
      item =>
        item.competitor.token === crypto && item.competitor.key.includes(key),
    );
    return found && found !== undefined ? found.competitor.value : null;
  };

  useEffect(() => {
    setLoading(true);
    const type_of_token_data = [];
    competitorsData.forEach((item, index) => {
      if (
        type_of_token_data.find(mapped =>
          mapped.crypto.includes(
            item.competitor.token.replace(' ', '').toUpperCase(),
          ),
        )
      ) {
        return;
      } else {
        const mapped_crypto = {
          id: type_of_token_data.length + 1,
          name: findCoinNameBySymbol(
            item.competitor.token.replace(' ', '').toUpperCase(),
          ),
          crypto: item.competitor.token.replace(' ', '').toUpperCase(),
          typeOfToken: findKeyInCompetitorItem(
            competitorsData,
            'type of token',
            item.competitor.token,
          )
            .replace(/\s/g, '')
            .split('/')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)),
        };
        type_of_token_data.push(mapped_crypto);
      }
    });
    setLoading(false);
    console.log('Type of token data: ', type_of_token_data);
    setMappedData(type_of_token_data);
  }, [competitorsData]);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : mappedData?.length === 0 ? (
        <NoContentMessage />
      ) : (
        <>
          {mappedData.map((crypto, index) => (
            <TokenItem key={index} crypto={crypto} styles={styles} />
          ))}
        </>
      )}
    </View>
  );
};

export default TypeOfToken;
