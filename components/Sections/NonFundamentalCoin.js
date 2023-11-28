import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import TickerTape from '../PricesBar/TickerTape';
import TopTenGainers from '../TopTenGainers/TopTenGainers';
import styles from './CoinStyles.js';
// This component renders when one of the Non-Fundamental packages are touched. Here is the information about the currency and displays along with a submenu that lets to select one of the cryptos that the package include.
const NonFundamentalCoin = ({currentHomeSection}) => {
  const {height, width} = Dimensions.get('window');
  return (
    <ScrollView>
      <View style={[styles.pricesBarContainer]}>
        <TickerTape />
      </View>
      {
        //TODO - Replace here with TopStories component working
      }
      <View style={[styles.topStoriesContainer, width]}>
        <Text style={[styles.sectionTextText]}>Top Stories</Text>
      </View>
      {
        //TODO - Replace here with Analysis component working
      }
      <View style={[styles.analysisContainer, width]}>
        <Text style={styles.sectionTextText}>Analysis</Text>
      </View>
      {
        // Top Ten Gainers widget
      }
      <TopTenGainers />
    </ScrollView>
  );
};
export default NonFundamentalCoin;
