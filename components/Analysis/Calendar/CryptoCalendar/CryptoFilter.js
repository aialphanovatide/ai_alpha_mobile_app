import React from 'react';
import {Image, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import styles from './CryptoCalendarStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

const CryptoItem = ({option, active, handleOptionTouch}) => {
  return (
    <TouchableOpacity onPress={() => handleOptionTouch(option)}>
      <View style={[styles.cryptoItem, active && styles.activeCryptoItem]}>
        <View style={styles.cryptoIconContainer}>
          {/* TODO - Change to display the icon of every option */}
          <Image
            style={styles.cryptoIcon}
            source={require('../../../../assets/bitcoin.png')}
            resizeMode={'contain'}
          />
        </View>
        <Text style={styles.cryptoName}>{option.icon}</Text>
      </View>
    </TouchableOpacity>
  );
};

const CryptoFilter = ({options, currentFilter, handleOptionTouch}) => {
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
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CryptoFilter;
