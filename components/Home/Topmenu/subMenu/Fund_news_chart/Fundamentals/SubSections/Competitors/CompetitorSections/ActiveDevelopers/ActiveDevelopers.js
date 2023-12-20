import {Image, Text, View} from 'react-native';
import React from 'react';
import styles from './ActiveDevelopersStyle';

const generateActiveDevs = value => {
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

const ActiveDevsItem = ({item}) => {
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
        {generateActiveDevs(item.activeDevs)}
        <Text style={styles.activeDevsValue}>{item.activeDevs}</Text>
      </View>
    </View>
  );
};

const ActiveDevelopers = ({cryptos}) => {
  return (
    <View>
      {cryptos.map((item, index) => (
        <ActiveDevsItem key={index} item={item} />
      ))}
    </View>
  );
};

export default ActiveDevelopers;
