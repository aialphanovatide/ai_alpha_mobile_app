import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import styles from './PriceActionStyles';
import priceActionService from '../../../services/PriceActionService';
import {ScrollView} from 'react-native-gesture-handler';

const TableItem = ({index, coin}) => {
  return (
    <View key={index} style={styles.dataRow}>
      <Text style={styles.dataCell}>{coin.name}</Text>
      <Text style={styles.dataCell}>${coin.currentPrice}</Text>
      <Text style={styles.dataCell}>${coin.marketCap}</Text>
      <Text style={styles.dataCell}>{coin.price_change_24H}%</Text>
      <Text style={styles.dataCell}>{coin.price_change_7D}%</Text>
      <Text style={styles.dataCell}>{coin.price_change_30D}%</Text>
      <Text style={styles.dataCell}>{coin.price_change_1Y}%</Text>
    </View>
  );
};

const PriceAction = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoinsData = async () => {
      try {
        const data = await priceActionService.getAllCoinsInfo();
        setCoins(data);
      } catch (error) {
        console.error('Error fetching coins data:', error);
      }
    };

    fetchCoinsData();
  }, []);

  const {height, width} = Dimensions.get('window');
  return (
    <View style={[styles.priceActionContainer, width]}>
      <Text style={styles.title}>Price action</Text>
      <ScrollView>
        <View style={styles.tableContainer}>
          {/* Encabezados de columnas */}
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Asset</Text>
            <Text style={styles.headerCell}>Price</Text>
            <Text style={styles.headerCell}>MKT Cap</Text>
            <Text style={styles.headerCell}>24H</Text>
            <Text style={styles.headerCell}>7D</Text>
            <Text style={styles.headerCell}>30D</Text>
            <Text style={styles.headerCell}>1Y</Text>
          </View>

          {/* Datos de la tabla */}
          {coins.map((coin, index) => (
            <TableItem key={index} coin={coin} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default PriceAction;
