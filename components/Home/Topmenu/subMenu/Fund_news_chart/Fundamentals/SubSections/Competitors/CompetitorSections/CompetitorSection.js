import {Text, View} from 'react-native';
import React from 'react';

const CompetitorSection = ({title, component, styles}) => {
  return (
    <View style={styles.competitorSection}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.contentContainer}>{component}</View>
    </View>
  );
};

export default CompetitorSection;
