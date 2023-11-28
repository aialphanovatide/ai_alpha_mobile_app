import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import styles from './PriceActionStyles';

const PriceAction = () => {
  const {height, width} = Dimensions.get('window');
  return (
    <View style={[styles.priceActionContainer, width]}>
      <Text style={styles.title}>Price action</Text>
    </View>
  );
};

export default PriceAction;
