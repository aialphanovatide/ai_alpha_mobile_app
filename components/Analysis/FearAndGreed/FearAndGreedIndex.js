import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import FastImage from 'react-native-fast-image';

const FearAndGreedIndex = ({styles, currentDate}) => {
  // const fearAndGreedValues = [
  //   {range: [0, 20], label: 'Extreme fear', color: '#ff0000'},
  //   {range: [21, 40], label: 'Fear', color: '#ff4500'},
  //   {range: [41, 60], label: 'Neutral', color: '#ffff00'},
  //   {range: [61, 80], label: 'Greed', color: '#32cd32'},
  //   {range: [81, 100], label: 'Extreme greed', color: '#008000'},
  // ];

  const [date, setDate] = useState(null);

  useEffect(() => {
    const actualDate = getFormattedDate();
    setDate(actualDate);
  }, []);

  const getFormattedDate = () => {
    const actualDate = new Date();
    const yyyy = actualDate.getFullYear();
    const mm = String(actualDate.getMonth() + 1);
    const dd = String(actualDate.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    date && (
      <View style={styles.container}>
        <FastImage
          style={styles.widget}
          source={{
            // uri: `https://alternative.me/images/fng/crypto-fear-and-greed-index-${date}.png`,
            uri: 'https://alternative.me/crypto/fear-and-greed-index.png',
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          alt="Latest Crypto Fear & Greed Index"
          fallback={true}
          fadeDuration={500}
        />
      </View>
    )
  );
};

export default FearAndGreedIndex;
