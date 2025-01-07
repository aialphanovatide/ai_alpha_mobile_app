import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import useNewTopStoriesStyles from '../TopStories/NewTopStoriesStyles';

// Component to render the filter buttons for the Alt Coins Top Stories section. It receives the filters, the active filter, and the function to handle the filter press as props. It maps the filters to render the buttons and applies the active style to the selected filter.

const AltCoinsFilter = ({filters, activeFilter, handleFilterPress}) => {
  const styles = useNewTopStoriesStyles();
  return (
    <View style={styles.filterContainer}>
      {filters.map((filter, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.filterButton,
            filter === activeFilter ? styles.activeFilterButton : {},
          ]}
          onPress={() => handleFilterPress(filter)}>
          <Text
            style={[
              styles.filterText,
              filter === activeFilter ? styles.activeFilterFont : {},
            ]}>
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default AltCoinsFilter;
