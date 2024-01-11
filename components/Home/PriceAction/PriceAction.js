import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import priceActionMock from './priceActionMock';
import priceActionService from '../../../services/PriceActionService';
import {ScrollView} from 'react-native-gesture-handler';
import Loader from '../../Loader/Loader';
import menuData from '../Topmenu/mainMenu/menuData';
import usePriceActionStyles from './PriceActionStyles';

const CategorySelector = ({
  categories,
  activeCategory,
  handleActiveCoins,
  coins,
  styles,
}) => {
  return (
    <View style={styles.categoriesContainer}>
      <Text style={styles.categoriesTitle}>Categories</Text>
      <ScrollView
        horizontal={true}
        style={styles.row}
        showsHorizontalScrollIndicator={false}>
        {categories.map(category => (
          <TouchableOpacity
            style={activeCategory?.id === category.id && styles.active}
            key={category.id}
            onPress={() => handleActiveCoins(coins, category)}>
            <Text
              style={[
                styles.dataCell,
                styles.category,
                activeCategory?.id === category.id && styles.activeText,
              ]}>
              {category.icon}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const TableItem = ({index, coin, isActive, styles}) => {
  return (
    <View key={index} style={isActive ? styles.dataRow : styles.displayNone}>
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
    </View>
  );
};

const PriceAction = () => {
  const styles = usePriceActionStyles();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(menuData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [activeCoins, setActiveCoins] = useState(
    activeCategory ? activeCategory.subMenuOptions : [],
  );
  useEffect(() => {
    setCoins(priceActionMock);
    setLoading(false);
    /*
    const fetchCoinsData = async () => {
      try {
        const data = await priceActionService.getAllCoinsInfo();
        console.log(data);
        setCoins(data);
      } catch (error) {
        console.error('Error fetching coins data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoinsData();
    */
  }, []);

  const findCoinsByCategory = (coins, category) => {
    let filteredCoins = [];
    if (category.subMenuOptions) {
      coins.forEach(coin => {
        category.subMenuOptions.forEach(categoryCoin => {
          if (categoryCoin.coin === coin.symbol.toUpperCase()) {
            filteredCoins.push(coin);
          }
        });
      });
    } else {
      let found = coins.find(
        coin => coin.symbol.toUpperCase() === category.icon,
      );
      filteredCoins.push(found);
    }
    return filteredCoins;
  };

  const handleActiveCoins = (coins, category) => {
    setActiveCategory(category);
    setActiveCoins(findCoinsByCategory(coins, category));
    // console.log(activeCoins);
  };

  return (
    <View style={[styles.priceActionContainer]}>
      <Text style={styles.title}>Price action</Text>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.tableContainer}>
          {/* Encabezados de columnas */}
          <CategorySelector
            coins={coins}
            categories={categories}
            activeCategory={activeCategory}
            handleActiveCoins={handleActiveCoins}
            styles={styles}
          />
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Asset</Text>
            <Text style={styles.headerCell}>Price{' (USD)'}</Text>
            <Text style={styles.headerCell}>24H</Text>
          </View>
          <View
            style={styles.tableScrollView}
            // bounces={false}
            // alwaysBounceVertical={false}
            // showsVerticalScrollIndicator={false}
          >
            {/* Datos de la tabla */}
            {activeCoins &&
              activeCoins.map((coin, index) => (
                <TableItem
                  key={index}
                  coin={coin}
                  isActive={activeCoins.includes(coin)}
                  styles={styles}
                />
              ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default PriceAction;
