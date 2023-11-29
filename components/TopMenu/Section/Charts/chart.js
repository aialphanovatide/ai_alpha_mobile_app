import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { CandleStickChart } from 'react-native-charts-wrapper';
import moment from 'moment';
import styles from './chartstyles';

const CryptoChart = ({ symbol, interval, resistances, supports }) => {
  const [chartData, setChartData] = useState([]);
  console.log(chartData)

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          `https://api3.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&limit=50&interval=${interval.toLowerCase()}`
        );
        const data = await response.json();
        setChartData(
          data.map((item) => ({
            date: moment(item[0]).valueOf(),
            open: parseFloat(item[1]),
            high: parseFloat(item[2]),
            low: parseFloat(item[3]),
            close: parseFloat(item[4]),
          }))
        );
      } catch (error) {
        console.error(`Failed to fetch data: ${error}`);
      }
    };

    const intervalId = setInterval(fetchChartData, 5000); // Fetch data every 5 seconds
    fetchChartData();

    return () => clearInterval(intervalId);
  }, [symbol, interval]);

  return (
    <View style={{ flex: 1 }}>
    <Text>Charts</Text>
    <CandleStickChart
      style={{ height: 300, width: 380 }}
      data={{
        dataSets: [
          {
            values: chartData.map((item) => ({
              date: item.date,
              shadowH: item.high,
              shadowL: item.low,
              open: item.open,
              close: item.close,
            })),
            label: 'Candlestick',
            config: {
            //   lineWidth: 5,
            // //   shadowColor: '#71B37C',
            //   shadowWidth: 1,
            //   shadowColorSameAsCandle: true,
            // //   increasingColor: '#71B37C',
            // //   decreasingColor: '#D14B5A',
              drawValues: true,
            },
          },
        ],
      }}
      xAxis={{
        valueFormatter: chartData.map((item) => moment(item.date).format('YYYY-MM-DD')),
        position: 'BOTTOM',
        granularityEnabled: true,
        granularity: 1,
      }}
      yAxis={{ left: { enabled: true } }}
      legend={{ enabled: true }}
    />
  </View>
  );
};

export default CryptoChart;




      {/* <View>
        {resistances.map((resistance, index) => (
          <Text key={`resistance-${index}`} style={{ color: 'red' }}>{`Resistance ${index + 1} - $${resistance}`}</Text>
        ))}
        {supports.map((support, index) => (
          <Text key={`support-${index}`} style={{ color: 'blue' }}>{`Support ${index + 1} - $${support}`}</Text>
        ))}
      </View> */}
