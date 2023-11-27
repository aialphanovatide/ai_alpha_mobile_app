import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import TickerTape from '../Dashboard/TickerTape';
import TopTenGainers from '../TopTenGainers';
// This component renders when one of the Non-Fundamental packages are touched. Here is the information about the currency and displays along with a submenu that lets to select one of the cryptos that the package include.
const NonFundamentalCoin = ({currentHomeSection}) => {
  const {height, width} = Dimensions.get('window');
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: 'transparent',
          width: 600,
          height: 35,
          marginTop: 20,
        }}>
        <TickerTape />
      </View>
      {
        //TODO - Replace here with TopStories component working
      }
      <View
        style={{
          backgroundColor: '#EFEFEF',
          width,
          height: 400,
          marginRight: 'auto',
          marginLeft: 'auto',
        }}>
        <Text style={{marginTop: 5, padding: 2.5, color: '#B8BBBC'}}>
          Top Stories
        </Text>
      </View>
      {
        //TODO - Replace here with Analysis component working
      }
      <View
        style={{
          backgroundColor: '#EFEFEF',
          width,
          height: 100,
          marginTop: 10,
          marginRight: 'auto',
          marginLeft: 'auto',
        }}>
        <Text
          style={{
            marginTop: 5,
            padding: 2.5,
            color: '#5F6466',
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          Analysis
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#EFEFEF',
          width,
          height: 'auto',
          marginTop: 20,
          marginRight: 'auto',
          marginLeft: 'auto',
        }}>
        <TopTenGainers />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  currencyTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NonFundamentalCoin;
