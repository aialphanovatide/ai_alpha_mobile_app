import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Fundamentals = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Fundamentals</Text>
      <View style={styles.subContainer}>
        <Text style={styles.subtitle}>Tokenomics</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    marginLeft: 10,
    paddingVertical: 10,
    color: '#5F6466',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#5F6466',
    marginLeft: 20,
    paddingVertical: 5,
  },
  subContainer: {
    flexDirection: 'row',
    width: '80%',
    height: 300,
    padding: 20,
  },
});

export default Fundamentals;
