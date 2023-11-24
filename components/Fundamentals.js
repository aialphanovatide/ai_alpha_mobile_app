import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const Fundamentals = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 16, marginLeft: 10, paddingVertical: 10}}>
        Fundamentals
      </Text>
      <View style={styles.subContainer}>
        <Text style={{marginLeft: 20, paddingVertical: 5}}>Tokenomics</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#33333380',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subContainer: {
    flexDirection: 'row',
    width: '80%',
    height: 300,
    padding: 20,
  },
});

export default Fundamentals;
