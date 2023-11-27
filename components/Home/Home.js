/* eslint-disable prettier/prettier */
import {React, useEffect, useState} from 'react';
import {View, Dimensions, Text, TouchableOpacity} from 'react-native';
import CryptoTopMenu from '../CryptoTopMenu';
import TickerTape from '../Dashboard/TickerTape';
import {ScrollView} from 'react-native-gesture-handler';
import CoinSubMenu from '../CoinSubMenu';
import CryptoSubMenuOptions from '../CryptoSubMenuOptions';
import Coin from '../Sections/Coin';
import TopTenGainers from '../TopTenGainers';
import NonFundamentalCoin from '../Sections/NonFundamentalCoin';

// This component is the main "bus" of all the sections. It's the default section that renders when the app is loaded.

const Home = () => {
  // Device height and width control
  const {height, width} = Dimensions.get('window');
  // Main sections and packages for the main top menu
  const cryptocurrencies = [
    'BTC',
    'ETH',
    'RL',
    'BB',
    'CC',
    'XP',
    'LSD',
    'BL',
    'TN',
    'DDXP',
    'DDX',
    'DO',
    'IC'
  ];
  // Section state for the main top menu
  const [currentHomeSection, setCurrentHomeSection] = useState(null);
  // SubOptions and state for fundamental coins (BTC-ETH-SOL)
  const mainSubOptions = ['Fundamental', 'Charts', 'News'];
  const [mainCoinsOption, setMainCoinsOption] = useState(mainSubOptions[1]);
  // SubOptions for each non-fundamental currency
  const subOptions = {
    BTC: null,
    ETH: null,
    // Layer 0 - RootLink
    RL: ['ATOM', 'DOT', 'QNT'],
    // Layer 1 - Large Market Cap - BaseBlock
    BB: ['SOL', 'ADA', 'AVAX'],
    // Layer 1 - Mid Market Cap - CoreChain
    CC: ['NEAR', 'FTM', 'KAS'],
    // Crossborder Payments - XPayments
    XP: ['XRP','XLM', 'ALGO' ],
    LSD: ['LDO', 'RPL', 'FXS'],
    // Layer 2 - BoostLayer
    BL: ['ARB','MATIC','OP'],
    // Oracles - TruthNodes
    TN: ['LINK', 'API3', 'BAND'],
    DDXP: ['DYDX', 'GMX', 'VELO'],
    DDX: ['UNI', 'SUSHI', 'CAKE'],
    DO: ['AAVE', 'PENDLE', '1INCH'],
    // Artificial Intelligence - IntelliChain
    IC: ['FET','OCEAN', 'RNDR'],
  };
  // State to keep the trace of the subOptions with the selected package
  const [subMenuOptions, setSubMenuOptions] = useState(subOptions[0]);

  // Function to change the BTC-ETH-SOL section that is displaying
  const handleSubMenuOptionPress = option => {
    setMainCoinsOption(option);
    console.log(option);
  };

  return (
    <ScrollView
      style={{
        backgroundColor: '#DDE1E2',
        flex: 1,
        height,
      }}>
      <View>
        {
          // This is the first-top menu, with shows all the packages (fundamental and non-fundamentals) that are available for the user
        }
        <CryptoTopMenu
          cryptocurrencies={cryptocurrencies}
          currentHomeSection={currentHomeSection}
          setCurrentHomeSection={setCurrentHomeSection}
          setSubMenuOptions={setSubMenuOptions}
          subOptions={subOptions}
        />
      </View>
      {
        // This is the sub-menu that shows when BTC-ETH are touched, it displays the following three options [Fundamental-Charts-News]. Again, I think this component's name could be changed to one more representative.
      }
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
      {
        // Here is the another sub menu, for the other packages that doesnt are fundamentals. It receives the currencies to display and depends of the state of the top menu.
      }
      <View>
        {subMenuOptions &&
          (currentHomeSection !== 'BTC' ||
            currentHomeSection !== 'ETH' ||
            currentHomeSection !== 'SOL') && (
            <CoinSubMenu currencies={subMenuOptions} />
          )}
        {
          // This following code is the default elements displayed on the Home Section with no package selected (when app is loaded). This could be refactored into a new component.
        }
      </View>
      {currentHomeSection === null &&
        currentHomeSection !== 'BTC' &&
        currentHomeSection !== 'ETH' &&
        currentHomeSection !== 'SOL' && (
          <>
            <View
              style={{
                backgroundColor: '#A5ABAC',
                width: 600,
                height: 40,
                // marginTop: 20,
              }}>
              <TickerTape />
            </View>
            <View
              style={{
                backgroundColor: '#DDE1E2',
                width,
                height: 400,
                marginRight: 'auto',
                marginLeft: 'auto',
              }}>
              <Text
                style={{
                  marginTop: 5,
                  padding: 2.5,
                  color: '#5E6466',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                Top Stories
              </Text>
              <View
                style={{
                  alignItems: 'start',
                  justifyContent: 'start',
                  flex: 1,
                  backgroundColor: '#EFEFEF',
                }}>
                <View
                  style={{
                    width: 200,
                    height: '100%',
                    flexDirection: 'column',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      height: 33,
                      borderBottomWidth: 1,
                      borderColor: '#A5ABAC',
                    }}></View>
                  <View
                    style={{
                      flex: 1,
                      height: 33,
                      borderBottomWidth: 1,
                      borderColor: '#A5ABAC',
                    }}></View>
                  <View
                    style={{
                      flex: 1,
                      height: 33,
                      borderBottomWidth: 1,
                      borderColor: '#A5ABAC',
                    }}></View>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#EFEFEF',
                width,
                height: 100,
                marginTop: 10,
                marginRight: 'auto',
                marginLeft: 'auto',
              }}>
              <Text style={{marginTop: 5, padding: 2.5, color: '#5F6466', fontWeight: 'bold', fontSize: 18}}>
                Analysis
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#EFEFEF',
                width,
                height: 400,
                marginRight: 'auto',
                marginLeft: 'auto',
              }}>
              <TopTenGainers />
            </View>
            <View
              style={{
                backgroundColor: '#DDE1E2',
                width,
                height: 600,
                marginRight: 'auto',
                marginLeft: 'auto',
              }}>
              <Text style={{marginTop: 5, padding: 2.5, color:'#5E6466',}}>
                Price action
              </Text>
            </View>
          </>
        )}
      <View>
        {(currentHomeSection === 'BTC' ||
          currentHomeSection === 'ETH' ||
          currentHomeSection === 'SOL') && (
          <Coin
            currentHomeSection={currentHomeSection}
            mainCoinsOption={mainCoinsOption}
          />
        )}
      </View>
      <View>
        {currentHomeSection &&
          currentHomeSection !== 'BTC' &&
          currentHomeSection !== 'ETH' &&
          currentHomeSection !== 'SOL' && (
            <NonFundamentalCoin currentHomeSection={currentHomeSection} />
          )}
      </View>
    </ScrollView>
  );
};

export default Home;
