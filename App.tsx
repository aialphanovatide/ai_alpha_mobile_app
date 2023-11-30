import React from 'react';
import useDimensions from './hooks/useDimensions';
import BottomMenu from './components/BottomMenu/Menu';
import Home from './components/Home/Home';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TopMenu from './components/TopMenu/topmenu';

import Subscription from './components/Subscriptions/Subscription';
import { TopMenuContextProvider } from './context/topMenuContext';

const App = () => {
  const { height, width } = useDimensions();
  const isSuscribed = false;

  return isSuscribed ? (
    <GestureHandlerRootView style={{ flex: 1, height, width }}>
      <TopMenuContextProvider>
        <TopMenu />
        <Home />
        <BottomMenu />
      </TopMenuContextProvider>
    </GestureHandlerRootView>
  ) : (
    <Subscription />
  );
};

export default App;