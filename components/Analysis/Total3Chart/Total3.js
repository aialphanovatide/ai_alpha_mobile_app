import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import BackButton from '../BackButton/BackButton';
import useAnalysisStyles from '../AnalysisStyles';
const Total3 = () => {
  const styles = useAnalysisStyles();
  return (
    <SafeAreaView style={styles.background}>
      <BackButton />
      <Text style={styles.messageText}>Coming soon...</Text>
    </SafeAreaView>
  );
};

export default Total3;
