import React, {useContext, useState} from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
import TickerTape from './Tickertape/TickerTape';
import TopStories from './TopStories/topStories';
import Analysis from './Analysis/analysis';
import {TopMenuContext} from '../../context/topMenuContext';
import TopTenGainers from './TopTenGainers/TopTenGainers';
import PriceAction from './PriceAction/PriceAction';
import useHomeStyles from './HomeStyles';
import SkeletonLoader from '../Loader/SilhouetteLoader/SilhouetteLoader';

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
        <SkeletonLoader />
        <TopStories />
        <Analysis />
        <TopTenGainers />
        <PriceAction />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
