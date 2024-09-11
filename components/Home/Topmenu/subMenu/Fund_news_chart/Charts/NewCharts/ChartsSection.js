import React, {useContext, useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../../../../../../context/themeContext';
import useNewChartsStyles from './NewChartsStyles';
import {ScrollView, Text, View} from 'react-native';
import {AboutIcon} from '../../Fundamentals/AboutIcon';
import {home_static_data} from '../../../../../homeStaticData';
import {AboutModalContext} from '../../../../../../../context/AboutModalContext';
import AboutModal from '../../Fundamentals/AboutModal';
import Chart from './NewChart';
import BackgroundGradient from '../../../../../../BackgroundGradient/BackgroundGradient';

const initialCoinPriceData = {
  price: null,
  isPriceUp: null,
  pairing: 'USDT',
};

const ChartsSection = ({route}) => {
  const {interval, symbol, coinBot} =
    route.params.screen === 'Charts' ? route.params.params : route.params;
  const {isDarkMode} = useContext(AppThemeContext);
  const styles = useNewChartsStyles();
  const {aboutDescription, aboutVisible, handleAboutPress} =
    useContext(AboutModalContext);
  // Coin price data
  const [currentPrice, setCurrentPrice] = useState(initialCoinPriceData);

  // Function to handle the price change depending on the charts data change
  const handlePriceChange = (price, isPriceUp, currentPairing) => {
    const newPriceData = {
      price: price,
      isPriceUp: isPriceUp,
      pairing: currentPairing,
    };
    setCurrentPrice(newPriceData);
  };

  // Format the current price, show over the charts
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

  return (
    <ScrollView
      style={[styles.flex, {padding: 10}]}
      bounces={false}
      bouncesZoom={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <BackgroundGradient />
      <View style={styles.titleRow}>
        <Text style={styles.detailslabel}>
          {`${coinBot.toUpperCase()}/${currentPrice?.pairing.toUpperCase()}`}
        </Text>
        <Text
          style={[
            styles.lastPrice,
            currentPrice?.isPriceUp !== null
              ? currentPrice?.isPriceUp
                ? styles.priceUpColor
                : styles.priceDownColor
              : {},
          ]}>
          {`${currentPrice?.pairing.toUpperCase() === 'USDT' ? '$' : ''}${
            currentPrice?.price ? formatNumber(currentPrice?.price) : ' ...'
          }`}
        </Text>
        <AboutIcon
          description={home_static_data.charts.sectionDescription}
          handleAboutPress={handleAboutPress}
        />
      </View>
      {aboutVisible && (
        <AboutModal
          description={aboutDescription}
          onClose={handleAboutPress}
          visible={aboutVisible}
        />
      )}
      <Chart coinBot={coinBot} handlePriceChange={handlePriceChange} />
    </ScrollView>
  );
};

export default ChartsSection;
