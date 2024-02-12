import React from 'react';
import {Image, Text, View} from 'react-native';
import useUpdatedRevenueModelStyles from './UpdatedRevenueModelStyles';

const UpdatedRevenueModel = ({title, subtitle, value}) => {
  const styles = useUpdatedRevenueModelStyles();
  return (
    <View style={styles.container}>
      <Image
        style={styles.revenueImage}
        resizeMode="contain"
        source={require('../../../../../../../../assets/images/fundamentals/revenueModel.png')}
      />
      <View style={styles.textContainer}>
        <Text style={styles.revenueTitle}>{title}</Text>
        <Text style={styles.revenueSubtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.revenueValue}>{value}</Text>
    </View>
  );
};

export default UpdatedRevenueModel;
