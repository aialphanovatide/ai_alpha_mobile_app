import {Image, Text, View} from 'react-native';
import React from 'react';
import useVestingShedulesStyles from './VestingSchedulesStyles';

const VestingSchedule = ({year, tokens, crypto}) => {
  const styles = useVestingShedulesStyles();
  return (
    <View>
      <View style={styles.rowContainer}>
        <View style={styles.unlockIconContainer}>
          <Image
            style={styles.unlockIcon}
            source={require('../../../../../../../../assets/images/fundamentals/unlock.png')}
            resizeMode={'contain'}
          />
        </View>
        <Text style={styles.subtitle}>
          {crypto} tokens scheduled for release
        </Text>
      </View>
      <View style={styles.tokenDataContainer}>
        <View style={styles.yearContainer}>
          <View style={styles.calendarIconContainer}>
            <Image
              style={styles.calendarIcon}
              resizeMode={'contain'}
              source={require('../../../../../../../../assets/images/fundamentals/calendar.png')}
            />
          </View>
          <Text style={styles.yearText}>Year {year}</Text>
        </View>
        <Text style={styles.bigText}>{tokens} tokens</Text>
      </View>
    </View>
  );
};

export default VestingSchedule;
