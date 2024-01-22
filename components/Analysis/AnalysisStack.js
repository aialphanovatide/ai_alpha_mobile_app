import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Analysis from './Analysis';
import Calendar from './Calendar/Calendar';
import BtcDominance from './BtcDominance/BtcDominance';
import BitcoinFundingRates from './BTCFundingRates/BitcoinFundingRates';
import EthBtcChart from './EthBtcChart/EthBtcChart';
import Total3 from './Total3Chart/Total3';
import ChartSection from './ChartSection/ChartSection';
import FearAndGreed from './FearAndGreed/FearAndGreed';
import {AppThemeContext} from '../../context/themeContext';

const AnalysisStack = createNativeStackNavigator();

const AnalysisScreen = () => {
  const {theme} = useContext(AppThemeContext);
  return (
    <AnalysisStack.Navigator
      initialRouteName="AnalysisMain"
      screenOptions={{headerShown: 'false', header: () => null}}>
      <AnalysisStack.Screen name="AnalysisMain" component={Analysis} />
      <AnalysisStack.Screen name="Calendar" component={Calendar} />
      <AnalysisStack.Screen
        name="BTCFundingRates"
        component={BitcoinFundingRates}
      />
      <AnalysisStack.Screen
        name="BTCDominance"
        component={ChartSection}
        initialParams={{
          title: 'Bitcoin Dominance Chart',
          widgetId: 7,
          symbol: 'CRYPTOCAP:BTC.D',
        }}
      />
      <AnalysisStack.Screen
        name="EthBtc"
        component={ChartSection}
        initialParams={{
          title: 'ETH/BTC Chart',
          widgetId: 8,
          symbol: 'BINANCE:ETHBTC',
        }}
      />
      <AnalysisStack.Screen
        name="Total3"
        component={ChartSection}
        initialParams={{
          title: 'Total 3 Chart',
          widgetId: 6,
          symbol: 'CRYPTOCAP:TOTAL3',
        }}
      />
      <AnalysisStack.Screen
        name="DXYChart"
        component={ChartSection}
        initialParams={{
          title: 'DXY Chart',
          widgetId: 3,
          symbol: 'CAPITALCOM:DXY',
        }}
      />
      <AnalysisStack.Screen
        name="GoldChart"
        component={ChartSection}
        initialParams={{
          title: 'Gold Price Chart',
          widgetId: 4,
          symbol: 'CAPITALCOM:GOLD',
        }}
      />
      <AnalysisStack.Screen
        name="SP500"
        component={ChartSection}
        initialParams={{
          title: 'S&P 500 Chart',
          widgetId: 5,
          symbol: 'SPREADEX:SPX',
        }}
      />
      <AnalysisStack.Screen name="FearAndGreed" component={FearAndGreed} />
    </AnalysisStack.Navigator>
  );
};

export default AnalysisScreen;
