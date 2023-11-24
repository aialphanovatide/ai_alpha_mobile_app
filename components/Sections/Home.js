/* eslint-disable prettier/prettier */
import {React, useEffect, useState} from 'react';
import {View, Dimensions, Text} from 'react-native';
import CryptoTopMenu from '../CryptoTopMenu';
import TickerTape from '../Dashboard/TickerTape';
import {ScrollView} from 'react-native-gesture-handler';
import CoinSubMenu from '../CoinSubMenu';
import CryptoSubMenuOptions from '../CryptoSubMenuOptions';
import Coin from './Coin';
import TopTenGainers from '../TopTenGainers';
const Home = () => {
  // Device height and width control
  const {height, width} = Dimensions.get('window');
  // Main sections
  const cryptocurrencies = [
    'BTC',
    'ETH',
    'L0',
    'L1',
    'CBP',
    'LSD',
    'L2',
    'ORA',
    'DEFIOLD',
    'DEFINEW',
    'AI',
  ];
  // Sections for the main top menu
  const [currentHomeSection, setCurrentHomeSection] = useState(null);
  // SubOptions for fundamental coins (BTC-ETH-SOL)
  const mainSubOptions = ['Fundamental', 'Charts', 'News'];
  const [mainCoinsOption, setMainCoinsOption] = useState(mainSubOptions[0]);
  // SubOptions for each non-fundamental currency
  const subOptions = {
    BTC: null,
    ETH: null,
    SOL: null,
    L0: ['ATOM', 'DOT', 'QNT'],
    L1: ['ADA', 'SOL', 'AVAX', 'NEAR', 'FTM', 'KAS'],
    CBP: ['XLM', 'ALGO', 'XRP'],
    LSD: ['LDO', 'RPL', 'FXS'],
    L2: ['MATIC', 'ARB', 'OP'],
    ORA: ['LINK', 'API3', 'BAND'],
    DEFIOLD: ['AAVE', 'MKR', 'UNI', 'SUSHI', '1INCH'],
    DEFINEW: ['OSMO', 'GMX', 'DYDX', 'INJ', 'PENDLE'],
    AI: ['OCEAN', 'FET', 'RNDR', 'AGIX'],
  };

  const [subMenuOptions, setSubMenuOptions] = useState(subOptions[0]);

  // Function to change the BTC-ETH-SOL section that is displaying
  const handleSubMenuOptionPress = option => {
    setMainCoinsOption(option);
    console.log(option);
  };

  return (
    <ScrollView
      style={{
        backgroundColor: '#222',
        flex: 1,
        height,
      }}>
      <View>
        <CryptoTopMenu
          cryptocurrencies={cryptocurrencies}
          currentHomeSection={currentHomeSection}
          setCurrentHomeSection={setCurrentHomeSection}
          setSubMenuOptions={setSubMenuOptions}
          subOptions={subOptions}
        />
      </View>
      <View>
        {(currentHomeSection === 'BTC' ||
          currentHomeSection === 'ETH' ||
          currentHomeSection === 'SOL') && (
          <CryptoSubMenuOptions
            mainSubOptions={mainSubOptions}
            mainCoinsOption={mainCoinsOption}
            handleSubMenuOptionPress={handleSubMenuOptionPress}
          />
        )}
      </View>
      <View>
        {subMenuOptions &&
          (currentHomeSection !== 'BTC' ||
            currentHomeSection !== 'ETH' ||
            currentHomeSection !== 'SOL') && (
            <CoinSubMenu currencies={subMenuOptions} />
          )}
      </View>
      {(currentHomeSection === null ||
        (currentHomeSection !== 'BTC' &&
        currentHomeSection !== 'ETH' &&
        currentHomeSection !== 'SOL')) && (
        <>
          <View
            style={{
              backgroundColor: '#171717',
              width: 600,
              height: 60,
              marginTop: 20,
            }}>
            <TickerTape />
          </View>
          <View
            style={{
              backgroundColor: '#171717',
              width,
              height: 400,
              marginRight: 'auto',
              marginLeft: 'auto',
            }}>
            <Text style={{marginTop: 5, padding: 2.5}}>TOP STORIES</Text>
          </View>
          <View
            style={{
              backgroundColor: '#171717',
              width,
              height: 100,
              marginTop: 10,
              marginRight: 'auto',
              marginLeft: 'auto',
            }}>
            <Text style={{marginTop: 5, padding: 2.5}}>ANALYSIS</Text>
          </View>
          <View
            style={{
              backgroundColor: '#171717',
              width,
              height: 400,
              marginRight: 'auto',
              marginLeft: 'auto',
            }}>
              <TopTenGainers />
          </View>
          <View
            style={{
              backgroundColor: '#171717',
              width,
              height: 600,
              marginRight: 'auto',
              marginLeft: 'auto',
            }}>
            <Text style={{marginTop: 5, padding: 2.5}}>PRICE ACTION</Text>
          </View>
        </>
      )}
            <View>
        {(currentHomeSection === 'BTC' ||
            currentHomeSection === 'ETH' ||
            currentHomeSection === 'SOL') && (
            <Coin currentHomeSection={currentHomeSection} mainCoinsOption={mainCoinsOption}/>
          )}
      </View>
    </ScrollView>
  );
};

export default Home;
