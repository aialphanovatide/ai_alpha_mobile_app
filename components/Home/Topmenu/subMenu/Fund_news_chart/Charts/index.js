import React, {useState, useEffect, useContext, useMemo} from 'react';
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
import {AboutModalContext} from '../../../../../../context/AboutModalContext';
import AboutModal from '../Fundamentals/AboutModal';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../../../../../context/themeContext';
import {COINGECKO_PRO_KEY} from '../../../../../../src/constants';

const CandlestickChart = ({route}) => {
  const styles = useChartsStyles();
  const {interval, symbol, coinBot} =
    route.params.screen === 'Charts' ? route.params.params : route.params;
  const [isPriceUp, setIsPriceUp] = useState(null);
  const [selectedInterval, setSelectedInterval] = useState(interval);
  const [lastPrice, setLastPrice] = useState(undefined);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeButtons, setActiveButtons] = useState([]);
  const [subscribed, setSubscribed] = useState(false);
  const {activeCoin} = useContext(TopMenuContext);
  const {findCategoryInIdentifiers, userInfo} = useContext(RevenueCatContext);
  const [activeAlertOption, setActiveAlertOption] = useState('this week');
  const {aboutDescription, aboutVisible, handleAboutPress} =
    useContext(AboutModalContext);
  const {isDarkMode} = useContext(AppThemeContext);
  const pairings = coinBot !== 'btc' ? ['USDT', 'BTC'] : ['USDT'];
  const [selectedPairing, setSelectedPairing] = useState(pairings[0]);

  // Restart the last price on every coin update

  useEffect(() => {
    setLoading(true);
    setSelectedPairing(pairings[0]);
    setLastPrice(undefined);
    setSelectedInterval('1D');
  }, [activeCoin, coinBot]);

  // This temporaly handles the kas and velo missing data for binance api

  const url_days =
    selectedInterval === '1W'
      ? 180
      : selectedInterval === '1D'
      ? 30
      : selectedInterval === '4H'
      ? 7
      : 1;
  const fetch_url =
    coinBot.toLowerCase() !== 'kas' && coinBot.toLowerCase() !== 'velo'
      ? `https://api3.binance.com/api/v3/klines?symbol=${coinBot.toUpperCase()}${selectedPairing}&limit=50&interval=${selectedInterval.toLowerCase()}`
      : `https://pro-api.coingecko.com/api/v3/coins/${
          coinBot.toLowerCase() === 'kas' ? 'kaspa' : 'velo'
        }/ohlc?vs_currency=${
          selectedPairing === 'USDT' ? 'usd' : selectedPairing.toLowerCase()
        }&days=${url_days}&precision=${selectedPairing === 'BTC' ? 14 : 4}`;
  const options = {
    method: 'GET',
    headers: {'x-cg-pro-api-key': COINGECKO_PRO_KEY},
  };

  // Function to fetch the data from Binance and from Coingecko for KAS and VELO, since that coins doesn't have data on the first one, and map it for using it with VictoryChart's components

  async function fetchChartData() {
    try {
      const response = await fetch(
        fetch_url,
        coinBot.toLowerCase() === 'kas' || coinBot.toLowerCase() === 'velo'
          ? options
          : {},
      );
      const data = await response.json();
      const currentPrice = parseFloat(data[data.length - 1][4]);
      data[data.length - 1][4] >= data[data.length - 2][4]
        ? setIsPriceUp(true)
        : setIsPriceUp(false);
      setLastPrice(currentPrice);
      const formattedChartData = data.map(item => ({
        x: moment(item[0]),
        open: parseFloat(item[1]),
        close: parseFloat(item[4]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
      }));
      setChartData(formattedChartData);
    } catch (error) {
      console.error(`Failed to fetch data: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  // UseEffects that updates the charts data every 3.5s, before it was every 1s but for performance reasons it was increased

  useEffect(() => {
    const intervalId = setInterval(() => fetchChartData(), 3500);
    return () => clearInterval(intervalId);
  }, [interval, coinBot, selectedInterval, selectedPairing]);

  // This useEffect handles the content regulation with the subscriptions from the user
  useEffect(() => {
    const hasCoinSubscription = findCategoryInIdentifiers(
      activeCoin.category_name,
      userInfo.entitlements,
    );
    setSubscribed(hasCoinSubscription);
  }, [activeCoin, userInfo]);

  // Function to handle the time interval changes, executing again the data fetching

  const changeInterval = async newInterval => {
    setLoading(true);
    try {
      setSelectedInterval(newInterval);
      setChartData([]);
    } catch (error) {
      console.error(`Failed to change interval: ${error}`);
    }
  };

  // Function to handle the currency-pair for the coins that haves USDT and BTC pairings
  const handlePairingChange = pairing => {
    setLoading(true);
    setSelectedPairing(pairing);
  };

  return subscribed ? (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
      style={styles.flex}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={true}>
        {aboutVisible && (
          <AboutModal
            description={aboutDescription}
            onClose={handleAboutPress}
            visible={aboutVisible}
          />
        )}
        <CandlestickDetails
          loading={loading}
          coin={coinBot}
          interval={selectedInterval}
          lastPrice={lastPrice}
          styles={styles}
          isPriceUp={isPriceUp}
          selectedPairing={selectedPairing}
          pairings={pairings}
          handlePairingChange={handlePairingChange}
        />
        <View style={styles.chartsWrapper}>
       
          <View style={styles.chartsRow}>
            <RsButton
              activeButtons={activeButtons}
              setActiveButtons={setActiveButtons}
            />
            <TimeframeSelector
              selectedInterval={selectedInterval}
              changeInterval={changeInterval}
              hasHourlyTimes={coinBot.toLowerCase() === 'btc'}
            />
          </View>
          <Chart
            symbol={symbol}
            selectedInterval={selectedInterval}
            chartData={chartData}
            loading={loading}
            activeButtons={activeButtons}
            coinBot={coinBot}
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
    </LinearGradient>
  ) : (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
      style={{flex: 1}}>
      <UpgradeOverlay isBlockingByCoin={true} screen={'Charts'} />
    </LinearGradient>
  );
};

export default CandlestickChart;
