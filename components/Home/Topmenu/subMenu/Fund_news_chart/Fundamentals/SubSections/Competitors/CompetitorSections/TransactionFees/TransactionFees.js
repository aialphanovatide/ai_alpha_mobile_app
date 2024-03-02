import {Image, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import CryptosSelector from '../../CryptoSelector/CryptosSelector';
import useTransactionFeeStyles from './TransactionFeesStyles';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';
import Loader from '../../../../../../../../../Loader/Loader';
import NoContentMessage from '../../../../NoContentMessage/NoContentMessage';

const DollarGraphs = ({value, itemIndex, styles}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  const tintColors = ['#399AEA', '#20CBDD', '#895EF6', '#EB3ED6'];
  const chosenColor = tintColors[itemIndex > 3 ? itemIndex % 3 : itemIndex];
  const images = [];
  if (value !== 0) {
    const intValue = Math.floor(value);
    const decimalValue = value - intValue;
    for (let i = 0; i < intValue; i++) {
      images.push(
        <View key={`image_${i}`} style={styles.imageContainer}>
          <Image
            style={styles.dollarImage}
            source={
              isDarkMode
                ? require('../../../../../../../../../../assets/images/fundamentals/competitors/transactionFees/dollar-dark.png')
                : require('../../../../../../../../../../assets/images/fundamentals/competitors/transactionFees/dollar.png')
            }
            resizeMode="contain"
          />
          <View style={[styles.overlay, {backgroundColor: chosenColor}]}></View>
        </View>,
      );
    }
    if (decimalValue > 0) {
      images.push(
        <View key={`${value}decimal`} style={styles.imageContainer}>
          <Image
            style={styles.dollarImage}
            source={
              isDarkMode
                ? require('../../../../../../../../../../assets/images/fundamentals/competitors/transactionFees/dollar-dark.png')
                : require('../../../../../../../../../../assets/images/fundamentals/competitors/transactionFees/dollar.png')
            }
            resizeMode="contain"
          />
          <View
            style={[
              styles.overlay,
              {
                height: 80 * decimalValue,
                backgroundColor: chosenColor,
              },
            ]}></View>
        </View>,
      );
    }
  } else {
    images.push(
      <View key={`zero_container`} style={styles.imageContainer}>
        <Image
          key={'zero'}
          style={styles.dollarImage}
          source={
            isDarkMode
              ? require('../../../../../../../../../../assets/images/fundamentals/competitors/transactionFees/dollar-dark.png')
              : require('../../../../../../../../../../assets/images/fundamentals/competitors/transactionFees/dollar.png')
          }
          resizeMode="contain"
        />
      </View>,
    );
  }

  return images;
};

const TransactionFees = ({competitorsData}) => {
  const [cryptos, setCryptos] = useState([]);
  const styles = useTransactionFeeStyles();
  const [activeOption, setActiveOption] = useState(null);
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

  const handleActiveOptionChange = option => {
    setActiveOption(option);
  };

  const formatFeeValue = stringValue => {
    if (stringValue === null || stringValue === undefined) {
      return 0;
    }
    const formatted_string = stringValue.replace(/\s/g, '');
    const number = Number(formatted_string.replace(/,/g, '.'));
    // console.log('Formatted transaction fees value: ', number);
    return number;
  };

  const findActiveOptionIndex = (cryptos, active) => {
    return cryptos.findIndex(crypto => crypto.crypto === active.crypto);
  };

  const findKeyInCompetitorItem = (data, key, crypto) => {
    const found = data.find(
      item =>
        item.competitor.token === crypto && item.competitor.key.includes(key),
    );
    console.log(found);
    return found && found !== undefined ? found.competitor.value : null;
  };

  useEffect(() => {
    setLoading(true);
    const transaction_fees_data = [];
    competitorsData.forEach((item, index) => {
      if (
        transaction_fees_data.find(
          mappedItem =>
            mappedItem.crypto ===
            item.competitor.token.replace(/\s|,/g, '').toUpperCase(),
        )
      ) {
        return;
      } else {
        const mapped_crypto = {
          id: index + 1,
          name: findCoinNameBySymbol(
            item.competitor.token.replace(/\s|,/g, '').toUpperCase(),
          ),
          crypto: item.competitor.token.replace(/\s|,/g, '').toUpperCase(),
          fee: formatFeeValue(
            findKeyInCompetitorItem(
              competitorsData,
              'transaction fees',
              item.competitor.token,
            ),
          ),
        };
        transaction_fees_data.push(mapped_crypto);
      }
    });
    console.log('Transaction fees data: ', transaction_fees_data);
    setCryptos(transaction_fees_data);
    setActiveOption(transaction_fees_data[0]);
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
          <View style={styles.activeOptionContainer}>
            <Text style={styles.activeOptionValue}>
              {`$${activeOption ? activeOption.fee : 0.0} USD`}
            </Text>
          </View>
          <View style={styles.graphsContainer}>
            <DollarGraphs
              value={activeOption ? activeOption.fee : 0}
              itemIndex={findActiveOptionIndex(cryptos, activeOption)}
              styles={styles}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default TransactionFees;
