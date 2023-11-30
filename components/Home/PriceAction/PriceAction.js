import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './PriceActionStyles';
import priceActionService from '../../../services/PriceActionService';
import {ScrollView} from 'react-native-gesture-handler';
import Loader from '../Loader/Loader';

const TableItem = ({index, coin}) => {
  return (
    <View key={index} style={styles.dataRow}>
      <View style={styles.logoContainer}>
        <Image style={styles.coinLogo} source={{uri: coin.image}} />
      </View>
      <Text style={styles.dataCell}>{coin.symbol.toUpperCase()}</Text>
      <Text style={styles.dataCell}>${coin.currentPrice}</Text>
      <Text style={styles.dataCell}>
        ${coin.marketCap ? coin.marketCap.toFixed(2) : 0.0}M
      </Text>
      <Text
        style={[
          styles.dataCell,
          coin.price_change_24H >= 0 ? styles.greenNumber : styles.redNumber,
        ]}>
        {coin.price_change_24H ? coin.price_change_24H.toFixed(2) : 0.0}%
      </Text>
      <Text
        style={[
          styles.dataCell,
          coin.price_change_7D >= 0 ? styles.greenNumber : styles.redNumber,
        ]}>
        {coin.price_change_7D ? coin.price_change_7D.toFixed(2) : 0.0}%
      </Text>
      <Text
        style={[
          styles.dataCell,
          coin.price_change_30D >= 0 ? styles.greenNumber : styles.redNumber,
        ]}>
        {coin.price_change_30D ? coin.price_change_30D.toFixed(2) : 0.0}%
      </Text>
      <Text
        style={[
          styles.dataCell,
          coin.price_change_1Y >= 0 ? styles.greenNumber : styles.redNumber,
        ]}>
        {coin.price_change_1Y ? coin.price_change_1Y.toFixed(2) : 0.0}%
      </Text>
    </View>
  );
};

const PriceAction = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinsData = async () => {
      try {
        const data = await priceActionService.getAllCoinsInfo();
        setCoins(data);
      } catch (error) {
        console.error('Error fetching coins data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoinsData();
  }, []);

  return (
    <View style={[styles.priceActionContainer]}>
      <Text style={styles.title}>Price action</Text>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.tableContainer}>
          {/* Encabezados de columnas */}
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Asset</Text>
            <Text style={styles.headerCell}>Price{'(USD)'}</Text>
            <Text style={styles.headerCell}>MKT Cap</Text>
            <Text style={styles.headerCell}>24H</Text>
            <Text style={styles.headerCell}>7D</Text>
            <Text style={styles.headerCell}>30D</Text>
            <Text style={styles.headerCell}>1Y</Text>
          </View>
          <ScrollView style={styles.tableScrollView}>
            {/* Datos de la tabla */}
            {coins.map((coin, index) => (
              <TableItem key={index} coin={coin} />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default PriceAction;
