import React, {useContext} from 'react';
import {Image, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import useCryptoCalendarStyles from './CryptoCalendarStyles';
import {AppThemeContext} from '../../../../context/themeContext';

const CryptoItem = ({option, active, handleOptionTouch, styles}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  return (
    <TouchableOpacity onPress={() => handleOptionTouch(option)}>
      <View style={[styles.cryptoItem, active && styles.activeCryptoItem]}>
        <View style={styles.cryptoIconContainer}>
          <Image
            style={styles.cryptoIcon}
            source={
              isDarkMode
                ? active
                  ? option.iconImage.dark.active
                  : option.iconImage.dark.inactive
                : active
                ? option.iconImage.light.active
                : option.iconImage.light.inactive
            }
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
        bounces={false}
        style={styles.flex}>
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
