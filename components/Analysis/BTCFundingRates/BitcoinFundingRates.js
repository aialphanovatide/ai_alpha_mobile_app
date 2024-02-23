import {React, useState, useEffect} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import BackButton from '../BackButton/BackButton';
import FundingRatesServices from '../../../services/FundingRatesServices';
import Loader from '../../Loader/Loader';
import useBtcFundingRatesStyles from './BTCFRStyles';
import exchangesData from './ExchangesMetaData';

const TableHeaderCell = ({obj, styles}) => {
  return (
    <View style={styles.headerCell}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.exchangeLogo}
          source={obj.altLogo}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.exchangeName}>{obj.exchange}</Text>
    </View>
  );
};

const BitcoinFundingRates = ({handleReturn}) => {
  const styles = useBtcFundingRatesStyles();
  const [fundingRates, setFundingRates] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatExchangesData = (data, exchanges) => {
    let responseWithMetadata = data.map(obj => {
      let logo = exchanges.find(
        exchange => obj.exchange === exchange.name,
      ).logo;
      let altLogo = exchanges.find(
        exchange => obj.exchange === exchange.name,
      ).static_logo;
      return {
        exchange: obj.exchange,
        value: obj.value,
        logo: logo,
        altLogo: altLogo,
        symbol: obj.symbol,
      };
    });
    return responseWithMetadata ? responseWithMetadata : [];
  };

  useEffect(() => {
    const fetchBtcFundingRates = async () => {
      try {
        const data = await FundingRatesServices.getBtcFundingRates();
        const fullData = formatExchangesData(data, exchangesData);
        setFundingRates(fullData);
        setLoading(false);
      } catch (error) {
        console.error(`Error trying to fetch Bitcoin funding rates: ${error}`);
      }
    };
    fetchBtcFundingRates();
  }, []);

  return (
    <View style={styles.mainSection}>
      <BackButton handleReturn={handleReturn} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>BTC Funding Rates</Text>
      </View>
      <Text style={styles.sectionDescription}>
        Shows the current funding rates for Bitcoin on various exchanges. These
        are key indicators to understand the market outlook in terms of long or
        short positions.
      </Text>
      <TouchableOpacity style={styles.readMoreButton}>
        <Text style={styles.readMoreText}>Read more</Text>
      </TouchableOpacity>
      {loading ? (
        <View style={styles.loaderWrapper}>
          <Loader />
        </View>
      ) : (
        <ScrollView nestedScrollEnabled>
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              {fundingRates &&
                fundingRates.map((obj, index) => (
                  <TableHeaderCell key={index} obj={obj} styles={styles} />
                ))}
            </View>
            <View style={styles.dataRow}>
              {fundingRates &&
                fundingRates.map((obj, index) => (
                  <Text
                    key={index}
                    style={[
                      styles.dataCell,
                      obj.value >= 0 ? styles.priceUp : styles.priceDown,
                    ]}>
                    {obj.value}%
                  </Text>
                ))}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default BitcoinFundingRates;
