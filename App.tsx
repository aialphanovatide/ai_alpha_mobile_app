import React from 'react';
import useDimensions from './hooks/useDimensions';
import BottomMenu from './components/BottomMenu/Menu';
import Home from './components/Home/Home';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TopMenu from './components/TopMenu/topmenu';
import { TopMenuContextProvider } from './context/topMenuContext';
import Subscription from './components/Subscriptions/Subscription';

const App = () => {
  const { height, width } = useDimensions();

  return (
    <GestureHandlerRootView style={{ flex: 1, height, width }}>
    <TopMenuContextProvider>
      <TopMenu />
      <Home />
      <BottomMenu />
    </TopMenuContextProvider>
  </GestureHandlerRootView>
  )

  // return isSuscribed ? (
  //   <GestureHandlerRootView style={{ flex: 1, height, width }}>
  //     <TopMenuContextProvider>
  //       <TopMenu />
  //       <Home />
  //       <BottomMenu />
  //     </TopMenuContextProvider>
  //   </GestureHandlerRootView>
  // ) : (
  //   <Subscription />
  // );
};

export default App;