import React, {useContext} from 'react';
import {Image, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import useCryptoCalendarStyles from './CryptoCalendarStyles';
import {AppThemeContext} from '../../../../context/themeContext';
import FastImage from 'react-native-fast-image';

const CryptoItem = ({option, active, handleOptionTouch, styles}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  return (
    <TouchableOpacity onPress={() => handleOptionTouch(option)}>
      <View style={[styles.cryptoItem, active && styles.activeCryptoItem]}>
        <View style={styles.cryptoIconContainer}>
          <FastImage
            style={styles.cryptoIcon}
            source={{
              uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/${
                isDarkMode ? 'Dark' : 'Light'
              }/${active ? 'Active' : 'Inactive'}/${option.category_name
                .toLowerCase()
                .replace(/\s/g, '')}.png`,
              priority: FastImage.priority.high,
            }}
            resizeMode={'contain'}
            fallback={true}
          />
        </View>
        <Text style={[styles.cryptoName, active && styles.activeCryptoName]}>
          {option.category_name}
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
        bounces={false}
        style={styles.flex}>
        {options.map(option => (
          <CryptoItem
            key={option.category}
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
