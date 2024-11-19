import React, {useContext} from 'react';
import {Text, View, ScrollView, TouchableWithoutFeedback} from 'react-native';
import useCryptoCalendarStyles from './CryptoCalendarStyles';
import {AppThemeContext} from '../../../../context/themeContext';
import FastImage from 'react-native-fast-image';

// Component that renders the crypto item to be displayed in the cryptos menu. It displays the icon and name of the crypto.

const CryptoItem = ({option, active, handleOptionTouch, styles}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  return (
    <TouchableWithoutFeedback onPress={() => handleOptionTouch(option)}>
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
              cache: FastImage.cacheControl.immutable,
            }}
            resizeMode={'contain'}
            fallback={true}
          />
        </View>
        <Text style={[styles.cryptoName, active && styles.activeCryptoName]}>
          {option.category_name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

// Component that renders the crypto filter. It displays the cryptos menu and allows the user to select a crypto to view its events. It receives the options, currentFilter, handleOptionTouch, and style as props. 

const CryptoFilter = ({
  options,
  currentFilter,
  handleOptionTouch,
  style = null,
}) => {
  const styles = useCryptoCalendarStyles();

  return (
    <View style={styles.cryptoFilter}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        style={[styles.flex, style]}>
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
