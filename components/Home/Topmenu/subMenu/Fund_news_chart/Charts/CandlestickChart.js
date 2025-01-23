import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  BackHandler,
} from 'react-native';
import ChartPriceDetails from './ChartPriceDetails';
import RsButton from './S&RButtons';
import AlertMenu from './alerts/AlertMenu';
import AlertListComponent from './alerts/AlertListComponent';
import useChartsStyles from './ChartsStyles';
import {RevenueCatContext} from '../../../../../../context/RevenueCatContext';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../../../../../context/themeContext';
import {useScrollToTop} from '@react-navigation/native';
import {useScreenOrientation} from '../../../../../../hooks/useScreenOrientation';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import useChartsSource from '../../../../../../hooks/useChartsSource';
import {HeaderVisibilityContext} from '../../../../../../context/HeadersVisibilityContext';
import {throttle} from 'lodash';
import {useSelector} from 'react-redux';
import {
  selectActiveCoin,
  selectActiveSubCoin,
} from '../../../../../../actions/categoriesActions';
import ChartWidget from './ChartWidget/ChartWidget';
import ChartTimeSelector from './ChartTimeSelector';
import {getTestService} from '../../../../../../services/aiAlphaApi';

// Component to display the charts time interval selector buttons, allowing the user to change the time interval of the chart. It receives the selected pairing, the selected interval, the function to change the interval and a boolean to disable the buttons when the chart is loading. It returns a view with the buttons for the time intervals.

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

// Component to display the candlestick chart, allowing the user to interact with it by zooming in and out, and also to change the time interval and the currency pairing. It receives the route params to get the interval, the symbol and the coinBot, and the navigation object to handle the screen orientation changes. It returns a view with the chart, the interval selector and the buttons to show the support and resistance lines. It also displays the alert menu and the alert list component below of the section's components.

