import {Image, Text, View} from 'react-native';
import React from 'react';
import useActiveDevelopersStyles from './ActiveDevelopersStyle';

const generateActiveDevs = (value, styles) => {
  const images = [];
  const quantity = Math.ceil(value / 50);

  for (let i = 0; i < quantity; i++) {
    images.push(
      <View key={`activeDevs_${i}`} style={styles.devImageContainer}>
        <Image
          source={require('../../../../../../../../../../assets/dailydevelopers.png')}
          style={styles.image}
          resizeMode={'contain'}
        />
      </View>,
    );
  }

  return images;
};

const ActiveDevsItem = ({item, styles}) => {
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
        {generateActiveDevs(item.activeDevs, styles)}
        <Text style={styles.activeDevsValue}>{item.activeDevs}</Text>
      </View>
    </View>
  );
};

const ActiveDevelopers = ({cryptos}) => {
  const styles = useActiveDevelopersStyles();
  return (
    <View>
      {cryptos.map((item, index) => (
        <ActiveDevsItem key={index} item={item} styles={styles} />
      ))}
    </View>
  );
};

export default ActiveDevelopers;
