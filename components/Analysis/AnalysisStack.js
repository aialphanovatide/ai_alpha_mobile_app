import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Analysis from './Analysis';
import Calendar from './Calendar/Calendar';
import EthBtcChart from './EthBtcChart/EthBtcChart';
import ChartSection from './ChartSection/ChartSection';
import FearAndGreed from './FearAndGreed/FearAndGreed';
import BtcDominanceChart from './BtcDominance/BtcDominance';
import Total3Chart from './Total3Chart/Total3Chart';
import History from './HistorySection/History';
import NarrativeTrading from './NarrativeTrading/NarrativeTrading';
import FundingRates from './FundingRates/FundingRates';
import VixChart from './VixIndexChart/VixChart';
import UsOilChart from './UsOilChart/UsOilChart';

const AnalysisStack = createNativeStackNavigator();

const AnalysisScreen = () => {
  return (
    <AnalysisStack.Navigator
      initialRouteName="AnalysisMain"
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: 'false',
        header: () => null,
      }}>
      <AnalysisStack.Screen name="AnalysisMain" component={Analysis} />
      <AnalysisStack.Screen name="History" component={History} />
      <AnalysisStack.Screen
        name="NarrativeTrading"
        component={NarrativeTrading}
      />
      <AnalysisStack.Screen name="Calendar" component={Calendar} />
      <AnalysisStack.Screen name="FundingRates" component={FundingRates} />
      <AnalysisStack.Screen name="BTCDominance" component={BtcDominanceChart} />
      <AnalysisStack.Screen name="EthBtc" component={EthBtcChart} />
      <AnalysisStack.Screen name="Total3" component={Total3Chart} />
      <AnalysisStack.Screen
        name="DXYChart"
        component={ChartSection}
        initialParams={{
          title: 'DXY Chart',
          symbol: 'DXY',
          description:
            'This provides the US dollar index, a crucial indicator for understanding the strength of the dollar relative to a basket of foreign currencies. When the DXY goes higher, risk on assets like cryptocurrencies often will drop in price.',
        }}
      />
      <AnalysisStack.Screen
        name="GoldChart"
        component={ChartSection}
        initialParams={{
          title: 'Gold Price Chart',
          symbol: 'GOLD',
          description:
            'It shows the current price of gold, which is a key asset to compare with Bitcoin, especially in terms of it being a safe haven asset class.',
        }}
      />
      <AnalysisStack.Screen
        name="SP500"
        component={ChartSection}
        initialParams={{
          title: 'S&P 500 Chart',
          symbol: 'US500',
          description:
            'Provides the performance of the S&P 500 index, reflecting the health of the US stock market. It is an important analysis for understanding the correlation or divergence between the equity and cryptocurrency markets.',
        }}
      />
      <AnalysisStack.Screen
        name="USOIL"
        component={UsOilChart}
        initialParams={{
          title: 'U.S. Oil Chart',
          symbol: 'USO',
          description:
            'When the price of oil is higher, inflation is likely to be higher, which in turn means the US economy is likely to be weaker medium term and therefore crypto prices will come down.',
        }}
      />
      <AnalysisStack.Screen name="VIX" component={VixChart} />
      <AnalysisStack.Screen name="FearAndGreed" component={FearAndGreed} />
    </AnalysisStack.Navigator>
  );
};

export default AnalysisScreen;
