import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import useChartsStyles from './ChartsStyles';

// Component to render the time selector options, which are used to change the time interval of the charts. The options are 1h, 4h, 1d, and 1w. The selected interval is highlighted with a different color. The time intervals are different depending on the selected pairing and whether the pairing has hourly times. The component receives the selected interval, selected pairing, change interval function, has hourly times, additional styles, and disabled as props. 

const ChartTimeSelector = ({
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

  return (
    <View
      style={[
        styles.timeFrameContainer,
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

export default ChartTimeSelector;
