import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './FearAndGreedStyles';

const FearAndGreedIndex = ({indexValue}) => {
  const fearAndGreedValues = [
    {range: [0, 20], label: 'Extreme fear', color: '#ff0000'},
    {range: [21, 40], label: 'Fear', color: '#ff4500'},
    {range: [41, 60], label: 'Neutral', color: '#ffff00'},
    {range: [61, 80], label: 'Greed', color: '#32cd32'},
    {range: [81, 100], label: 'Extreme greed', color: '#008000'},
  ];
  const [currentValue, setCurrentValue] = useState(fearAndGreedValues[2]);

  useEffect(() => {
    fearAndGreedValues.forEach(obj => {
      if (indexValue >= obj.range[0] && indexValue <= obj.range[1]) {
        setCurrentValue(obj);
      }
    });
  }, [indexValue]);

  return (
    <View style={styles.container}>
      {/* <Speedometer
        value={indexValue}
        totalValue={100}
        size={300}
        showIndicator
        showLabels
        labelFormatter={number => `${number} %`}
        internalColor={currentValue && currentValue.color}
        innerColor={'#F7F7F7'}
        indicatorColor={"#777777"}
      />
      <Text style={[styles.indexNumber, {color: currentValue.color}]}>
        {indexValue}
      </Text>
      <Text style={styles.label}>{currentValue && currentValue.label}</Text> */}
      <Image style={styles.widget} source={{uri:'https://alternative.me/crypto/fear-and-greed-index.png'}} alt='Latest Crypto Fear & Greed Index' fadeDuration={500}/>
    </View>
  );
};

export default FearAndGreedIndex;
