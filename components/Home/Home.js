import React, { useContext } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import TickerTape from './Tickertape/TickerTape';
import styles from './HomeStyles';
import TopStories from './TopStories/topStories';
import Analysis from './Analysis/analysis';
import { TopMenuContext } from '../../context/topMenuContext';
import TopTenGainers from './TopTenGainers/TopTenGainers';
import PriceAction from './PriceAction/PriceAction';
import TopMenu from './Topmenu/mainMenu/topmenu';
import SubMenu from './Topmenu/subMenu';

const Home = () => {

  const { activeCoin } = useContext(TopMenuContext);
  const hasProperties = Object.keys(activeCoin).length > 0;

  console.log('hasProperties: ', hasProperties)

  return (
    <View>
      <TopMenu />
      {
        hasProperties ?
          <SubMenu/> :
          <ScrollView
            bounces={false}
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            <TickerTape />
            <TopStories />
            <Analysis />
            <TopTenGainers />
            <PriceAction />

          </ScrollView>
      }

    </View>

  );
};


export default Home;


