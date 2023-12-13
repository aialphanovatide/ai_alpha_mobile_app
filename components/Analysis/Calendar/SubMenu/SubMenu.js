import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './SubMenuStyles';

const SubMenuItem = ({selectedInterval, intervalData, handlePress}) => {
  return (
    <TouchableOpacity
      style={[
        styles.menuItem,
        selectedInterval == intervalData && styles.activeItem,
      ]}
      onPress={() => handlePress(intervalData)}>
      <Text
        style={[
          styles.menuItemText,
          selectedInterval == intervalData && styles.activeText,
        ]}>
        {intervalData.textName}
      </Text>
    </TouchableOpacity>
  );
};

const SubMenu = ({Intervals, handlePress, selectedInterval}) => {
  return (
    <View style={styles.menuContainer}>
      <SubMenuItem
        intervalData={Intervals.today}
        selectedInterval={selectedInterval}
        handlePress={handlePress}
      />
      <SubMenuItem
        intervalData={Intervals.thisWeek}
        selectedInterval={selectedInterval}
        handlePress={handlePress}
      />
    </View>
  );
};

export default SubMenu;
