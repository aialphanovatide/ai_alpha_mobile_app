import React from 'react';
import {Text, View} from 'react-native';
const AlertDetails = ({message, price, timeframe, styles}) => {
  const timeframeStyle = {
    color: timeframe.toLowerCase().includes('bullish') ? 'green' : 'red',
  };
  const parseTimeframeString = timeFrameString => {
    const match = timeFrameString.match(
      /^(.*?)\s+(BULLISH|BEARISH|OVERBOUGHT|OVERSOLD)$/i,
    );
    if (match) {
      const [_, leftText, word] = match;
      return {leftText, word};
    } else {
      console.error('Incorrect string pattern');
      return {leftText: 'Error', word: 'Error'};
    }
  };

  const {leftText, word} = parseTimeframeString(timeframe);

  return (
    <View style={styles.itemsContainer}>
      <View style={styles.leftContent}>
        <Text style={styles.itemsTitle}>{`${leftText}`}</Text>
        <Text style={{...styles.itemsTitle, ...timeframeStyle}}>
          {`${word}`}
        </Text>
        <Text style={styles.subtitle}>{message}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.rightTitle}>${price}</Text>
      </View>
    </View>
  );
};

export default AlertDetails;
