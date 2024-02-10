import React, {useState, useEffect, useContext} from 'react';
import {ScrollView, View} from 'react-native';
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
import {altGetService, getService} from '../../../../../../services/aiAlphaApi';

const CandlestickChart = ({route}) => {
  const styles = useChartsStyles();
  const {interval, symbol, coinBot} =
    route.params.screen === 'Charts' ? route.params.params : route.params;

  const [selectedInterval, setSelectedInterval] = useState(interval);
  const [lastPrice, setLastPrice] = useState(undefined);
  const [resistanceLevels, setResistanceLevels] = useState([]);
  const [supportLevels, setSupportLevels] = useState([]);
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
    async function getSupportAndResistanceData(botName) {
      try {
        const supportValues = [];
        const resistanceValues = [];
        const data = await getService(
          `/api/coin-support-resistance/${botName}`,
        );
        if (data.success) {
          const values = data.chart_values;
          for (const key in values) {
            if (key.includes('support')) {
              supportValues.push(values[key]);
            } else {
              resistanceValues.push(values[key]);
            }
          }
        }
        return {
          support: supportValues,
          resistance: resistanceValues,
        };
      } catch (error) {
        console.error('Error fetching support and resistance data: ', error);
      }
    }

    getSupportAndResistanceData(coinBot)
      .then(response => {
        if (response) {
          setResistanceLevels(response.resistance);
          setSupportLevels(response.support);
        }
      })
      .catch(error => {
        console.error('Error fetching support and resistance data: ', error);
      });
  }, [activeButtons, coinBot]);

  useEffect(() => {
    const intervalId = setInterval(fetchChartData, 2000);
    return () => clearInterval(intervalId);
  }, [interval, symbol, selectedInterval]);

  // This useEffect handles the content regulation
  useEffect(() => {
    const hasCoinSubscription = findCategoryInIdentifiers(
      activeCoin.category_name,
      userInfo.entitlements,
    );
    setSubscribed(hasCoinSubscription);
  }, [activeCoin, userInfo]);

  const changeInterval = async newInterval => {
    setLoading(true);
    try {
      setSelectedInterval(newInterval);
      setChartData([]);
      await fetchChartData();
      setLoading(false);
    } catch (error) {
      console.error(`Failed to change interval: ${error}`);
    }
  };

  return subscribed ? (
    <ScrollView
      style={styles.scroll}
      // keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={true}>
      <CandlestickDetails
        coin={symbol}
        interval={selectedInterval}
        lastPrice={lastPrice}
        styles={styles}
      />
      <View style={styles.chartsWrapper}>
        <TimeframeSelector
          selectedInterval={selectedInterval}
          changeInterval={changeInterval}
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
      </View>

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
