import {React, useState, useEffect, useContext} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import BackButton from '../BackButton/BackButton';
import FundingRatesServices from '../../../services/FundingRatesServices';
import Loader from '../../Loader/Loader';
import useBtcFundingRatesStyles from './BTCFRStyles';
import exchangesData from './ExchangesMetaData';

const TableHeaderCell = ({obj, styles}) => {
  return (
    <View style={styles.headerCell}>
      <View style={styles.logoContainer}>
        <Image style={styles.exchangeLogo} source={{uri: obj.logo}} />
      </View>
      <Text style={styles.exchangeName}>{obj.exchange}</Text>
    </View>
  );
};

const BitcoinFundingRates = ({handleReturn}) => {
  const styles = useBtcFundingRatesStyles();
  const [btcData, setBtcData] = useState(null);
  const [fundingRates, setFundingRates] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatExchangesData = (data, exchanges) => {
    let responseWithMetadata = data.map(obj => {
      let logo = exchanges.find(
        exchange => obj.exchange === exchange.name,
      ).logo;
      return {
        exchange: obj.exchange,
        value: obj.value,
        logo: logo,
        symbol: obj.symbol,
      };
    });
    return responseWithMetadata ? responseWithMetadata : [];
  };

  useEffect(() => {
    const fetchBtcFundingRates = async () => {
      try {
        const data = await FundingRatesServices.getBtcFundingRates();
        // setBtcData({btcSymbol: data.symbol, btcLogo: data.symbolLogo});
        // const fundingRatesArray = data.uMarginList;
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

      {loading ? (
        <Loader />
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
