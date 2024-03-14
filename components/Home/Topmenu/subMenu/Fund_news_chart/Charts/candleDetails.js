import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {AboutIcon} from '../Fundamentals/AboutIcon';
import {home_static_data} from '../../../../homeStaticData';
import {AboutModalContext} from '../../../../../../context/AboutModalContext';

const CandlestickDetails = ({coin, lastPrice, styles, isPriceUp, loading}) => {
  const {handleAboutPress} = useContext(AboutModalContext);
  const formatNumber = price => {
    const number = parseFloat(price);
    if (isNaN(number)) {
      return 'Invalid number';
    }
    return number.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatCoin = coin => {
    const usdt_word_index = coin.indexOf('USDT');
    const coin_word = coin.slice(0, usdt_word_index).toUpperCase();
    return `${coin_word}/${coin.slice(usdt_word_index, coin.length)}`;
  };
  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.detailslabel}>{formatCoin(coin)}</Text>
      <Text
        style={[
          styles.lastPrice,
          isPriceUp !== null
            ? isPriceUp
              ? styles.priceUpColor
              : styles.priceDownColor
            : {},
        ]}>
        ${lastPrice && !loading ? formatNumber(lastPrice) : ' ...'}
      </Text>
      <AboutIcon
        description={home_static_data.charts.sectionDescription}
        handleAboutPress={handleAboutPress}
      />
    </View>
  );
};

export default CandlestickDetails;
