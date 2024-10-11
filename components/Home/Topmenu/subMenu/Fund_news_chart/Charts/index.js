import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import moment from 'moment';
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
import {useScrollToTop} from '@react-navigation/native';
import {useScreenOrientation} from '../../../../../../hooks/useScreenOrientation';
import {useNavigation} from '@react-navigation/core';
import useChartsSource from '../../../../../../hooks/useChartsSource';
import {getService} from '../../../../../../services/aiAlphaApi';
import {io} from 'socket.io-client';
import SkeletonLoader from '../../../../../Loader/SkeletonLoader';
import CWChart from './NewCharts/CWChart';

const IntervalSelector = ({
  selectedPairing,
  selectedInterval,
  changeInterval,
  disabled,
}) => {
  const styles = useChartsStyles();
  const timeframes =
    selectedPairing.toLowerCase() === 'btc' ||
    selectedPairing.toLowerCase() === 'eth'
      ? ['1d']
      : ['1d', '1w'];
  return (
    <View style={styles.timeFrameContainer}>
      {timeframes.map(interval => (
        <TouchableOpacity
          disabled={disabled}
          key={interval}
          style={[
            styles.timeFrameButton,
            selectedInterval === interval ? styles.activeTimeFrame : {},
            {width: `${100 / timeframes.length}%`},
          ]}
          onPress={() => changeInterval(interval)}>
          <Text
            style={[
              styles.timeFrameButtonText,
              selectedInterval === interval ? styles.activeText : {},
            ]}>
            {interval}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const CandlestickChart = ({route}) => {
  const styles = useChartsStyles();
  const timeframeOptions = ['1H', '4H', '1D', '1W'];
  const {interval, symbol, coinBot} =
    route.params.screen === 'Charts' ? route.params.params : route.params;
  const [isPriceUp, setIsPriceUp] = useState(null);
  const [selectedInterval, setSelectedInterval] = useState('1w');
  const [lastPrice, setLastPrice] = useState(undefined);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeButtons, setActiveButtons] = useState([]);
  const {activeCoin} = useContext(TopMenuContext);
  const {findCategoryInIdentifiers, subscribed, userInfo} =
    useContext(RevenueCatContext);
  const [activeAlertOption, setActiveAlertOption] = useState('4H');
  const {aboutDescription, aboutVisible, handleAboutPress} =
    useContext(AboutModalContext);
  const {isDarkMode} = useContext(AppThemeContext);
  const pairings = useChartsSource(
    coinBot.toLowerCase(),
    null,
    selectedInterval,
  ).pairings;
  const [selectedPairing, setSelectedPairing] = useState(pairings[0]);
  const navigation = useNavigation();
  const {isLandscape, isHorizontal, handleScreenOrientationChange} =
    useScreenOrientation();
  const [supportResistanceLoading, setSupportResistanceLoading] =
    useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      if (isLandscape || isHorizontal) {
        handleScreenOrientationChange('PORTRAIT');
      }
    });
  }, [isLandscape, isHorizontal, navigation]);

  // This ref object allows to scroll to top on every tab press

  const ref = useRef(null);

  useScrollToTop(ref);

  // Restart the last price on every coin update

  useEffect(() => {
    setActiveButtons(['Support', 'Resistance']);
    setLoading(true);
    setLastPrice(undefined);
    setSelectedPairing(pairings[0]);
    setSelectedInterval('1w');
    fetchChartDataFromServer(pairings[0], '1w');
  }, [activeCoin, coinBot]);

  const {url, options} = useChartsSource(
    coinBot,
    selectedPairing,
    selectedInterval,
  );

  // Function to fetch the data from Binance and from Coingecko for KAS and VELO, since that coins doesn't have data on the first one, and map it for using it with VictoryChart's components

  // [OLD FUNCTION]
  async function fetchChartData() {
    try {
      const response = await fetch(url, options);
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

  async function fetchChartDataFromServer(pairing, interval) {
    setChartData([]);
    try {
      const data = await getService(
        `api/chart/ohlc?coin=${
          coinBot.toLowerCase() === 'pol' ? 'polygon' : coinBot.toLowerCase()
        }&vs_currency=${
          pairing === 'USDT' ? 'usd' : pairing.toLowerCase()
        }&interval=${interval.toLowerCase()}&precision=8`,
      );
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

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     fetchChartDataFromServer();
  //   }, 3500);
  //   return () => clearInterval(intervalId);
  // }, [coinBot, selectedInterval, selectedPairing]);

  // [TEMPORARY] Function to manually update the data of the chart

  const handleDataUpdate = (pairing, currentInterval) => {
    setLoading(true);
    setChartData([]);
    fetchChartDataFromServer(pairing, currentInterval);
  };

  // Function to handle the time interval changes, executing again the data fetching

  const changeInterval = async newInterval => {
    setLoading(true);
    try {
      setSelectedInterval(newInterval);
      setChartData([]);
      fetchChartDataFromServer(selectedPairing, newInterval);
    } catch (error) {
      console.error(`Failed to change interval: ${error}`);
    }
  };

  // Function to handle the currency-pair for the coins that haves USDT and BTC pairings
  const handlePairingChange = async (pairing, currentInterval) => {
    setLoading(true);
    try {
      setSelectedPairing(pairing);
      if (pairing.toLowerCase() === 'btc' || pairing.toLowerCase() === 'eth') {
        setSelectedInterval('1d');
        setChartData([]);
        fetchChartDataFromServer(pairing, '1d');
      } else {
        setChartData([]);
        fetchChartDataFromServer(pairing, currentInterval);
      }
    } catch (error) {
      console.error(`Failed to change pairing: ${error}`);
    }
  };

  // Function to handle enabling and disabling the scroll on the whole section when zooming on the chart, preventing that the scroll from bothering the zoom interaction

  const handleOnZoom = value => {
    setScrollEnabled(value);
  };

  // Socket to detect coin price updates

  // useEffect(() => {
  //   const socket = io('https://aialpha.ngrok.io/');

  //   socket.emit('subscribe_to_ohlc_data', {
  //     coin: coinBot.toLowerCase(),
  //     vs_currency:
  //       selectedPairing === undefined || selectedPairing === null
  //         ? 'usd'
  //         : selectedPairing === 'USDT'
  //         ? 'usd'
  //         : selectedPairing.toLowerCase(),
  //     interval: selectedInterval,
  //     precision: 8,
  //   });

  //   socket.on('subscribe_to_ohlc_data', messageData => {
  //     console.log('Received charts socket data:', messageData);
  //     const data =
  //       typeof messageData === 'string' ? JSON.parse(messageData) : messageData;
  //     console.log('Parsed charts socket data: ', data);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [coinBot, selectedInterval, selectedPairing]);

  // Show the height and width of the phone
  const {height, width} = Dimensions.get('window');
  return (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0F0F0F', '#171717'] : ['#F5F5F5', '#E5E5E5']}
      locations={[0.22, 0.97]}
      style={[subscribed ? {flex: 1} : {height: 500}]}>
      <ScrollView
        scrollEnabled={scrollEnabled}
        style={[
          styles.scroll,
          {width: '100%'},
          !subscribed ? {height: 300} : {},
        ]}
        showsVerticalScrollIndicator={true}
        ref={ref}>
        {aboutVisible && (
          <AboutModal
            description={aboutDescription}
            onClose={handleAboutPress}
            visible={aboutVisible}
          />
        )}
        <View style={[styles.chartsWrapper]}>
          <CandlestickDetails
            loading={loading}
            coin={coinBot}
            interval={selectedInterval}
            lastPrice={lastPrice}
            styles={styles}
            isPriceUp={isPriceUp}
            selectedPairing={selectedPairing}
            selectedInterval={selectedInterval}
            pairings={pairings}
            handlePairingChange={handlePairingChange}
            handleDataUpdate={handleDataUpdate}
          />
          <View
            style={[
              styles.chartsRow,
              {flexDirection: width > 500 ? 'row' : 'column'},
            ]}>
            <IntervalSelector
              selectedInterval={selectedInterval}
              selectedPairing={selectedPairing}
              changeInterval={changeInterval}
              disabled={loading}
            />
            <RsButton
              activeButtons={activeButtons}
              setActiveButtons={setActiveButtons}
              disabled={loading || supportResistanceLoading}
            />
          </View>
          <Chart
            candlesToShow={20}
            symbol={symbol}
            selectedInterval={selectedInterval}
            chartData={chartData}
            loading={loading}
            activeButtons={activeButtons}
            coinBot={coinBot}
            selectedPairing={selectedPairing}
            setSupportResistanceLoading={setSupportResistanceLoading}
            handleOnZoom={handleOnZoom}
          />
          {/* <CWChart
            symbol={symbol}
            selectedInterval={selectedInterval}
            chartData={chartData}
            loading={loading}
            activeButtons={activeButtons}
            coinBot={coinBot}
            selectedPairing={selectedPairing}
            setSupportResistanceLoading={setSupportResistanceLoading}
          /> */}
        </View>
        <AlertMenu
          activeAlertOption={activeAlertOption}
          setActiveButtons={setActiveAlertOption}
          timeframeOptions={timeframeOptions}
        />
        <AlertListComponent
          timeframe={activeAlertOption}
          botName={coinBot}
          styles={styles}
        />
        {!subscribed && <UpgradeOverlay isCharts={true} />}
      </ScrollView>
    </LinearGradient>
  );
};

export default CandlestickChart;
