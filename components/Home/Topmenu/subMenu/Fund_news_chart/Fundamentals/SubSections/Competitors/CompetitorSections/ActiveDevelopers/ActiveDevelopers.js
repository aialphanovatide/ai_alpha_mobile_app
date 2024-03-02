import {Image, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import useActiveDevelopersStyles from './ActiveDevelopersStyle';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';
import {icons} from '../../icons';
import Loader from '../../../../../../../../../Loader/Loader';
import NoContentMessage from '../../../../NoContentMessage/NoContentMessage';

const generateActiveDevs = (
  value,
  maxValue,
  styles,
  isDarkMode,
  chosenColor,
) => {
  const images = [];
  for (let i = 0; i < 4; i++) {
    const colored = i < Math.ceil((value / maxValue) * 4);
    images.push(
      <View key={`activeDevs_${i}`} style={styles.devImageContainer}>
        <Image
          source={require('../../../../../../../../../../assets/dailydevelopers.png')}
          style={[
            styles.image,
            {
              tintColor: colored
                ? chosenColor
                : isDarkMode
                ? '#74788D'
                : '#EFEFEF',
            },
          ]}
          resizeMode={'contain'}
        />
      </View>,
    );
  }

  return images;
};

const ActiveDevsItem = ({item, styles, maxValue, itemIndex}) => {
  const tintColors = ['#20CBDD', '#895EF6', '#FF3BC3', '#C539B4'];
  const chosenColor = tintColors[itemIndex > 3 ? itemIndex % 3 : itemIndex];
  const {isDarkMode} = useContext(AppThemeContext);
  return (
    <View style={styles.itemContainer}>
      <View style={styles.row}>
        <View style={styles.logoContainer}>
          <Image
            source={icons[item.name.toUpperCase()]}
            style={styles.image}
            resizeMode={'contain'}
          />
        </View>
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
      <View style={styles.activeDevsContainer}>
        {generateActiveDevs(
          item.activeDevs,
          maxValue,
          styles,
          isDarkMode,
          chosenColor,
        )}
        <Text style={[styles.activeDevsValue, {color: chosenColor}]}>
          {item.activeDevs}
        </Text>
      </View>
    </View>
  );
};

const ActiveDevelopers = ({competitorsData}) => {
  const styles = useActiveDevelopersStyles();
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

  const findMaxActiveDevsValue = cryptos => {
    let maxDevs = 0;
    cryptos.forEach(item => {
      if (item.activeDevs > maxDevs) {
        maxDevs = item.activeDevs;
      }
    });
    return maxDevs;
  };

  const findKeyInCompetitorItem = (data, key, crypto) => {
    const found = data.find(
      item =>
        item.competitor.token === crypto && item.competitor.key.includes(key),
    );
    console.log('Key received: ', key, 'Apr value found: ', found);
    return found && found !== undefined ? found.competitor.value : null;
  };

  useEffect(() => {
    setLoading(true);
    const active_devs_data = [];
    competitorsData.forEach((item, index) => {
      if (
        active_devs_data.find(
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
          activeDevs: Number(
            findKeyInCompetitorItem(
              competitorsData,
              'active developers',
              item.competitor.token,
            ).replace(/\s/g, ''),
          ),
        };
        active_devs_data.push(mapped_crypto);
      }
    });
    console.log(active_devs_data);
    setCryptos(active_devs_data);
    setLoading(false);
  }, [competitorsData]);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : cryptos?.length === 0 ? (
        <NoContentMessage />
      ) : (
        cryptos.map((item, index) => (
          <ActiveDevsItem
            key={index}
            item={item}
            styles={styles}
            itemIndex={index}
            maxValue={findMaxActiveDevsValue(cryptos)}
          />
        ))
      )}
    </View>
  );
};

export default ActiveDevelopers;
