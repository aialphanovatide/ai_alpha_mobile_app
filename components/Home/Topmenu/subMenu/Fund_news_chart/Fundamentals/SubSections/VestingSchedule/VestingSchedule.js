import {Image, Text, View} from 'react-native';
import React from 'react';
import useVestingShedulesStyles from './VestingSchedulesStyles';

const VestingSchedule = ({crypto, schedules}) => {
  const styles = useVestingShedulesStyles();
  const formatTokensNumber = number => {
    const parts = number.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return parts.join('.');
  };

  if (!crypto || !schedules || schedules.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Image
          style={styles.unlockIcon}
          source={require('../../../../../../../../assets/images/fundamentals/unlock.png')}
          resizeMode={'contain'}
        />
        <Text style={styles.subtitle}>
          {crypto} tokens scheduled for release
        </Text>
      </View>
      <View style={styles.tokenDataContainer}>
        {schedules.map((schedule, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.yearContainer}>
              <Image
                style={styles.calendarIcon}
                resizeMode={'contain'}
                source={require('../../../../../../../../assets/images/fundamentals/calendar.png')}
              />
              <Text style={styles.yearText}>{schedule.date}</Text>
            </View>
            <Text style={styles.bigText}>
              {formatTokensNumber(schedule.tokens)} tokens
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default VestingSchedule;
