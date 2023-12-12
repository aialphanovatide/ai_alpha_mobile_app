import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CandlestickDetails = ({ chartData }) => {
  // Calculate 24-hour low, 24-hour high, and change
  const twentyFourHoursData = chartData.slice(-24); // Assuming the data is sorted by date
  const twentyFourHoursLow = Math.min(...twentyFourHoursData.map((data) => data.low));
  const twentyFourHoursHigh = Math.max(...twentyFourHoursData.map((data) => data.high));
  const change = chartData[chartData.length - 1].close - chartData[0].open;
  const changePercentage = ((change / chartData[0].open) * 100).toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>24h Low: {twentyFourHoursLow}</Text>
      <Text style={styles.label}>24h High: {twentyFourHoursHigh}</Text>
      <Text style={styles.label}>Change: {change} ({changePercentage}%)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginTop: 0,
  },
  label: {
    fontSize: 16,
    marginBottom: 0,
  },
});

export default CandlestickDetails;
