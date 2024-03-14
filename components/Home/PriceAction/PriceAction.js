import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import priceActionMock from './priceActionMock';
import priceActionService from '../../../services/PriceActionService';
import {ScrollView} from 'react-native-gesture-handler';
import Loader from '../../Loader/Loader';
import usePriceActionStyles from './PriceActionStyles';
import {CategoriesContext} from '../../../context/categoriesContext';
import {API_BASE_URL} from '../../../services/aiAlphaApi';
import {AboutIcon} from '../Topmenu/subMenu/Fund_news_chart/Fundamentals/AboutIcon';
import {home_static_data} from '../homeStaticData';

const CategorySelector = ({
  categories,
  activeCategory,
  handleActiveCoins,
  coins,
  styles,
}) => {
  return (
    <View style={styles.categoriesContainer}>
      <ScrollView
        horizontal={true}
        style={[styles.row, styles.menuBg]}
        showsHorizontalScrollIndicator={false}>
        {categories.map(category => (
          <TouchableOpacity
            style={styles.categoryWrapper}
            key={category.category_id}
            onPress={() => handleActiveCoins(coins, category)}>
            <View
              style={[
                styles.categoryIconContainer,
                activeCategory?.category_id === category.category_id && {
                  borderColor: category.borderColor,
                  borderWidth: 2,
                },
              ]}>
              <Image
                source={{
                  uri: `${API_BASE_URL}${category.icon}`,
                  width: 30,
                  height: 30,
                }}
                resizeMode="contain"
                style={styles.categoryIcon}
              />
            </View>
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

const PriceAction = ({handleAboutPress}) => {
  const styles = usePriceActionStyles();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const {categories} = useContext(CategoriesContext);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeCoins, setActiveCoins] = useState([]);
  useEffect(() => {
    setCoins(priceActionMock);
    setLoading(false);
    /*
    setLoading(true);
    const fetchCoinsData = async () => {
      try {
        const data = await priceActionService.getAllCoinsInfo();
        console.log(data);
        setCoins(data);
      } catch (error) {
        console.error('Error fetching price action data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoinsData();
    */
  }, []);

  const findCoinsByCategory = (coins, category) => {
    let filteredCoins = [];
    if (category.coin_bots.length > 1) {
      coins.forEach(coin => {
        category.coin_bots.forEach(categoryCoin => {
          if (categoryCoin.bot_name === coin.symbol) {
            filteredCoins.push(coin);
          }
        });
      });
    } else {
      let found = coins.find(
        coin => coin.name.toUpperCase() === category.category.toUpperCase(),
      );
      filteredCoins.push(found);
    }
    return filteredCoins;
  };

  const handleActiveCoins = (coins, category) => {
    setActiveCategory(category);
    setActiveCoins(findCoinsByCategory(coins, category));
  };

  return (
    <View style={[styles.priceActionContainer]}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Price Action</Text>
        <AboutIcon
          description={home_static_data.priceAction.sectionDescription}
          handleAboutPress={handleAboutPress}
        />
      </View>
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
            {activeCoins && activeCoins[0] !== undefined ? (
              activeCoins.map((coin, index) => (
                <TableItem
                  key={index}
                  coin={coin}
                  isActive={activeCoins.includes(coin)}
                  styles={styles}
                />
              ))
            ) : (
              <View
                style={[styles.dataRow, styles.borderless, styles.alignCenter]}>
                <Text style={styles.emptyMessage}>
                  Select a Category to see the coins data
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default PriceAction;
