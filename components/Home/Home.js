import React, { useContext } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import TickerTape from './Tickertape/TickerTape';
import styles from './HomeStyles';
import TopStories from './TopStories/topStories';
import Analysis from './Analysis/analysis';
import { TopMenuContext } from '../../context/topMenuContext';
import MainSection from '../TopMenu/Section/section';
import TopTenGainers from './TopTenGainers/TopTenGainers';
import PriceAction from './PriceAction/PriceAction';

const Home = () => {

  const { sharedData } = useContext(TopMenuContext);
  

  return (
    sharedData.active === false?
     <ScrollView 
     bounces={false}
     alwaysBounceVertical={false}
     showsVerticalScrollIndicator={false} 
     style={styles.container}>
       
       <TickerTape />
       <TopStories/>
       <Analysis/>
       <TopTenGainers />
       <PriceAction />
 
     </ScrollView> : <MainSection />
  );
};


export default Home;


