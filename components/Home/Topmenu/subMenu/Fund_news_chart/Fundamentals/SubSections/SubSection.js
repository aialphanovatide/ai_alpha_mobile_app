import {Text, View} from 'react-native';
import React from 'react';
import styles from '../FundamentalsStyles';

const SubSection = ({subtitle, content}) => {
  return (
    <View style={styles.subSection}>
      <Text style={styles.subTitle}>{subtitle}</Text>
      <View style={styles.subSectionContent}>{content}</View>
    </View>
  );
};

export default SubSection;
