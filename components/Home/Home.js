import React, { useContext } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import TickerTape from './Tickertape/TickerTape';
import styles from './HomeStyles';
import TopStories from './TopStories/topStories';
import Analysis from './Analysis/analysis';
import { TopMenuContext } from '../../context/topMenuContext';
import MainSection from '../TopMenu/Section/section';

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
 
     </ScrollView> : <MainSection />
  );
};


export default Home;


