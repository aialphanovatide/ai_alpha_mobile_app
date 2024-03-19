import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {AboutIcon} from '../Fundamentals/AboutIcon';
import {home_static_data} from '../../../../homeStaticData';
import {AboutModalContext} from '../../../../../../context/AboutModalContext';

const CandlestickDetails = ({
  coin,
  lastPrice,
  styles,
  isPriceUp,
  loading,
  pairings,
  selectedPairing,
  handlePairingChange,
}) => {
  const {handleAboutPress} = useContext(AboutModalContext);

  // Format the prices
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

  const formatCoin = (coin, pairing) => {
    const pairing_word_index = coin.indexOf(pairing);
    const coin_word = coin.slice(0, pairing_word_index).toUpperCase();
    return `${coin_word}/${coin.slice(pairing_word_index, coin.length)}`;
  };
  
  return pairings.length > 1 ? (
    <View style={[styles.detailsContainer, styles.column]}>
      <Text style={[styles.detailslabel, styles.capitalize]}>Charts</Text>
      <AboutIcon
        description={home_static_data.charts.sectionDescription}
        handleAboutPress={handleAboutPress}
      />
      <View style={styles.pairingsMenuContainer}>
        {pairings.map((pairing, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.pairingButton,
              selectedPairing === pairing && styles.pairingActiveButton,
            ]}
            onPress={() => handlePairingChange(pairing)}>
            <Text
              style={[
                styles.pairingButtonText,
                selectedPairing === pairing && styles.pairingActiveText,
              ]}>
              {
                `${coin.toUpperCase()}/${pairing.toUpperCase()}` /* {formatCoin(coin, pairing)} */
              }
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  ) : (
    <View style={styles.detailsContainer}>
      <Text style={styles.detailslabel}>
        {
          `${coin.toUpperCase()}/${pairings[0].toUpperCase()}` /* {formatCoin(coin, pairings[0])} */
        }
      </Text>
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
