import React from 'react';
import { View, Text} from 'react-native';

const AlertDetails = ({ message, price, timeframe, styles }) => {
  return (
    <View style={styles.alertDetailsContainer}>
      <View style={styles.alertDetailsLeftContent}>
        <Text style={styles.alertDetailsTitle}>{timeframe}</Text>
        <Text style={styles.alertDetailsSubtitle}>{message}</Text>
      </View>
      <View style={styles.alertDetailsRightContent}>
        <Text style={styles.alertDetailsRightTitle}>${price}</Text>
      </View>
    </View>
  );
};

export default AlertDetails;
