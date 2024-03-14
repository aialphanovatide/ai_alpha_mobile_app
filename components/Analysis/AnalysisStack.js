import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Analysis from './Analysis';
import Calendar from './Calendar/Calendar';
import BitcoinFundingRates from './BTCFundingRates/BitcoinFundingRates';
import EthBtcChart from './EthBtcChart/EthBtcChart';
import Total3 from './Total3Chart/Total3';
import ChartSection from './ChartSection/ChartSection';
import FearAndGreed from './FearAndGreed/FearAndGreed';
import BtcDominanceChart from './BtcDominance/BtcDominance';

const AnalysisStack = createNativeStackNavigator();

const AnalysisScreen = () => {
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
      <AnalysisStack.Screen name="BTCDominance" component={BtcDominanceChart} />
      <AnalysisStack.Screen name="EthBtc" component={EthBtcChart} />
      <AnalysisStack.Screen
        name="Total3"
        component={ChartSection}
        initialParams={{
          title: 'Total 3 Chart',
          widgetId: 6,
          symbol: 'CRYPTOCAP:TOTAL3',
          description:
            'This chart aggregates the market value of all cryptocurrencies excluding Bitcoin and Ethereum. It provides an overview of the health and trends of the altcoin market and is essential for diversified investment strategies.',
        }}
      />
      <AnalysisStack.Screen
        name="DXYChart"
        component={ChartSection}
        initialParams={{
          title: 'DXY Chart',
          widgetId: 3,
          symbol: 'CAPITALCOM:DXY',
          description:
            'This provides the US dollar index, a crucial indicator for understanding the strength of the dollar relative to a basket of foreign currencies. When the DXY goes higher, risk on assets like cryptocurrencies often will drop in price.',
        }}
      />
      <AnalysisStack.Screen
        name="GoldChart"
        component={ChartSection}
        initialParams={{
          title: 'Gold Price Chart',
          widgetId: 4,
          symbol: 'CAPITALCOM:GOLD',
          description:
            'It shows the current price of gold, which is a key asset to compare with Bitcoin, especially in terms of it being a safe haven asset class.',
        }}
      />
      <AnalysisStack.Screen
        name="SP500"
        component={ChartSection}
        initialParams={{
          title: 'S&P 500 Chart',
          widgetId: 5,
          symbol: 'SPREADEX:SPX',
          description:
            'Provides the performance of the S&P 500 index, reflecting the health of the US stock market. It is an important analysis for understanding the correlation or divergence between the equity and cryptocurrency markets.',
        }}
      />
      <AnalysisStack.Screen name="FearAndGreed" component={FearAndGreed} />
    </AnalysisStack.Navigator>
  );
};

export default AnalysisScreen;
