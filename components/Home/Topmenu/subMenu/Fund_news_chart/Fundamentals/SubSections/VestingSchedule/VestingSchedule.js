import {Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './VestingSchedulesStyles';

const VestingSchedule = ({year, tokens}) => {
  return (
    <View>
      <View style={styles.rowContainer}>
        <Icon name="unlock-alt" size={25} color="gray" />
        <Text style={styles.subtitle}>NEAR tokens scheduled for release</Text>
      </View>
      <View style={styles.tokenDataContainer}>
        <View style={styles.yearContainer}>
          <Icon name="calendar" size={15} color="white" />
          <Text style={styles.yearText}>Year {year}</Text>
        </View>
        <Text style={styles.bigText}>{tokens} tokens</Text>
      </View>
    </View>
  );
};

export default VestingSchedule;
