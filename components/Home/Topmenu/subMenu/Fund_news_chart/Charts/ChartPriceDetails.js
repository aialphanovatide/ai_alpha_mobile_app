import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {AboutIcon} from '../../../../../AboutModal/AboutIcon';
import {home_static_data} from '../../../../../../assets/static_data/homeStaticData';
import {useDispatch} from 'react-redux';
import {handleAboutPress} from '../../../../../../store/aboutSlice';

const ChartPriceDetails = ({
  coin,
  lastPrice,
  interval,
  styles,
  isPriceUp,
  loading,
  pairings,
  selectedPairing,
  selectedInterval,
  handlePairingChange,
  handleDataUpdate,
}) => {
  const dispatch = useDispatch();

  // Function to handle the about modal visibility and content based on the section that the user clicked on

  const toggleAbout = (description = null, title = null) => {
    dispatch(handleAboutPress({description, title}));
  };

  // Format the prices
  const formatNumber = price => {
    const number = parseFloat(price);
    if (isNaN(number)) {
      return 'Invalid number';
    }

    if (number < 0.01) {
      return number.toLocaleString(undefined, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 6,
      });
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
      <View style={styles.flexRow}>
        <Text style={styles.detailslabel}>
          {`${coin.toUpperCase()}/${selectedPairing.toUpperCase()}`}
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
          {`${selectedPairing.toUpperCase() === 'USDT' ? '$' : ''}${
            lastPrice && !loading ? formatNumber(lastPrice) : ' ...'
          }`}
        </Text>
        <TouchableOpacity
          onPress={() => handleDataUpdate(selectedPairing, selectedInterval)}
          disabled={loading}>
          <Image
            source={require('../../../../../../assets/images/home/charts/chart-refresh.png')}
            style={[styles.refreshButton]}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <AboutIcon
          title={home_static_data.charts.sectionTitle}
          description={home_static_data.charts.sectionDescription}
          handleAboutPress={toggleAbout}
        />
      </View>
      <View style={styles.pairingsMenuContainer}>
        {pairings.map((pairing, index) => (
          <TouchableOpacity
            key={index}
            disabled={loading}
            style={[
              styles.pairingButton,
              {width: `${100 / pairings.length}%`},
              selectedPairing === pairing && styles.pairingActiveButton,
            ]}
            onPress={() => handlePairingChange(pairing, interval)}>
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

export default ChartPriceDetails;
