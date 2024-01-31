import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import useChartsStyles from './ChartsStyles';

const TimeframeSelector = ({selectedInterval, changeInterval}) => {
  const timeframes = ['1h', '4h', '1D', '1W'];
  const styles = useChartsStyles();
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
