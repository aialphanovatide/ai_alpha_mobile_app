import React, {useContext} from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
import TickerTape from './Tickertape/TickerTape';
import TopStories from './TopStories/topStories';
import Analysis from './Analysis/analysis';
import {TopMenuContext} from '../../context/topMenuContext';
import TopTenGainers from './TopTenGainers/TopTenGainers';
import PriceAction from './PriceAction/PriceAction';
import ThemeButton from '../ThemeButton/ThemeButton';
import useHomeStyles from './HomeStyles';

const Home = () => {
  const {activeCoin} = useContext(TopMenuContext);
  const styles = useHomeStyles();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        bounces={false}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}>
        <TickerTape />
        <TopStories />
        <Analysis />
        <TopTenGainers />
        <PriceAction />
      </ScrollView>
      <ThemeButton />
    </SafeAreaView>
  );
};

export default Home;
