import React, { useState, useEffect } from 'react';
import { ScrollView, View} from 'react-native';
import moment from 'moment';
import TimeframeSelector from './chartTimeframes';
import CandlestickDetails from './candleDetails';
import { StyleSheet } from 'react-native';
import Chart from './chart';
import RsButton from './S&RButtons';
import Alerts from './alerts/alerts';
import AlertDetails from './alerts/alertDetails';

const CandlestickChart = ({ symbol, interval }) => {

  const [selectedInterval, setSelectedInterval] = useState(interval);
  const [lastPrice, setLastPrice] = useState(undefined);
  const [resistanceLevels, setResistanceLevels] = useState([43200, 43500,43800, 44100]); 
  const [supportLevels, setSupportLevels] = useState([40600, 41000,41500, 41800]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeButtons, setActiveButtons] = useState([]);


  const [activeAlertOption, setActiveAlertOption] = useState('Today');

  async function fetchChartData() {
    try {
      const response = await fetch(
        `https://api3.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&limit=200&interval=${selectedInterval.toLowerCase()}`
      );
      const data = await response.json();

      setLastPrice(parseFloat(data[data.length -1][4]))
      const formattedChartData = data.map((item) => ({
        x: moment(item[0]),
        open: parseFloat(item[1]),
        close: parseFloat(item[4]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
      }));

      setChartData(formattedChartData);
      setLoading(false); 

    } catch (error) {
      console.error(`Failed to fetch data: ${error}`);
      setLoading(false); 
    }
  }

  useEffect(() => {
    const intervalId = setInterval(fetchChartData, 2000);
    return () => clearInterval(intervalId);
  }, [interval, symbol]);

  const changeInterval = async (newInterval) => {
    setSelectedInterval(newInterval);
    setLoading(true);

    try {
      setChartData([])
      await fetchChartData();
      setLoading(false)
    } catch (error) {
      setLoading(false);
      console.error(`Failed to change interval: ${error}`);
    }
  };

  console.log()

  return (

    <ScrollView>
      <CandlestickDetails coin={symbol} lastPrice={lastPrice} />
      <TimeframeSelector  
        selectedInterval={selectedInterval}
        changeInterval={changeInterval}/>
      <RsButton activeButtons={activeButtons} setActiveButtons={setActiveButtons}/>
      <Chart 
      chartData={chartData} 
      supportLevels={supportLevels}
      loading={loading}
      activeButtons={activeButtons}
      resistanceLevels={resistanceLevels}/>

      <Alerts 
      activeAlertOption={activeAlertOption}
      setActiveButtons={setActiveAlertOption} />

      <AlertDetails activeAlertOption={activeAlertOption}/>

    </ScrollView>
  );
};

export default CandlestickChart;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // alignItems: 'center',
    // justifyContent: 'top',
  },
});
