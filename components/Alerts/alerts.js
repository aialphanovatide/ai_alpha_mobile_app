import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import useAlertsStyles from './styles';

const Alerts = () => {
  const styles = useAlertsStyles();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.messageText}>Coming soon...</Text>
    </SafeAreaView>
  );
};

export default Alerts;
