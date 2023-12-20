import {Text, View} from 'react-native';
import React, {useState} from 'react';
import styles from './RevenueModelStyles';

const RevenueSelectorItem = ({item}) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={[styles.itemButton, {backgroundColor: item.color}]}>
        {''}
      </Text>
      <Text style={styles.itemName}>{item.name}</Text>
    </View>
  );
};

const RevenueSelector = ({options, activeOption}) => {
  return (
    <View style={styles.selectorContainer}>
      {options.map((item, index) => (
        <RevenueSelectorItem key={index} item={item} />
      ))}
    </View>
  );
};

const RevenueModel = ({options}) => {
  const [activeOption, setActiveOption] = useState(null);
  return (
    <View>
      <RevenueSelector options={options} />
    </View>
  );
};

export default RevenueModel;
