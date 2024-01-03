import React from 'react';
import {Image, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import useCryptoCalendarStyles from './CryptoCalendarStyles';

const CryptoItem = ({option, active, handleOptionTouch, styles}) => {
  return (
    <TouchableOpacity onPress={() => handleOptionTouch(option)}>
      <View style={[styles.cryptoItem, active && styles.activeCryptoItem]}>
        <View style={styles.cryptoIconContainer}>
          <Image
            style={styles.cryptoIcon}
            source={option.iconImage}
            resizeMode={'contain'}
          />
        </View>
        <Text style={[styles.cryptoName, active && styles.activeCryptoName]}>
          {option.icon}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const CryptoFilter = ({options, currentFilter, handleOptionTouch}) => {
  const styles = useCryptoCalendarStyles();

  return (
    <View style={styles.cryptoFilter}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}>
        {options.map(option => (
          <CryptoItem
            key={option.id}
            option={option}
            active={option === currentFilter}
            handleOptionTouch={handleOptionTouch}
            styles={styles}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CryptoFilter;
