import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import BackButton from '../BackButton/BackButton';
const Total3 = ({handleReturn}) => {
  return (
    <SafeAreaView>
      <BackButton handleReturn={handleReturn} />
      <Text>Total3</Text>
    </SafeAreaView>
  );
};

export default Total3;
