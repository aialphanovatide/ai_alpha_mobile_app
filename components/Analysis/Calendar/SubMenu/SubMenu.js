import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import useCalendarSubMenuStyles from './SubMenuStyles';

// SubMenuItem component that renders the sub-menu item for the calendar screen. It displays the interval name that the user can select to view the events for the selected interval.

const SubMenuItem = ({selectedInterval, intervalData, handlePress, styles}) => {
  return (
    <TouchableOpacity
      style={[
        styles.menuItem,
        selectedInterval.textName === intervalData.textName && styles.activeItem,
      ]}
      onPress={() => handlePress(intervalData)}>
      <Text
        style={[
          styles.menuItemText,
          selectedInterval.textName === intervalData.textName && styles.activeText,
        ]}>
        {intervalData.textName}
      </Text>
    </TouchableOpacity>
  );
};

// SubMenu component that renders the sub-menu for the calendar screen. It displays the intervals "Today" and "This Week" that the user can select to view the events for the selected interval.

const SubMenu = ({Intervals, handlePress, selectedInterval}) => {
  const styles = useCalendarSubMenuStyles();
  return (
    <View style={styles.menuContainer}>
      <SubMenuItem
        intervalData={Intervals.today}
        selectedInterval={selectedInterval}
        handlePress={handlePress}
        styles={styles}
      />
      <SubMenuItem
        intervalData={Intervals.thisWeek}
        selectedInterval={selectedInterval}
        handlePress={handlePress}
        styles={styles}
      />
    </View>
  );
};

export default SubMenu;
