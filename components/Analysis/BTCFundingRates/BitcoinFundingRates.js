import {React, useState, useEffect, useContext} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import styles from './BTCFRStyles';
import BackButton from '../BackButton/BackButton';
import FundingRatesServices from '../../../services/FundingRatesServices';
import Loader from '../../Loader/Loader';

const TableHeaderCell = ({obj}) => {
  return (
    <View style={styles.headerCell}>
      <View style={styles.logoContainer}>
        <Image style={styles.exchangeLogo} source={{uri: obj.exchangeLogo}} />
      </View>
      <Text style={styles.exchangeName}>{obj.exchangeName}</Text>
    </View>
  );
};

const BitcoinFundingRates = ({handleReturn}) => {
  const [btcData, setBtcData] = useState(null);
  const [fundingRates, setFundingRates] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBtcFundingRates = async () => {
      try {
        const data = await FundingRatesServices.getBtcFundingRates();
        setBtcData({btcSymbol: data.symbol, btcLogo: data.symbolLogo});
        const fundingRatesArray = data.uMarginList;
        setFundingRates(fundingRatesArray);
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
                  <TableHeaderCell key={index} obj={obj} />
                ))}
            </View>
            <View style={styles.dataRow}>
              {fundingRates &&
                fundingRates.map((obj, index) => (
                  <Text key={index} style={styles.dataCell}>
                    {obj.rate.toFixed(4)}%
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
