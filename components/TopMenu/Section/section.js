import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TopMenuContext } from '../../../context/topMenuContext';
import CryptoChart from './Charts/chart';

const MainSection = () => {

    const { sharedData } = useContext(TopMenuContext);

  return (
    <View style={styles.container}>
      <Text>{sharedData.data}</Text>
      {/* <CryptoChart symbol={'BTCUSDT'} interval={'1m'} resistances={[38000, 38700]} supports={[37000]}/> */}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});


export default MainSection;
