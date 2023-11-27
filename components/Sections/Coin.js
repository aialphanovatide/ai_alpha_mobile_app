import React from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import News from '../News/News';
import Fundamentals from '../Fundamentals';
import Slider from '../Slider';
import TradingViewChart from '../Dashboard/TradingViewChart';
// This component is for the three main Fundamental coins (BTC, ETH, SOL). Maybe its a good idea renaming this component to a more representative one.
const Coin = ({currentHomeSection, mainCoinsOption}) => {
  return (
    <ScrollView
      style={{
        width: 400,
        height: 500,
        backgroundColor: 'transparent',
        flex: 1,
      }}>
      <View>
        {
          // TODO - Fundamentals component
        }
        {mainCoinsOption === 'Fundamental' && (
          <View>
            <Fundamentals />
          </View>
        )}
        {mainCoinsOption === 'News' && (
          <>
            <View>
              <News />
            </View>
          </>
        )}
        {
          // TODO - Replace with the Charts component working.
        }
        {mainCoinsOption === 'Charts' && (
          <>
            <View
              style={{
                flex: 1,
                marginHorizontal: 10,
                width: 500,
                height: 500,
                backgroundColor: 'transparent',
              }}>
              <Text
                style={{
                  marginVertical: 15,
                  color: '#5F6466',
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'left',
                }}>
                Charts
              </Text>
              <View
                style={{
                  width: '80%',
                  height: '60%',
                }}>
                {/* <Slider />
                 */}
                <View
                  style={{
                    display: 'flex',
                    width: '600',
                    height: '400',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>API</Text>
                </View>
              </View>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Coin;
