import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Calendar from '../components/Analysis/Calendar/Calendar';
import ChartSection from '../components/Analysis/ChartSection/ChartSection';
import FearAndGreed from '../components/Analysis/FearAndGreed/FearAndGreed';
import BinanceChart from '../components/Analysis/BinanceChart/BinanceChart';
import History from '../components/Analysis/HistorySection/History';
import NarrativeTrading from '../components/Analysis/NarrativeTrading/NarrativeTrading';
import FundingRates from '../components/Analysis/FundingRates/FundingRates';
import Total3CandleChart from '../components/Analysis/Total3Chart/Total3CandleChart.js';
import Dashboard from '../components/Analysis/Dashboard.js';
import DashboardChartsWidget from '../components/Analysis/ChartSection/DashboardChartsWidget';

const DashboardStack = createNativeStackNavigator();

// This is the main stack for the dashboard screen, which contains all the sections that the user can navigate to.

const DashboardScreen = () => {
  return (
    <DashboardStack.Navigator
      initialRouteName="DashboardMain"
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: 'false',
        header: () => null,
      }}>
      <DashboardStack.Screen name="DashboardMain" component={Dashboard} />
      <DashboardStack.Screen name="History" component={History} />
      <DashboardStack.Screen
        name="NarrativeTrading"
        component={NarrativeTrading}
      />
      <DashboardStack.Screen name="Calendar" component={Calendar} />
      <DashboardStack.Screen name="FundingRates" component={FundingRates} />
      <DashboardStack.Screen
        name="BTCDominance"
        component={BinanceChart}
        initialParams={{
          title: 'BTC Dominance Chart',
          symbol: 'BTCDOMUSDT',
          description:
            "Reflects the proportion of the total cryptocurrency market held by Bitcoin. It is a vital indicator for assessing the market's preference for BTC over other altcoins.",
        }}
      />
      <DashboardStack.Screen
        name="EthBtc"
        component={DashboardChartsWidget}
        initialParams={{
          title: 'ETH/BTC Chart',
          symbol: 'ETHBTC',
          description:
            'The strength of ETH against BTC helps us understand how strong Ethereum and its ecosystem projects are while also telling us how strong the entire altcoin market is too.',
        }}
      />
      <DashboardStack.Screen name="Total3" component={Total3CandleChart} />
      <DashboardStack.Screen
        name="DXYChart"
        component={ChartSection}
        initialParams={{
          title: 'DXY Chart',
          symbol: 'DXY',
          description:
            'This provides the US dollar index, a crucial indicator for understanding the strength of the dollar relative to a basket of foreign currencies. When the DXY goes higher, risk on assets like cryptocurrencies often will drop in price.',
        }}
      />
      <DashboardStack.Screen
        name="GoldChart"
        component={ChartSection}
        initialParams={{
          title: 'Gold Price Chart',
          symbol: 'GOLD',
          description:
            'It shows the current price of gold, which is a key asset to compare with Bitcoin, especially in terms of it being a safe haven asset class.',
        }}
      />
      <DashboardStack.Screen
        name="SP500"
        component={ChartSection}
        initialParams={{
          title: 'S&P 500 Chart',
          symbol: 'US500',
          description:
            'Provides the performance of the S&P 500 index, reflecting the health of the US stock market. It is an important analysis for understanding the correlation or divergence between the equity and cryptocurrency markets.',
        }}
      />
      <DashboardStack.Screen
        name="USOIL"
        component={ChartSection}
        initialParams={{
          title: 'U.S. Oil Chart',
          symbol: 'USO',
          description:
            'When the price of oil is higher, inflation is likely to be higher, which in turn means the US economy is likely to be weaker medium term and therefore crypto prices will come down.',
        }}
      />
      <DashboardStack.Screen
        name="VIX"
        component={ChartSection}
        initialParams={{
          title: 'VIX Index Chart',
          symbol: 'VIX',
          description:
            'This Index measures the volatility in the markets - it spikes up when sudden shocks happen and stays low when things are much calmer.',
        }}
      />
      <DashboardStack.Screen name="FearAndGreed" component={FearAndGreed} />
    </DashboardStack.Navigator>
  );
};

export default DashboardScreen;
