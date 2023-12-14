import {Text, View} from 'react-native';
import React from 'react';
import styles from '../CompetitorsStyles';

const CompetitorSection = ({title, component}) => {
  return (
    <View style={styles.competitorSection}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.contentContainer}>{component}</View>
    </View>
  );
};

export default CompetitorSection;
