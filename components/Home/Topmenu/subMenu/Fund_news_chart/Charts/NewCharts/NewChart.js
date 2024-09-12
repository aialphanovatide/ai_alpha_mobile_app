import React, {useContext, useEffect, useMemo, useState} from 'react';
import useNewChartsStyles from './NewChartsStyles';
import {AppThemeContext} from '../../../../../../../context/themeContext';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  VictoryAxis,
  VictoryCandlestick,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryZoomContainer,
} from 'victory-native';
import SkeletonLoader from '../../../../../../Loader/SkeletonLoader';
import {getService} from '../../../../../../../services/aiAlphaApi';
import moment from 'moment';
import DataRenderer from '../clickOnCandleDetails';
import useChartsSource from '../../../../../../../hooks/useChartsSource';
import {io} from 'socket.io-client';
import RsButton from '../S&RButtons';

const PairingsSelector = ({
  selectedPairing,
  handlePairingChange,
  pairings,
  coinBot,
  disabled,
}) => {
  const styles = useNewChartsStyles();
  if (pairings.length === 0) {
    return <></>;
  }
  return (
    <View style={styles.pairingsMenuContainer}>
      {pairings.map((pairing, index) => (
        <TouchableOpacity
          key={index}
          disabled={disabled}
          style={[
            styles.pairingButton,
            {width: `${100 / pairings.length}%`},
            selectedPairing === pairing && styles.pairingActiveButton,
          ]}
          onPress={() => handlePairingChange(pairing)}>
          <Text
            style={[
              styles.timeFrameButtonText,
              selectedPairing === pairing && styles.activeText,
            ]}>
            {`${coinBot.toUpperCase()}/${pairing.toUpperCase()}`}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const IntervalSelector = ({selectedInterval, changeInterval, disabled}) => {
  const styles = useNewChartsStyles();
  const timeframes = ['1d', '1w'];
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

const Chart = ({coinBot, candlesToShow = 30, handlePriceChange}) => {
  const styles = useNewChartsStyles();
  const {theme} = useContext(AppThemeContext);
  // Charts data for generating the candles
  const [chartData, setChartData] = useState([]);
  const [selectedCandle, setSelectedCandle] = useState(null);

  // Socket data
  const aiAlphaSocket = io('https://aialpha.ngrok.io/');

  // Support and resistance lines
  const [activeButtons, setActiveButtons] = useState([]);
  const [supportLevels, setSupportLevels] = useState([]);
  const [resistanceLevels, setResistanceLevels] = useState([]);
  const [shouldFetchSR, setShouldFetchSR] = useState(true);

  // Loading state variables
  const [loading, setLoading] = useState(true);
  const [supportResistanceLoading, setSupportResistanceLoading] =
    useState(false);

  // Selected time interval
  const [selectedInterval, setSelectedInterval] = useState('1w');

  // Selected pairing
  const pairings = useChartsSource(
    coinBot.toLowerCase(),
    null,
    selectedInterval,
  ).pairings;
  const [selectedPairing, setSelectedPairing] = useState(pairings[0]);

  // Function to fetch the OHLC data from the AI Alpha server by http requests, mapping the received data on the response and updating the charts data.

  async function fetchChartDataFromServer(interval, pairing) {
    try {
      const data = await getService(
        `api/chart/ohlc?coin=${coinBot.toLowerCase()}&vs_currency=${
          pairing === 'USDT' ? 'usd' : pairing.toLowerCase()
        }&interval=${interval}&precision=8`,
      );

      // Handle the price change for the text over the chart
      const currentPrice = parseFloat(data[data.length - 1][4]);
      const isPriceUp =
        data[data.length - 1][4] >= data[data.length - 2][4] ? true : false;

      handlePriceChange(currentPrice, isPriceUp, selectedPairing);
      const formattedChartData = data.map(item => ({
        x: moment(item[0]),
        open: parseFloat(item[1]),
        close: parseFloat(item[4]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
      }));
      setChartData(formattedChartData);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error(`Failed to fetch data: ${error}`);
    }
  }

  // Fetch support and resistance data from the AI Alpha server, for the current coin and selected interval
  const getSupportAndResistanceData = async (coin, time_interval) => {
    try {
      const response = await getService(
        `/api/coin-support-resistance?coin_name=${coin}&temporality=${time_interval.toLowerCase()}&pair=${selectedPairing.toLowerCase()}`,
      );

      const supportValues = [];
      const resistanceValues = [];

      if (response.status === 200) {
        // Extract support and resistance values from the response
        const values = response.message;
        for (const key in values) {
          if (key.includes('support')) {
            supportValues.push(values[key]);
          } else if (key.includes('resistance')) {
            resistanceValues.push(values[key]);
          }
        }
        setSupportLevels(supportValues);
        setResistanceLevels(resistanceValues);
      } else {
        console.info('---response S&R----', response.message);
      }
    } catch (error) {
      console.error('Error fetching support and resistance data: ', error);
    } finally {
      setSupportResistanceLoading(false);
    }
  };

  // UseEffects that updates the charts data every 5s, before it was every 1s but for performance reasons it was increased

  // useEffect(() => {
  //   aiAlphaSocket.emit('subscribe_to_ohlc_data', {
  //     coin: coinBot.toLowerCase(),
  //     vs_currency: selectedPairing.toLowerCase(),
  //     interval: selectedInterval,
  //     precision: 8,
  //   });

  //   aiAlphaSocket.on('subscribe_to_ohlc_data', message => {
  //     console.log('Subscribed to ohlc data...', message);
  //   });
  // }, [coinBot, selectedInterval, selectedPairing]);

  useEffect(() => {
    console.log(
      'Active coin: ',
      coinBot,
      ', selected pairing: ',
      selectedPairing,
    );
    fetchChartDataFromServer(selectedInterval, selectedPairing);
    if (
      activeButtons.length > 0 &&
      (supportLevels.length === 0 || resistanceLevels.length === 0)
    ) {
      setSupportResistanceLoading(true);
      getSupportAndResistanceData(coinBot, selectedInterval);
    }
  }, [coinBot, selectedInterval, selectedPairing, activeButtons]);

  useEffect(() => {
    setSupportLevels([]);
    setResistanceLevels([]);
  }, [coinBot, selectedInterval, selectedPairing]);

  // Function to format the Y-axis labels, depending on the number's order

  const formatNumber = num => {
    const absNum = Math.abs(num);
    if (absNum < 1) {
      return num.toFixed(4);
    }
    if (absNum < 0.001) {
      return num.toExponential();
    }
    const abbrev = ['', 'k', 'm', 'b', 't'];
    const tier = Math.floor(Math.log10(absNum) / 3);

    const divisor = Math.pow(1000, tier);
    const formattedNum = (num / divisor).toFixed(2);
    return (num < 0 ? '-' : '') + formattedNum + abbrev[tier];
  };

  // Function to filter the values of the support and resistance lines that are too far from the current price, to avoid breaking the chart. For changing the values filtering, modify the factors of the first return (1.6 and 0.4)

  const filterExcessiveLevels = (levels, currentPrice, type) => {
    return levels.filter(level => {
      if (type === 'support' || type === 'resistance') {
        return level <= currentPrice * 1.6 && level >= currentPrice * 0.4;
      }
      return false;
    });
  };

  // Format numbers of the support and resistance labels
  function formatLabelNumber(number, decimalPlaces = 2) {
    if (number >= 1) {
      return number
        .toFixed(decimalPlaces)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return number;
    }
  }

  // X-Axis domain for the chart
  const [zoomDomain, setZoomDomain] = useState({
    x: [chartData[0]?.x, chartData[chartData.length - 1]?.x],
  });

  useEffect(() => {
    setZoomDomain({
      x: [
        chartData[chartData?.length - candlesToShow]?.x,
        chartData[chartData?.length - 1]?.x,
      ],
    });
  }, [chartData, candlesToShow]);

  // Y-Axis domain for the chart

  const lows = chartData?.map(d => d.low);
  const highs = chartData?.map(d => d.high);
  const low = Math.min(...lows);
  const high = Math.max(...highs);

  const domainY = useMemo(() => {
    if (chartData && chartData?.length > 0) {
      const priceRange = chartData?.slice(-candlesToShow).reduce(
        (acc, dataPoint) => {
          const {open, close, high, low} = dataPoint;
          return [
            Math.min(acc[0], open, close, high, low),
            Math.max(acc[1], open, close, high, low),
          ];
        },
        [Infinity, -Infinity],
      );

      let maxPrice = Math.max(priceRange[1], high);
      let minPrice = Math.min(priceRange[0], low);

      // Apply the function to filter the excessively high or low support and resistance levels
      if (activeButtons.includes('Support')) {
        const filteredSupport = filterExcessiveLevels(
          supportLevels,
          low,
          'support',
        );
        if (filteredSupport.length > 0) {
          minPrice = Math.min(minPrice, ...filteredSupport);
        }
      }

      if (activeButtons.includes('Resistance')) {
        const filteredResistance = filterExcessiveLevels(
          resistanceLevels,
          high,
          'resistance',
        );
        if (filteredResistance.length > 0) {
          maxPrice = Math.max(maxPrice, ...filteredResistance);
        }
      }

      return [minPrice, maxPrice];
    }
  }, [chartData, candlesToShow, activeButtons]);

  // Function to handle candle click events
  const handleCandleClick = (event, data) => {
    const linesColor = data.close > data.open ? '#09C283' : '#E93334';
    setSelectedCandle({...data, linesColor});
  };

  const handleCandlePressOut = () => {
    setSelectedCandle(null); // Clear the selected candle state
  };

  const calculateCandleMiddle = candle => {
    return (candle.open + candle.close) / 2;
  };

  // Function to handle the time interval changes, executing again the data fetching

  const changeInterval = async newInterval => {
    setLoading(true);
    try {
      setSelectedInterval(newInterval);
    } catch (error) {
      console.error(`Failed to change interval: ${error}`);
    }
  };

  // Function to handle the currency-pair for the coins that haves USDT and BTC pairings
  const handlePairingChange = async pairing => {
    setLoading(true);
    try {
      setSelectedPairing(pairing);
    } catch (error) {
      console.error(`Failed to change pairing: ${error}`);
    }
  };

  // Function to handle the data refresh when pressing the update button

  const handleRefresh = () => {
    setLoading(true);
    fetchChartDataFromServer(selectedInterval, selectedPairing);
  };

  return (
    <View style={styles.chartContainer}>
      <IntervalSelector
        selectedInterval={selectedInterval}
        changeInterval={changeInterval}
        disabled={loading}
      />
      <PairingsSelector
        selectedPairing={selectedPairing}
        pairings={pairings || []}
        disabled={loading}
        handlePairingChange={handlePairingChange}
        coinBot={coinBot}
      />
      <RsButton
        activeButtons={activeButtons}
        setActiveButtons={setActiveButtons}
        disabled={loading || supportResistanceLoading}
      />
      {!loading && (
        <TouchableOpacity onPress={() => handleRefresh()} disabled={loading}>
          <Image
            source={require('../../../../../../../assets/images/home/charts/chart-refresh.png')}
            style={styles.refreshButton}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      {loading || chartData.length === 0 ? (
        <View style={styles.chart}>
          <SkeletonLoader
            type="chart"
            style={{height: 300, marginVertical: 18}}
          />
        </View>
      ) : (
        <View style={styles.chart}>
          <ImageBackground
            source={require('../../../../../../../assets/images/chart_alpha_logo.png')}
            style={styles.chartBackgroundImage}
            resizeMode="contain"
          />

          {/* CHART WRAPPER COMPONENT */}
          <VictoryChart
            width={400}
            containerComponent={<VictoryZoomContainer />}
            domain={{x: zoomDomain.x, y: domainY}}
            events={[
              {
                target: 'parent',
                eventHandlers: {
                  onPressOut: () => {
                    handleCandlePressOut();
                    return [];
                  },
                },
              },
            ]}
            padding={{top: 20, bottom: 60, left: 20, right: 70}}
            domainPadding={{
              x: 1,
              y: 10,
            }}
            scale={{x: 'time', y: 'log'}}
            height={340}>
            {/* X AXIS */}
            <VictoryAxis
              fixLabelOverlap
              style={{
                axis: {stroke: theme.chartsAxisColor},
                tickLabels: {
                  fontSize: theme.responsiveFontSize * 0.625,
                  fill: theme.titleColor,
                  fontFamily: theme.font,
                  maxWidth: 10,
                },
                grid: {stroke: theme.chartsGridColor},
              }}
              tickCount={4}
              tickFormat={t => {
                const year = t.getFullYear().toString().slice(2, 4);
                const month = (t.getMonth() + 1).toString().padStart(2, '0');
                const day = t.getDate().toString().padStart(2, '0');
                const hour = t.getHours().toString().padStart(2, '0');
                const minute = t.getMinutes().toString().padStart(2, '0');
                return `${year}-${day}-${month}`;
              }}
            />

            {/* Y AXIS */}
            <VictoryAxis
              dependentAxis
              style={{
                axis: {stroke: theme.chartsAxisColor},
                tickLabels: {
                  fontSize: theme.responsiveFontSize * 0.67,
                  fontFamily: theme.font,
                  fill: theme.titleColor,
                },
                grid: {stroke: theme.chartsGridColor},
              }}
              tickCount={5}
              tickFormat={t => formatNumber(t)}
              orientation={'right'}
            />

            {/* HORIZONTAL LINE */}
            {selectedCandle && (
              <VictoryLine
                data={[
                  {
                    x: zoomDomain.x[0],
                    y: (selectedCandle.open + selectedCandle.close) / 2,
                  },
                  {
                    x: zoomDomain.x[1],
                    y: (selectedCandle.open + selectedCandle.close) / 2,
                  },
                ]}
                style={{
                  data: {
                    stroke: selectedCandle
                      ? selectedCandle.linesColor
                      : '#E93334',
                    strokeWidth: 1,
                    strokeDasharray: [4, 4],
                  },
                }}
              />
            )}

            <DataRenderer
              domainX={zoomDomain.x}
              yPoint={selectedCandle && calculateCandleMiddle(selectedCandle)}
              domainY={domainY}
              chartWidth={400}
              screenWidth={theme.width}
              chartHeight={340}
              data={selectedCandle && selectedCandle}
            />

            {/* VERTICAL LINE */}
            {selectedCandle && (
              <VictoryLine
                data={[
                  {x: new Date(selectedCandle.x), y: high},
                  {x: new Date(selectedCandle.x), y: low},
                ]}
                style={{
                  data: {
                    stroke: selectedCandle
                      ? selectedCandle.linesColor
                      : '#E93334',
                    strokeWidth: 1,
                    strokeDasharray: [4, 4],
                  },
                }}
              />
            )}

            {/* DISPLAY DATA COMPONENT */}
            <VictoryCandlestick
              data={chartData}
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onPressIn: (event, props) => {
                      handleCandleClick(event, props.datum);
                      return []; // Return an empty array to avoid any state mutation on the chart itself
                    },
                  },
                },
              ]}
              candleRatio={0.75}
              candleColors={{positive: '#09C283', negative: '#E93334'}}
              style={{
                data: {
                  strokeWidth: 0.75,
                  stroke: datum =>
                    datum.close < datum.open ? '#09C283' : '#E93334',
                },
              }}
            />

            {/* RESISTANCE LEVELS */}
            {resistanceLevels &&
              activeButtons.includes('Resistance') &&
              resistanceLevels?.map((level, index) => (
                <VictoryLine
                  data={[
                    {x: zoomDomain.x[0], y: level},
                    {x: zoomDomain.x[1], y: level},
                  ]}
                  key={`resistance-${index}`}
                  // styles for the line itself
                  style={{data: {stroke: '#FF3BC3', strokeWidth: 2}}}
                  labels={() => [`$${formatLabelNumber(level)} `]}
                  labelComponent={
                    <VictoryLabel
                      dy={5}
                      dx={10}
                      textAnchor="start"
                      inline={true}
                      style={{
                        fill: '#fff',
                        fontSize: 11,
                        fontFamily: theme.fontMedium,
                      }}
                      backgroundPadding={[
                        {top: -1, bottom: 6, left: 2.3, right: 0},
                      ]}
                      backgroundStyle={[
                        {
                          fill: '#FF3BC3',
                          opacity: 0.8,
                        },
                      ]}
                    />
                  }
                />
              ))}

            {/* SUPPORT LEVELS */}
            {supportLevels &&
              activeButtons.includes('Support') &&
              supportLevels?.map((level, index) => (
                <VictoryLine
                  data={[
                    {x: zoomDomain.x[0], y: level},
                    {x: zoomDomain.x[1], y: level},
                  ]}
                  key={`support-${index}`}
                  style={{
                    data: {stroke: '#C539B4', strokeWidth: 2},
                  }}
                  labels={() => [`$${formatLabelNumber(level)} `]}
                  labelComponent={
                    <VictoryLabel
                      dy={5}
                      dx={10}
                      textAnchor="start"
                      inline={true}
                      backgroundPadding={[
                        {top: -1, bottom: 6, left: 2.3, right: 0},
                      ]}
                      style={[
                        {
                          fill: '#F7F7F7',
                          fontSize: 11,
                          fontFamily: theme.fontMedium,
                        },
                      ]}
                      backgroundStyle={[
                        {
                          fill: '#C539B4',
                          opacity: 0.8,
                        },
                      ]}
                    />
                  }
                />
              ))}
          </VictoryChart>
          <Image
            style={styles.chartsZoomIndicator}
            resizeMode="contain"
            source={require('../../../../../../../assets/images/home/charts/zoom-expand.png')}
          />
        </View>
      )}
    </View>
  );
};

export default Chart;
