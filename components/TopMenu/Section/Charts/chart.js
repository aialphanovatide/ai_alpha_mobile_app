import React, { useState, useEffect } from 'react';
import { View, ImageBackground, TouchableOpacity, Text } from 'react-native';
import moment from 'moment';
import styles from './chartstyles';
import {
  VictoryChart,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryCandlestick,
  VictoryTheme,
  VictoryLabel,
  VictoryTooltip,
  VictoryLine
} from 'victory-native';
import CandlestickDetails from './candleDetails';
import SupportResistanceLines from './s&r';

const CandlestickChart = ({ symbol, interval }) => {


  const [priceColor, setPriceColor] = useState('black');
  const [selectedInterval, setSelectedInterval] = useState(interval);
  const [lastPrice, setLastPrice] = useState(undefined);
  const [chartData, setChartData] = useState([]);
  const [dates, setDates] = useState([]);

  async function fetchChartData() {
    try {
      const response = await fetch(
        `https://api3.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&limit=200&interval=${selectedInterval.toLowerCase()}`
      );
      const data = await response.json();

      setLastPrice(parseFloat(data[data.length -1][4]))
      const formattedChartData = data.map((item) => ({
        date: moment(item[0]),
        open: parseFloat(item[1]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
        close: parseFloat(item[4]),
      }));

      setChartData(formattedChartData);

      // Extract dates from chart data
      const dateValues = formattedChartData.map((item) => item.date);
      setDates(dateValues);

    } catch (error) {
      console.error(`Failed to fetch data: ${error}`);
    }
  }

  
  useEffect(() => {
    const intervalId = setInterval(fetchChartData, 4000);
    return () => clearInterval(intervalId);
  }, [interval]);

  const changeInterval = async (newInterval) => {
    setSelectedInterval(newInterval);
    try {
      chartData.length = 0;
      await fetchChartData();
      
    } catch (error) {
      console.error(`Failed to change interval: ${error}`);
    }
  };
  // console.log(chartData.map(item => moment.unix(item.date).format('MMM DD')));
  const resistanceLevels = [40520, 40800, 41100, 41400]
  const supportLevels = [42900, 43200,43500, 43800]

  return (

    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={selectedInterval === '30m' ? styles.activeButton : styles.button}
          onPress={() => changeInterval('30m')}
        >
          <Text style={selectedInterval === '30m' ? styles.activeButtonText : styles.buttonText}>30m</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={selectedInterval === '1h' ? styles.activeButton : styles.button}
          onPress={() => changeInterval('1h')}
        >
          <Text style={selectedInterval === '1h' ? styles.activeButtonText : styles.buttonText}>1h</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={selectedInterval === '4h' ? styles.activeButton : styles.button}
          onPress={() => changeInterval('4h')}
        >
          <Text style={selectedInterval === '4h' ? styles.activeButtonText : styles.buttonText}>4h</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={selectedInterval === '1W' ? styles.activeButton : styles.button}
          onPress={() => changeInterval('1W')}
        >
          <Text style={selectedInterval === '1W' ? styles.activeButtonText : styles.buttonText}>1W</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Last Price: {lastPrice}</Text>
      </View>
      {chartData.length == 0 ? <View style={styles.loadingContainer}><Text style={styles.loading}>Loading...</Text></View> :
        <View style={styles.chart}>
          <ImageBackground source={require('../../../../assets/logo_1.png')} style={styles.background}>
            <VictoryChart
              scale={{ x: 'time', y: 'log' }}
              height={400}
              width={420}
              domainPadding={{x:60, y: 3}}
              containerComponent={<VictoryZoomContainer />}
              theme={VictoryTheme.material}
            >
   
              {/* Y */}
              <VictoryAxis
                label={'USD'}
                tickCount={6}
                dependentAxis
                axisLabelComponent={<VictoryLabel dy={-30} dx={0} />}
                style={{ tickLabels: { fill: '#282828' } }}
              />

              {/* X */}
              <VictoryAxis
                tickCount={4}
                label={'Time'}
                tickFormat={(t) => moment.unix(t).format('MMM DD')} 
                axisLabelComponent={<VictoryLabel dy={25} />}
                style={{
                  tickLabels: {
                    padding: 5,
                    fontSize: 12, fill: '#282828'
                  }
                }} />

              {/* global */}
              <VictoryCandlestick
               domain={{
                x: [chartData.length - 20, chartData.length],
                 }}
                labels={({ datum, index }) => (index === chartData.length - 1 ? `${datum.close}` : '')}
                open="open"
                high="high"
                low="low"
                close="close"
                style={{
                  data: {
                    margin: 6,
                    padding: 10,
                    stroke: 'red',  
                    strokeWidth: 1,   
                  },
                  labels: {
                    fill: ({ datum }) => datum.close > datum.open
                        ? "green"
                          : "red"
                    }
                }}
                candleRatio={6}
                data={chartData}
                candleColors={{ positive: '#4caf50', negative: '#f44336' }}
              />
              
              { resistanceLevels && resistanceLevels?.map((level, index) => (
              <VictoryLine
              domain={{
                x: [chartData.length, chartData.length],
                }}
                labels={`Resistance ${index+1} - ${level}`}
                key={`resistance-${index}`}
                data={[{ x: 0, y: level }, { x: chartData.length, y: level }]}
                style={{ data: { stroke: 'red', strokeWidth: 1 } }}
                labelComponent={<VictoryLabel dy={0}/>}
              />
            ))}

              { supportLevels && supportLevels?.map((level, index) => (
              <VictoryLine
              domain={{
                x: [chartData.length, chartData.length],
                }}
                labels={`Support ${index+1} - ${level}`}
                key={`support-${index}`}
                labelComponent={<VictoryLabel dy={0}/>}
                data={[{ x: 0, y: level }, { x: chartData.length, y: level }]}
                style={{ data: { stroke: 'blue', strokeWidth: 1} }}
              />
            ))}

            </VictoryChart>
          </ImageBackground>
        </View>
      }

    </View>
  );
};

export default CandlestickChart;