const CandlestickChart = ({route}) => {
  const styles = useChartsStyles();
  const timeframeOptions = ['1H', '4H', '1D', '1W'];
  const {interval, symbol, coinBot} =
    route.params.screen === 'Charts' ? route.params.params : route.params;
  const [isPriceUp, setIsPriceUp] = useState(null);
  const [selectedInterval, setSelectedInterval] = useState('1w');
  const [lastPrice, setLastPrice] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [activeButtons, setActiveButtons] = useState([]);
  const activeCoin = useSelector(selectActiveCoin);
  const activeSubCoin = useSelector(selectActiveSubCoin);
  const {subscribed} = useContext(RevenueCatContext);
  const [activeAlertOption, setActiveAlertOption] = useState('4H');
  const {isDarkMode} = useContext(AppThemeContext);
  const pairings = useChartsSource(
    activeSubCoin.toLowerCase(),
    null,
    selectedInterval,
  ).pairings;
  const [selectedPairing, setSelectedPairing] = useState(pairings[0]);
  const navigation = useNavigation();
  const {isLandscape, isHorizontal, handleScreenOrientationChange} =
    useScreenOrientation();
  const [scrollEnabled, setScrollEnabled] = useState(true);

  useEffect(() => {
    const backAction = navigation.addListener('beforeRemove', e => {
      if (isLandscape && isHorizontal) {
        e.preventDefault();
      }
    });

    return () => backAction();
  }, [isLandscape, isHorizontal]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  // This ref object allows to scroll to top on every tab press

  const ref = useRef(null);

  useScrollToTop(ref);

  // Restart the last price on every coin update

  useEffect(() => {
    fetchChartDataFromServer(selectedPairing, selectedInterval);
    setActiveButtons(['Support', 'Resistance']);
    setLoading(true);
    setLastPrice(undefined);
    setSelectedPairing(pairings[0]);
    setSelectedInterval('1w');
  }, [activeSubCoin, coinBot]);

  // Function to fetch the data from Binance and from Coingecko for KAS and VELO, since that coins doesn't have data on the first one, and map it for using it with VictoryChart's components

  async function fetchChartDataFromServer(pairing, interval) {
    const coinName = activeSubCoin ? activeSubCoin : coinBot;
    try {
      const response = await getTestService(
        `chart/ohlc?gecko_id=${
          coinName.toLowerCase() === 'pol' ? 'polygon' : coinName.toLowerCase()
        }&symbol=${
          coinName.toLowerCase() === 'pol' ? 'polygon' : coinName.toLowerCase()
        }&vs_currency=${
          pairing === 'USDT' ? 'usd' : pairing.toLowerCase()
        }&interval=${interval.toLowerCase()}&precision=8`,
      );
      const data = response.data;
      const currentPrice = parseFloat(data[data.length - 1][4]);
      data[data.length - 1][4] >= data[data.length - 2][4]
        ? setIsPriceUp(true)
        : setIsPriceUp(false);
      setLastPrice(currentPrice);
      console.log(
        `-  Successfully retrieved last price for coin: ${coinName}.`,
      );
    } catch (error) {
      console.error(`Failed to fetch the last pricing data: ${error}`);
    }
  }

  // Function to manually update the data of the chart

  const handleDataUpdate = (pairing, currentInterval) => {
    fetchChartDataFromServer(pairing, currentInterval);
  };

  // Function to handle the time interval changes, executing again the data fetching

  const changeInterval = async newInterval => {
    setLoading(true);
    setSelectedInterval(newInterval);
    fetchChartDataFromServer(selectedPairing, newInterval);
  };

  // Function to handle the currency-pair for the coins that haves USDT and BTC pairings
  const handlePairingChange = async (pairing, currentInterval) => {
    setLoading(true);
    setSelectedPairing(pairing);
    if (pairing.toLowerCase() === 'btc' || pairing.toLowerCase() === 'eth') {
      setSelectedInterval('1d');
      fetchChartDataFromServer(pairing, '1d');
      return;
    }
    fetchChartDataFromServer(pairing, currentInterval);
  };

  // Function to handle enabling and disabling the scroll on the whole section when zooming on the chart, preventing that the scroll from bothering the zoom interaction

  const handleOnZoom = value => {
    setScrollEnabled(value);
  };

  // Show the height and width of the phone
  const {height, width} = Dimensions.get('window');

  // Functions to handle the scrolling interaction that hides the menu

  const {showHeader, hideHeader} = useContext(HeaderVisibilityContext);
  const scrollOffset = useRef(0);
  const scrollViewRef = useRef(null);

  const handleScroll = throttle(event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    if (currentOffset > 200) {
      hideHeader('TopMenu');
      hideHeader('SubMenu');
      hideHeader('FundNewsChartsMenu');
    } else if (currentOffset <= 200) {
      showHeader('TopMenu');
      showHeader('SubMenu');
      showHeader('FundNewsChartsMenu');
    }

    scrollOffset.current = currentOffset;
  }, 350);

  const onScroll = event => {
    event.persist();
    handleScroll(event);
  };

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
        ref={scrollViewRef}
        onScroll={onScroll}
        scrollEventThrottle={16}>
        <View style={[styles.chartsWrapper]}>
          <ChartPriceDetails
            loading={loading}
            coin={activeSubCoin ? activeSubCoin : coinBot}
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
            <ChartTimeSelector
              selectedInterval={selectedInterval}
              selectedPairing={selectedPairing}
              changeInterval={changeInterval}
              disabled={loading}
              hasHourlyTimes={false}
            />
            <RsButton
              activeButtons={activeButtons}
              setActiveButtons={setActiveButtons}
              disabled={loading}
            />
          </View>
          <ChartWidget
            symbol={activeSubCoin ? activeSubCoin : coinBot}
            activeInterval={selectedInterval}
            pair={selectedPairing}
            handleOnZoom={handleOnZoom}
            activeButtons={activeButtons}
            loading={loading}
            setLoading={setLoading}
          />
        </View>
        <AlertMenu
          activeAlertOption={activeAlertOption}
          setActiveButtons={setActiveAlertOption}
          timeframeOptions={timeframeOptions}
        />
        <AlertListComponent
          timeframe={activeAlertOption}
          botName={activeSubCoin ? activeSubCoin : coinBot}
          styles={styles}
        />
        {/* {!subscribed && <UpgradeOverlay isCharts={true} />} */}
      </ScrollView>
    </LinearGradient>
  );
};

export default CandlestickChart;
