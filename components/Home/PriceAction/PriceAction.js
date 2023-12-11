import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './PriceActionStyles';
import priceActionMock from './priceActionMock';
import priceActionService from '../../../services/PriceActionService';
import {ScrollView} from 'react-native-gesture-handler';
import Loader from '../Loader/Loader';

const ColumnSelector = ({options, selectedOption, onSelect}) => {
  return (
    <View style={styles.selectorContainer}>
      {options.map(option => (
        <TouchableOpacity key={option.value} onPress={() => onSelect(option)}>
          <Text
            style={[
              styles.selectorOption,
              selectedOption.value === option.value && styles.selectedOption,
            ]}>
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const TableItem = ({index, coin, selectedColumn}) => {
  return (
    <View key={index} style={styles.dataRow}>
      <View style={styles.logoContainer}>
        <Image style={styles.coinLogo} source={{uri: coin.image}} />
      </View>
      <Text style={styles.dataCell}>{coin.symbol.toUpperCase()}</Text>
      <Text style={styles.dataCell}>${coin.currentPrice}</Text>
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
          coin[selectedColumn.value] >= 0
            ? styles.greenNumber
            : styles.redNumber,
        ]}>
        {coin[selectedColumn.value]
          ? coin[selectedColumn.value].toFixed(2)
          : 0.0}
        %
      </Text>
    </View>
  );
};

const PriceAction = () => {
  const columns = [
    {
      label: '7D',
      value: 'price_change_7D',
    },
    {
      label: '30D',
      value: 'price_change_30D',
    },
    {
      label: '1Y',
      value: 'price_change_1Y',
    },
  ];
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedColumn, setSelectedColumn] = useState(columns[0]);

  useEffect(() => {
    setCoins(priceActionMock);
    setLoading(false);
    // const fetchCoinsData = async () => {
    //   try {
    //     const data = await priceActionService.getAllCoinsInfo();
    //     console.log(data);
    //     setCoins(data);
    //   } catch (error) {
    //     console.error('Error fetching coins data:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchCoinsData();
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
            <Text style={styles.headerCell}>Price{' (USD)'}</Text>
            <Text style={styles.headerCell}>24H</Text>
            <ColumnSelector
              options={columns}
              selectedOption={selectedColumn}
              onSelect={setSelectedColumn}
            />
          </View>
          <ScrollView
            style={styles.tableScrollView}
            bounces={false}
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}>
            {/* Datos de la tabla */}
            {coins.map((coin, index) => (
              <TableItem
                key={index}
                coin={coin}
                selectedColumn={selectedColumn}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default PriceAction;
