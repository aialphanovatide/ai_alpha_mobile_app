import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TopMenuContext} from '../../../../context/topMenuContext';
import CoinMenu from './coinMenu/coinMenu';
import CandlestickChart from './Fund_news_chart/Charts';
import Fundamentals from './Fund_news_chart/Fundamentals/Fundamentals';

const SubMenu = () => {
  const {activeCoin} = useContext(TopMenuContext);
  const [activeTab, setActiveTab] = useState('Charts');

  useEffect(() => {
    if (activeCoin.subMenuOptions && activeCoin.subMenuOptions.length > 0) {
      setActiveSubCoin(activeCoin.subMenuOptions[0].coin);
    }
  }, [activeCoin]);

  const [activeSubCoin, setActiveSubCoin] = useState(
    activeCoin.subMenuOptions && activeCoin.subMenuOptions[0].coin,
  );

  const coinToShowInChart =
    activeCoin.subMenuOptions === null ? activeCoin.icon : activeSubCoin;
  console.log('activeSubCoin: ', activeSubCoin);
  console.log('activeTab: ', activeTab);

  return (
    <View style={styles.container}>
      <CoinMenu
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeSubCoin={activeSubCoin}
        setActiveSubCoin={setActiveSubCoin}
        subCoins={activeCoin.subMenuOptions}
      />

      {/* Add fundamentals and news here */}
      {activeTab === 'Charts' && (
        <CandlestickChart interval={'1h'} symbol={`${coinToShowInChart}USDT`} />
      )}
      {activeTab === 'Fundamentals' && <Fundamentals />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
});

export default SubMenu;
