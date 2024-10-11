import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import useChartsStyles from './ChartsStyles';

const TimeframeSelector = ({
  selectedInterval,
  selectedPairing,
  changeInterval,
  hasHourlyTimes,
  additionalStyles = null,
  disabled = null,
}) => {
  const timeframes = hasHourlyTimes
    ? ['1h', '4h', '1d', '1w']
    : selectedPairing.toLowerCase() === 'btc' ||
      selectedPairing.toLowerCase() === 'eth'
    ? ['1D']
    : ['1D', '1W'];

  const styles = useChartsStyles();

  // Show the height and width of the phone
  // const {height, width} = Dimensions.get('window');

  // calculate the proper width for each timeframe btn

  // Calculate proper width for the main container
  // const timeframe_width = (36 * timeframes.length) + 2;
  // const timeframeContainerWidth = () => {
  //   if (width > 500) {
  //     if (timeframe_width >= 99) {
  //       return '12%';
  //     } else if (timeframe_width >= 49) {
  //       return '25%';
  //     } else {
  //       return '49%';
  //     }
  //   } else {
  //     if (timeframe_width >= 99) {
  //       return '25%';
  //     } else if (timeframe_width >= 49) {
  //       return '50%';
  //     } else {
  //       return '80%';
  //     }
  //   }
  // };

  return (
    <View
      style={[
        styles.timeFrameContainer,
        // {width: timeframe_width},
        additionalStyles,
      ]}>
      {timeframes.map(interval => (
        <TouchableOpacity
          key={interval}
          disabled={disabled !== null ? disabled : false}
          style={[
            styles.timeFrameButton,
            selectedInterval === interval ? styles.activeTimeFrame : {},
            {width: `${100 / timeframes.length}%`},
          ]}
          onPress={() => changeInterval(interval)}>
          <Text
            style={[
              styles.timeFrameButtonText,
              selectedInterval === interval ? styles.activeText : {},
            ]}>
            {interval}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TimeframeSelector;
