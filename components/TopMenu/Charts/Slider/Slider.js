import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
import TradingViewChart from '../../../Home/Tickertape/TradingViewChart';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleIndexChanged = index => {
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <Swiper
        loop={false}
        showsButtons={false}
        showsPagination={false}
        onIndexChanged={handleIndexChanged}>
        {/* Contenido del primer slide */}
        <View style={styles.slide}>
          <TradingViewChart
            widgetId={1}
            width={'90%'}
            height={'500'}
            symbol={'BINANCE:BTCUSDT'}
          />
        </View>

        {/* Contenido del segundo slide */}
        <View style={[styles.slide, {backgroundColor: 'green'}]}>
          <Text>Slide 2</Text>
        </View>

        {/* Contenido del tercer slide */}
        <View style={[styles.slide, {backgroundColor: 'red'}]}>
          <Text>Slide 3</Text>
        </View>
      </Swiper>

      <View style={styles.indicatorContainer}>
        {[...Array(3)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentIndex && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    display: 'flex',
    width: '600',
    height: '400',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    margin: 5,
  },
  activeIndicator: {
    backgroundColor: 'blue', // Color cuando el indicador está activo
  },
});

export default Slider;
