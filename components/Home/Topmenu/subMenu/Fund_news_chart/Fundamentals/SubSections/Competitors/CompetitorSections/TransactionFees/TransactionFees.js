import {Image, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import CryptosSelector from '../../CryptoSelector/CryptosSelector';
import useTransactionFeeStyles from './TransactionFeesStyles';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';
import Loader from '../../../../../../../../../Loader/Loader';
import NoContentMessage from '../../../../NoContentMessage/NoContentMessage';
import {findCoinNameBySymbol} from '../../coinsNames';
import SkeletonLoader from '../../../../../../../../../Loader/SkeletonLoader';

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
                height: 100 * decimalValue,
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

const TransactionFees = ({competitorsData, isSectionWithoutData}) => {
  const [cryptos, setCryptos] = useState([]);
  const styles = useTransactionFeeStyles();
  const [activeOption, setActiveOption] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleActiveOptionChange = option => {
    setActiveOption(option);
  };

  const formatFeeValue = stringValue => {
    if (stringValue === null || stringValue === undefined) {
      return 0;
    }
    const formatted_string = stringValue.replace(/\s/g, '');
    const number = Number(formatted_string.replace(/,/g, '.'));
    return isNaN(number) ? 0 : number;
  };

  const findActiveOptionIndex = (cryptos, active) => {
    return cryptos.findIndex(crypto => crypto.crypto === active.crypto);
  };

  const findKeyInCompetitorItem = (data, key, crypto) => {
    const found = data.find(
      item =>
        item.competitor.token === crypto && item.competitor.key.includes(key),
    );
    return found && found !== undefined
      ? found.competitor.value !== '-'
        ? found.competitor.value
        : ''
      : null;
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
          display_transaction_fee: findKeyInCompetitorItem(
            competitorsData,
            'transaction fees',
            item.competitor.token,
          )
            ? findKeyInCompetitorItem(
                competitorsData,
                'transaction fees',
                item.competitor.token,
              ).replace(/\s/g, '')
            : null,
        };
        transaction_fees_data.push(mapped_crypto);
      }
    });
    setCryptos(transaction_fees_data);
    setActiveOption(transaction_fees_data[0]);
    setLoading(false);
  }, [competitorsData]);

  return (
    <View>
      {loading ? (
        <SkeletonLoader type='selector' quantity={4} />
      ) : cryptos?.length === 0 ||
        isSectionWithoutData(competitorsData, 'transaction fees', '-') ? (
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
              {`$${
                activeOption && activeOption.display_transaction_fee
                  ? activeOption.display_transaction_fee.toUpperCase()
                  : 0.0
              }`}
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
