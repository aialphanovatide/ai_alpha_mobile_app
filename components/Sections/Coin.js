import React from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import News from '../News';
import Fundamentals from '../Fundamentals';

const Coin = ({currentHomeSection, mainCoinsOption}) => {
  return (
    <ScrollView
      style={{
        width: 400,
        height: 500,
        backgroundColor: '#444',
        flex: 1,
      }}>
      <View>
        <Text>{currentHomeSection}</Text>
      </View>
      <View>
        <Text>{mainCoinsOption}</Text>
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
            <View>
              <News />
            </View>
            <View>
              <News />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Coin;
