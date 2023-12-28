import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import styles from './RevenueModelStyles';
import CircleChart from '../CircleChart/CircleChart';

const RevenueSelectorItem = ({item, handleItemPress, activeOption}) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <Text
          style={[
            styles.itemButton,
            activeOption && activeOption.name !== item.name
              ? styles.inactive
              : {backgroundColor: item.color},
          ]}>
          {''}
        </Text>
      </TouchableOpacity>
      <Text
        style={[
          styles.itemName,
          activeOption && activeOption.name !== item.name
            ? styles.inactiveText
            : {color: item.color},
        ]}>
        {item.name}
      </Text>
    </View>
  );
};

const RevenueSelector = ({options, activeOption, handleItemPress}) => {
  return (
    <View style={styles.selectorContainer}>
      {options.map((item, index) => (
        <RevenueSelectorItem
          key={index}
          item={item}
          activeOption={activeOption}
          handleItemPress={handleItemPress}
        />
      ))}
    </View>
  );
};

const RevenueData = ({currentPercentages, total, currentColor}) => {
  return (
    <View style={styles.dataRow}>
      {currentPercentages.map((percentage, index) => (
        <View key={index} style={styles.dataContainer}>
          <Text style={[styles.text, styles.year]}>{percentage.year}</Text>
          <Text style={styles.text}>Total revenue</Text>
          <Text style={styles.text}>{total}</Text>
          <Text style={[styles.percentageValue, {color: currentColor}]}>
            {percentage.value}%
          </Text>
        </View>
      ))}
    </View>
  );
};

const RevenueModel = ({options}) => {
  const [activeOption, setActiveOption] = useState(null);

  const findCurrentPercentages = (options, activeOption) => {
    let currentPercentages = [];

    options.forEach(option => {
      if (option.name === activeOption.name) {
        currentPercentages = option.values.map(optionValue => {
          return {
            value: optionValue.percentage,
            year: optionValue.year,
          };
        });
      }
    });
    return currentPercentages;
  };

  const generateChartsData = options => {
    let chartQuantity = options[0].values.length;
    let chartsData = [];
    for (let i = 0; i < chartQuantity; i++) {
      let yearData = options.map(option => ({
        percentage:
          option.values[i].percentage === 0 ? 5 : option.values[i].percentage,
        color: option.color,
      }));
      chartsData.push(yearData);
    }
    let charts = [];
    for (let i = 0; i < chartQuantity; i++) {
      charts.push(
        <View key={`chart_${i}`} style={styles.chartContainer}>
          <CircleChart data={chartsData[i]} dividerSize={5} />
        </View>,
      );
    }

    return charts;
  };

  const handleItemPress = option => {
    setActiveOption(option);
  };

  return (
    <View style={styles.container}>
      <RevenueSelector
        options={options}
        handleItemPress={handleItemPress}
        activeOption={activeOption}
      />
      {activeOption && (
        <RevenueData
          currentPercentages={findCurrentPercentages(options, activeOption)}
          currentColor={activeOption.color}
        />
      )}
      <View style={styles.charts}>{generateChartsData(options)}</View>
    </View>
  );
};

export default RevenueModel;
