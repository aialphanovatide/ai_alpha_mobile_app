import {Text, View} from 'react-native';
import React from 'react';
import useFundamentalsStyles from '../FundamentalsStyles';

const SubSection = ({subtitle, content}) => {
  const styles = useFundamentalsStyles();
  return (
    <View style={styles.subSection}>
      <Text style={styles.subTitle}>{subtitle}</Text>
      <View style={styles.subSectionContent}>{content}</View>
    </View>
  );
};

export default SubSection;
