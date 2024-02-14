import {Image, Text, View} from 'react-native';
import React, {useContext} from 'react';
import useActiveDevelopersStyles from './ActiveDevelopersStyle';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const generateActiveDevs = (
  value,
  maxValue,
  styles,
  isDarkMode,
  chosenColor,
) => {
  const images = [];
  for (let i = 0; i < 4; i++) {
    const colored = i < Math.ceil((value / maxValue) * 4);
    images.push(
      <View key={`activeDevs_${i}`} style={styles.devImageContainer}>
        <Image
          source={require('../../../../../../../../../../assets/dailydevelopers.png')}
          style={[
            styles.image,
            {
              tintColor: colored
                ? chosenColor
                : isDarkMode
                ? '#74788D'
                : '#EFEFEF',
            },
          ]}
          resizeMode={'contain'}
        />
      </View>,
    );
  }

  return images;
};

const ActiveDevsItem = ({item, styles, maxValue, itemIndex}) => {
  const tintColors = ['#399AEA', '#20CBDD', '#895EF6', '#EB3ED6'];
  const chosenColor = tintColors[itemIndex > 3 ? itemIndex % 3 : itemIndex];
  const {isDarkMode} = useContext(AppThemeContext);
  return (
    <View style={styles.itemContainer}>
      <View style={styles.row}>
        <View style={styles.logoContainer}>
          <Image
            source={item.image}
            style={styles.image}
            resizeMode={'contain'}
          />
        </View>
        <Text style={styles.itemName}>{item.crypto}</Text>
      </View>
      <View style={styles.activeDevsContainer}>
        {generateActiveDevs(
          item.activeDevs,
          maxValue,
          styles,
          isDarkMode,
          chosenColor,
        )}
        <Text style={[styles.activeDevsValue, {color: chosenColor}]}>
          {item.activeDevs}
        </Text>
      </View>
    </View>
  );
};

const ActiveDevelopers = ({cryptos}) => {
  const styles = useActiveDevelopersStyles();
  const findMaxActiveDevsValue = cryptos => {
    let maxDevs = 0;
    cryptos.forEach(item => {
      if (item.activeDevs > maxDevs) {
        maxDevs = item.activeDevs;
      }
    });
    return maxDevs;
  };
  return (
    <View>
      {cryptos.map((item, index) => (
        <ActiveDevsItem
          key={index}
          item={item}
          styles={styles}
          itemIndex={index}
          maxValue={findMaxActiveDevsValue(cryptos)}
        />
      ))}
    </View>
  );
};

export default ActiveDevelopers;
