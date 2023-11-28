import React from 'react';
import useDimensions from './hooks/useDimensions';
import BottomMenu from './components/BottomMenu/Menu';
import Home from './components/Home/Home';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  const {height, width} = useDimensions();
  return (
    <GestureHandlerRootView style={{flex: 1, height, width}}>
      <Home />
      <BottomMenu />
    </GestureHandlerRootView>
  );
};

export default App;
