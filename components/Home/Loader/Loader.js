import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import styles from './LoaderStyles';

const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#FC5404" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

export default Loader;
