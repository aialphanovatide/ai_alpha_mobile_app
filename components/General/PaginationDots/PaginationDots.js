import React from 'react';
import {View} from 'react-native';
import {usePaginationDotsStyles} from './usePaginationDotsStyles';

export const PaginationDots = ({totalPages, currentPage}) => {
  const styles = usePaginationDotsStyles();
  return (
    <View style={styles.dotsContainer}>
      {Array.from({length: totalPages}).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index + 1 === currentPage ? styles.activeDot : {},
          ]}
        />
      ))}
    </View>
  );
};
