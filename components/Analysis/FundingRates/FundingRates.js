import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import BackButton from '../../BackButton/BackButton';
import FundingRatesServices from '../../../services/FundingRatesServices';
import useFundingRatesStyles from './FundingRatesStyles';
import exchangesData from '../../../assets/static_data/ExchangesMetaData';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../../context/themeContext';
import SkeletonLoader from '../../Loader/SkeletonLoader';
import {RevenueCatContext} from '../../../context/RevenueCatContext';
import UpgradeOverlay from '../../UpgradeOverlay/UpgradeOverlay';

// Static data for testing purposes

const FUNDING_RATES_MOCK = {
  BTC: {Binance: '0.0221', Bybit: '0.0394', OKX: '0.0057', dYdX: '0.0022'},
  ETH: {Binance: '0.0302', Bybit: '0.0116', OKX: '0.0067', dYdX: '0.0029'},
  SOL: {Binance: '0.0261', OKX: '0.0253', dYdX: '0.0037'},
};

// Component to render the table header cell in the funding rates table. It displays the exchange name and logo.

const TableHeaderCell = ({title, styles, logoSource, index, itemsLength}) => {
  return (
    <View
      style={[
        styles.headerCell,
        styles.headerBg,
        index === 0 ? {borderTopLeftRadius: 3, borderBottomLeftRadius: 3} : {},
        index === itemsLength - 1
          ? {borderTopRightRadius: 3, borderBottomRightRadius: 3}
          : {},
      ]}>
      <Image
        style={styles.coinLogo}
        source={{uri: logoSource}}
        resizeMode="contain"
      />
      <Text style={styles.exchangeName}>{title}</Text>
    </View>
  );
};

// Component to render the table cell in the funding rates table. It displays the funding rate value for a coin in a specific exchange.

const TableCell = ({value, styles}) => {
  return (
    <Text
      style={[
        styles.dataCell,
        value >= 0 ? styles.priceUp : styles.priceDown,
        value === undefined ? styles.naText : {},
      ]}>
      {value !== undefined ? `${value}%` : 'N/A'}
    </Text>
  );
};

// FundingRates component that renders the funding rates screen. It displays the current funding rates for BTC, ETH, and SOL on various exchanges. The user can view the funding rates for the three coins on different exchanges to understand the market outlook in terms of long or short positions. The component also includes a brief description of the funding rates and a return button to navigate back to the previous screen.

const FundingRates = ({handleReturn}) => {
  const styles = useFundingRatesStyles();
  const [fundingRates, setFundingRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const {isDarkMode} = useContext(AppThemeContext);
  const {subscribed} = useContext(RevenueCatContext);

  // Static data for the coins and their respective logos

  const COINS_STATIC_DATA = [
    {
      title: 'BTC',
      source: `https://aialphaicons.s3.us-east-2.amazonaws.com/coins/btc.png`,
    },
    {
      title: 'ETH',
      source: `https://aialphaicons.s3.us-east-2.amazonaws.com/coins/eth.png`,
    },
    {
      title: 'SOL',
      source: `https://aialphaicons.s3.us-east-2.amazonaws.com/coins/sol.png`,
    },
  ];

  // Function that formats the data coming from the Coinalyze API, adapting it to the component's required format, and grouping it by the three coins that we have in this section.

  const formatExchangesData = (data, exchanges) => {
    let arrays_response = {
      BTC: {},
      ETH: {},
      SOL: {},
    };

    let responseWithMetadata = data.map(obj => {
      let exchangeMeta = exchanges.find(
        exchange => obj.exchange === exchange.name,
      );
      return {
        exchange: obj.exchange,
        value: obj.value,
        logo: exchangeMeta ? exchangeMeta.logo : null,
        altLogo: exchangeMeta ? exchangeMeta.static_logo : null,
        symbol: obj.symbol,
      };
    });

    responseWithMetadata.forEach(datum => {
      const coin_from_symbol = datum.symbol.slice(0, 3).toUpperCase();
      if (arrays_response[coin_from_symbol]) {
        arrays_response[coin_from_symbol][datum.exchange] = datum.value;
      }
    });

    return arrays_response;
  };

  useEffect(() => {
    const fetchBtcFundingRates = async () => {
      try {
        const data = await FundingRatesServices.getBtcFundingRates();
        const fullData = formatExchangesData(data, exchangesData);
        console.log(fullData);
        setFundingRates(fullData);
        setLoading(false);
      } catch (error) {
        console.error(`Error trying to fetch Bitcoin funding rates: ${error}`);
      }
    };
    fetchBtcFundingRates();
    // setFundingRates(FUNDING_RATES_MOCK);
    // setLoading(false);
  }, []);

  return (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0F0F0F', '#171717'] : ['#F5F5F5', '#E5E5E5']}
      locations={[0.22, 0.97]}
      style={{flex: 1}}>
      <ScrollView style={styles.mainSection}>
        <BackButton handleReturn={handleReturn} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Funding Rates</Text>
        </View>
        <Text style={styles.sectionDescription}>
          Shows the current funding rates for BTC, ETH, and SOL on various
          exchanges. These are key indicators to understand the market outlook
          in terms of long or short positions.
        </Text>
        {loading ? (
          <View style={styles.loaderWrapper}>
            <SkeletonLoader type="fundingRates" quantity={4} />
          </View>
        ) : (
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              {COINS_STATIC_DATA.map((coin, index) => (
                <TableHeaderCell
                  key={index}
                  title={coin.title}
                  logoSource={coin.source}
                  styles={styles}
                  index={index}
                  itemsLength={COINS_STATIC_DATA.length}
                />
              ))}
            </View>
            {exchangesData.map((exchange, index) => (
              <View key={index} style={styles.dataRow}>
                <View
                  style={[
                    styles.headerCell,
                    styles.exchangeHeader,
                    index === 0
                      ? {borderTopLeftRadius: 3, borderTopRightRadius: 3}
                      : {},
                    index === exchangesData.length - 1
                      ? {
                          borderTopBottomLeftRadius: 3,
                          borderBottomRightRadius: 3,
                        }
                      : {},
                  ]}>
                  <Image
                    style={styles.exchangeLogo}
                    source={exchange.static_logo}
                    resizeMode="contain"
                  />
                  <Text style={styles.exchangeName}>{exchange.name}</Text>
                </View>
                {COINS_STATIC_DATA.map((coin, idx) => (
                  <TableCell
                    key={idx}
                    value={
                      fundingRates && fundingRates[coin.title]
                        ? fundingRates[coin.title][exchange.name]
                        : undefined
                    }
                    styles={styles}
                  />
                ))}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      {subscribed ? <></> : <UpgradeOverlay />}
    </LinearGradient>
  );
};

export default FundingRates;
