import React from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import News from '../News/News';
import Fundamentals from '../Fundamentals/Fundamentals';
import styles from './CoinStyles';

// This component is for the three main Fundamental coins (BTC, ETH, SOL). Maybe its a good idea renaming this component to a more representative one.
const Coin = ({currentHomeSection, mainCoinsOption}) => {
  return (
    <ScrollView style={styles.mainScrollView}>
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
          <View style={styles.chartsContainer}>
            <Text style={styles.chartsTitle}>Charts</Text>
            <View style={styles.apiContainer}>
              <Text>API</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Coin;
