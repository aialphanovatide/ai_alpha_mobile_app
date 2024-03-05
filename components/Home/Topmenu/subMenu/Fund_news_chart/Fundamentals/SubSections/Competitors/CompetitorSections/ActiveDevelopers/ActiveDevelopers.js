import {Image, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import useActiveDevelopersStyles from './ActiveDevelopersStyle';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';
import Loader from '../../../../../../../../../Loader/Loader';
import NoContentMessage from '../../../../NoContentMessage/NoContentMessage';
import {findCoinNameBySymbol} from '../../coinsNames';

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
  const tintColors = ['#20CBDD', '#895EF6', '#FF3BC3', '#C539B4'];
  const chosenColor = tintColors[itemIndex > 3 ? itemIndex % 3 : itemIndex];
  const {isDarkMode} = useContext(AppThemeContext);
  return (
    <View style={styles.itemContainer}>
      <View style={styles.row}>
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/coins/${item.crypto.toLowerCase()}.png`,
              width: 30,
              height: 30,
            }}
            style={styles.image}
            resizeMode={'contain'}
          />
        </View>
        <Text style={styles.itemName}>{item.name}</Text>
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

const ActiveDevelopers = ({competitorsData, isSectionWithoutData}) => {
  const styles = useActiveDevelopersStyles();
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  const findMaxActiveDevsValue = cryptos => {
    let maxDevs = 0;
    cryptos.forEach(item => {
      if (item.activeDevs > maxDevs) {
        maxDevs = item.activeDevs;
      }
    });
    return maxDevs;
  };

  const findKeyInCompetitorItem = (data, key, crypto) => {
    const found = data.find(
      item =>
        item.competitor.token === crypto && item.competitor.key.includes(key),
    );
    console.log('Key received: ', key, 'Apr value found: ', found);
    return found && found !== undefined
      ? found.competitor.value !== '-'
        ? found.competitor.value
        : ''
      : null;
  };

  useEffect(() => {
    setLoading(true);
    const active_devs_data = [];
    competitorsData.forEach((item, index) => {
      if (
        active_devs_data.find(
          mappedItem =>
            mappedItem.crypto ===
            item.competitor.token.replace(/\s/g, '').toUpperCase(),
        )
      ) {
        return;
      } else {
        const mapped_crypto = {
          id: index + 1,
          name: findCoinNameBySymbol(
            item.competitor.token.replace(/\s/g, '').toUpperCase(),
          ),
          crypto: item.competitor.token.replace(/\s/g, '').toUpperCase(),
          activeDevs: isNaN(
            Number(
              findKeyInCompetitorItem(
                competitorsData,
                'active developers',
                item.competitor.token,
              )
                .replace(/\s|,/g, '')
                .replace(/,/g, '.'),
            ),
          )
            ? 0
            : Number(
                findKeyInCompetitorItem(
                  competitorsData,
                  'active developers',
                  item.competitor.token,
                ).replace(/\s|,/g, ''),
              ),
        };
        active_devs_data.push(mapped_crypto);
      }
    });
    console.log(active_devs_data);
    setCryptos(active_devs_data);
    setLoading(false);
  }, [competitorsData]);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : cryptos?.length === 0 ||
        isSectionWithoutData(competitorsData, 'active developers', '-') ? (
        <NoContentMessage />
      ) : (
        cryptos.map((item, index) => (
          <ActiveDevsItem
            key={index}
            item={item}
            styles={styles}
            itemIndex={index}
            maxValue={findMaxActiveDevsValue(cryptos)}
          />
        ))
      )}
    </View>
  );
};

export default ActiveDevelopers;
