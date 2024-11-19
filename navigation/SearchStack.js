import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Search from './Search';

const SearchStack = createNativeStackNavigator();

const SearchScreen = () => {
  return (
    <SearchStack.Navigator
      initialRouteName="SearchMain"
      backBehavior={'none'}
      screenOptions={{
        lazy: true,
        swipeEnabled: false,
        header: () => null,
      }}>
      <SearchStack.Screen name={'SearchMain'} component={Search} />
    </SearchStack.Navigator>
  );
};

export default SearchScreen;
