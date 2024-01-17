import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import BackButton from '../BackButton/BackButton';
import useAnalysisStyles from '../AnalysisStyles';

const BtcDominance = () => {
  const styles = useAnalysisStyles();
  return (
    <SafeAreaView style={styles.background}>
      <BackButton />
      <Text style={styles.messageText}>Coming soon...</Text>
    </SafeAreaView>
  );
};

export default BtcDominance;
