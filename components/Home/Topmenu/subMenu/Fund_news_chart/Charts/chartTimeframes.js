import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import useChartsStyles from './ChartsStyles';

const TimeframeSelector = ({
  selectedInterval,
  selectedPairing,
  changeInterval,
  hasHourlyTimes,
}) => {
  const timeframes = hasHourlyTimes
    ? ['1h', '4h', '1D', '1W']
    : selectedPairing.toLowerCase() === 'btc'
    ? ['1W']
    : ['1D', '1W'];
  const styles = useChartsStyles();
  const timeframe_width = 100 / timeframes.length - 1;
  return (
    <View style={styles.timeFrameContainer}>
      {timeframes.map(interval => (
        <TouchableOpacity
          key={interval}
          style={[
            selectedInterval === interval
              ? styles.timeFrameActiveButton
              : styles.timeFrameButton,
            {width: `${timeframe_width}%`},
          ]}
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
  );
};

export default TimeframeSelector;
