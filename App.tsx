import React from 'react';
import {View, ScrollView} from 'react-native';
// import Header from './components/Header';
// import TradingViewChart from './components/Dashboard/TradingViewChart';
import useDimensions from './hooks/useDimensions';
// import TechnicalAnalysis from './components/Dashboard/TechnicalAnalysis';
// import TickerTape from './components/Dashboard/TickerTape';
import BottomMenu from './components/Menu';
import Home from './components/Home/Home';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import styles from './components/styles/styles';

const App = () => {
  const {height, width} = useDimensions();
  return (
    <GestureHandlerRootView style={{flex: 1, height, width}}>
      <ScrollView style={{backgroundColor: '#DDE1E2'}}>
        <View
        // style={{
        //   backgroundColor: '#222',
        //   flex: 1,
        // }}
        >
          <Home />
        </View>
        <BottomMenu />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default App;
