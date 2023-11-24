import React from 'react';
import {View, ScrollView} from 'react-native';
// import Header from './components/Header';
// import TradingViewChart from './components/Dashboard/TradingViewChart';
import useDimensions from './android/app/src/hooks/useDimensions';
// import TechnicalAnalysis from './components/Dashboard/TechnicalAnalysis';
// import TickerTape from './components/Dashboard/TickerTape';
import BottomMenu from './components/Menu';
import Home from './components/Sections/Home';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import styles from './components/styles/styles';

const App = () => {
  const {height, width} = useDimensions();
  return (
    <GestureHandlerRootView style={{flex: 1, height, width}}>
      <ScrollView style={{backgroundColor: '#171717'}}>
        <View
          style={{
            backgroundColor: '#222',
            flex: 1,
          }}>
          <Home />
          {/* <View style={{backgroundColor: '#171717'}}>
          <View
            style={{
              backgroundColor: '#171717',
              width: 600,
              height: 60,
              marginTop: 2,
            }}>
            <TickerTape />
          </View>
          <View
            style={{
              marginRight: 'auto',
              marginLeft: 'auto',
              width: 300,
              height: 200,
              display: 'flex',
              flexDirection: 'column',
            }}>
            <TechnicalAnalysis
              widgetId={1}
              currentSymbol={'BINANCE:BTCUSDT'}
              width={1000}
              height={500}
            />
          </View>
          <View
            style={{
              width: 400,
              height: 300,
              display: 'flex',
              flexDirection: 'column',
            }}>
            <TradingViewChart
              widgetId={1}
              width={'90%'}
              height={'400'}
              symbol={'BINANCE:BTCUSDT'}
            />
            <TradingViewChart
              widgetId={2}
              width={'90%'}
              height={'400'}
              symbol={'BINANCE:ETHUSDT'}
            />
          </View>
        </View> */}
        </View>
        <BottomMenu />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default App;
