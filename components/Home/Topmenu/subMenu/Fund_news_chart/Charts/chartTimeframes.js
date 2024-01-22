import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const TimeframeSelector = ({selectedInterval, changeInterval, styles}) => {
  const timeframes = ['1h', '4h', '1D', '1W'];

  return (
    <View style={styles.timeFrameContainer}>
      <View style={styles.timeFrameSubContainer}>
        {timeframes.map(interval => (
          <TouchableOpacity
            key={interval}
            style={
              selectedInterval === interval
                ? styles.timeFrameActiveButton
                : styles.timeFrameButton
            }
            onPress={() => changeInterval(interval)}>
            <Text
              style={
                selectedInterval === interval
                  ? styles.timeFrameActiveButtonText
                  : styles.timeFrameButtonText
              }>
              {interval}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default TimeframeSelector;
