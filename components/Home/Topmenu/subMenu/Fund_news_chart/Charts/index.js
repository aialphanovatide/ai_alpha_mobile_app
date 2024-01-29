import React, {useState, useEffect, useContext} from 'react';
import {ScrollView} from 'react-native';
import moment from 'moment';
import TimeframeSelector from './chartTimeframes';
import CandlestickDetails from './candleDetails';
import Chart from './chart';
import RsButton from './S&RButtons';
import AlertMenu from './alerts/AlertMenu';
import AlertListComponent from './alerts/AlertListComponent';
import {TopMenuContext} from '../../../../../../context/topMenuContext';
import UpgradeOverlay from '../../../../../UpgradeOverlay/UpgradeOverlay';
import useChartsStyles from './ChartsStyles';
import {RevenueCatContext} from '../../../../../../context/RevenueCatContext';

const CandlestickChart = ({route}) => {
  const styles = useChartsStyles();
  const {interval, symbol, coinBot} =
    route.params.screen === 'Charts' ? route.params.params : route.params;

  const [selectedInterval, setSelectedInterval] = useState(interval);
  const [lastPrice, setLastPrice] = useState(undefined);
  const [resistanceLevels, setResistanceLevels] = useState([
    43200, 43500, 43800, 44100,
  ]);
  const [supportLevels, setSupportLevels] = useState([
    40600, 41000, 41500, 41800,
  ]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeButtons, setActiveButtons] = useState([]);
  const [subscribed, setSubscribed] = useState(false);
  const {activeCoin} = useContext(TopMenuContext);
  const {findCategoryInIdentifiers, userInfo} = useContext(RevenueCatContext);
  const [activeAlertOption, setActiveAlertOption] = useState('this week');
  async function fetchChartData() {
    try {
      const response = await fetch(
        `https://api3.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&limit=200&interval=${selectedInterval.toLowerCase()}`,
      );
      const data = await response.json();

      setLastPrice(parseFloat(data[data.length - 1][4]));
      const formattedChartData = data.map(item => ({
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

  // This useEffect handles the content regulation
  useEffect(() => {
    const hasCoinSubscription = findCategoryInIdentifiers(
      activeCoin.category_name,
      userInfo.entitlements,
    );
    setSubscribed(hasCoinSubscription);
  }, [activeCoin, userInfo]);

  const changeInterval = async newInterval => {
    setSelectedInterval(newInterval);
    setLoading(true);

    try {
      setChartData([]);
      await fetchChartData();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(`Failed to change interval: ${error}`);
    }
  };

  return subscribed ? (
    <ScrollView
      style={styles.scroll}
      // keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={true}>
      <CandlestickDetails coin={symbol} lastPrice={lastPrice} styles={styles} />
      <TimeframeSelector
        selectedInterval={selectedInterval}
        changeInterval={changeInterval}
        styles={styles}
      />
      <RsButton
        activeButtons={activeButtons}
        setActiveButtons={setActiveButtons}
      />
      <Chart
        chartData={chartData}
        supportLevels={supportLevels}
        loading={loading}
        activeButtons={activeButtons}
        resistanceLevels={resistanceLevels}
      />

      <AlertMenu
        activeAlertOption={activeAlertOption}
        setActiveButtons={setActiveAlertOption}
      />
      <AlertListComponent
        timeframe={activeAlertOption}
        botName={coinBot}
        styles={styles}
      />
    </ScrollView>
  ) : (
    <UpgradeOverlay isBlockingByCoin={true} screen={'Charts'} />
  );
};

export default CandlestickChart;
