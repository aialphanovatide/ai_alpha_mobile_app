import React from 'react';
import {ScrollView} from 'react-native';
import useDimensions from './hooks/useDimensions';
import BottomMenu from './components/BottomMenu/Menu';
import Home from './components/Home/Home';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TickerTape from './components/Home/Tickertape/TickerTape';

const App = () => {
  const {height, width} = useDimensions();
  return (
    <GestureHandlerRootView style={{flex: 1, height, width}}>
      {/* <ScrollView style={{backgroundColor: '#DDE1E2'}}>
        <Home />
      </ScrollView> */}
      <BottomMenu />
    </GestureHandlerRootView>
  );
};

export default App;
