import React, {useContext} from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
import TickerTape from './Tickertape/TickerTape';
import styles from './HomeStyles';
import TopStories from './TopStories/topStories';
import Analysis from './Analysis/analysis';
import {TopMenuContext} from '../../context/topMenuContext';
import TopTenGainers from './TopTenGainers/TopTenGainers';
import PriceAction from './PriceAction/PriceAction';

const Home = () => {
  const {activeCoin} = useContext(TopMenuContext);

  return (
    <SafeAreaView>
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
    </SafeAreaView>
  );
};

export default Home;
