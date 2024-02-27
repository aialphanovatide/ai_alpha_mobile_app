import {Image, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import CryptosSelector from '../../CryptoSelector/CryptosSelector';
import useTransactionFeeStyles from './TransactionFeesStyles';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';
import Loader from '../../../../../../../../../Loader/Loader';

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
      <Image
        key={'zero'}
        style={styles.dollarImage}
        source={
          isDarkMode
            ? require('../../../../../../../../../../assets/images/fundamentals/competitors/transactionFees/dollar-dark.png')
            : require('../../../../../../../../../../assets/images/fundamentals/competitors/transactionFees/dollar.png')
        }
        resizeMode="contain"
      />,
    );
  }

  return images;
};

const TransactionFees = ({competitorsData}) => {
  const [cryptos, setCryptos] = useState([]);
  const styles = useTransactionFeeStyles();
  const [activeOption, setActiveOption] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleActiveOptionChange = option => {
    setActiveOption(option);
  };

  const formatFeeValue = stringValue => {
    const formatted_string = stringValue.replace('$', '').split(' ');
    const number = Number(formatted_string[0]);
    // console.log('Formatted transaction fees value: ', number);
    return number;
  };

  const findActiveOptionIndex = (cryptos, active) => {
    return cryptos.findIndex(crypto => crypto.crypto === active.crypto);
  };

  const findKeyInCompetitorItem = (data, key, crypto) => {
    const found = data.find(
      item => item.competitor.token === crypto && item.competitor.key === key,
    );
    return found && found !== undefined ? found.competitor.value : null;
  };

  useEffect(() => {
    setLoading(true);
    const transaction_fees_data = [];
    competitorsData.forEach((item, index) => {
      if (
        transaction_fees_data.find(mappedItem =>
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
          crypto:
            item.competitor.token.indexOf('(') !== -1
              ? item.competitor.token
                  .slice(0, item.competitor.token.indexOf('(') - 1)
                  .toUpperCase()[0] +
                item.competitor.token
                  .slice(0, item.competitor.token.indexOf('(') - 1)
                  .slice(1)
              : item.competitor.token.replace(' ', '').toUpperCase()[0] +
                item.competitor.token.replace(' ', '').slice(1),
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
    // console.log(transaction_fees_data);
    setCryptos(transaction_fees_data);
    setActiveOption(transaction_fees_data[0]);
    setLoading(false);
  }, [competitorsData]);

  if (loading) {
    return (
      <View>
        <Loader />
      </View>
    );
  }

  if (!cryptos || cryptos?.length === 0) {
    return null;
  }

  return (
    <View>
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
    </View>
  );
};

export default TransactionFees;
