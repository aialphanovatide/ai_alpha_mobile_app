import React, {useState} from 'react';
import useNewChartsStyles from './NewChartsStyles';
import {ScrollView, Text, View} from 'react-native';
import {AboutIcon} from '../../../../../../AboutModal/AboutIcon';
import {home_static_data} from '../../../../../../../assets/static_data/homeStaticData';
import AboutModal from '../../../../../../AboutModal/AboutModal';
import Chart from './NewChart';
import BackgroundGradient from '../../../../../../BackgroundGradient/BackgroundGradient';
import {useDispatch, useSelector} from 'react-redux';
import {
  handleAboutPress,
  handleClose,
  selectAboutDescription,
  selectAboutTitle,
  selectAboutVisible,
} from '../../../../../../../store/aboutSlice';

const initialCoinPriceData = {
  price: null,
  isPriceUp: null,
  pairing: 'USDT',
};

const ChartsSection = ({route}) => {
  const {interval, symbol, coinBot} =
    route.params.screen === 'Charts' ? route.params.params : route.params;
  const styles = useNewChartsStyles();
  // Coin price data
  const [currentPrice, setCurrentPrice] = useState(initialCoinPriceData);
  const dispatch = useDispatch();

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

  // Function to handle the about modal visibility and content based on the section that the user clicked on

  const toggleAbout = (description = null, title = null) => {
    dispatch(handleAboutPress({description, title}));
  };

  const closeAbout = () => {
    dispatch(handleClose());
  };

  return (
    <ScrollView
      style={[styles.flex]}
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
          title={home_static_data.charts.sectionTitle}
          description={home_static_data.charts.sectionDescription}
          handleAboutPress={toggleAbout}
        />
      </View>
      {/* {aboutVisible && (
        <AboutModal
          title={aboutTitle}
          description={aboutDescription}
          onClose={closeAbout}
          visible={aboutVisible}
        />
      )} */}
      <Chart coinBot={coinBot} handlePriceChange={handlePriceChange} />
    </ScrollView>
  );
};

export default ChartsSection;
