import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TopMenuContext } from '../../../context/topMenuContext';
import CandlestickChart from './Charts/chart';

const MainSection = () => {

    const { sharedData } = useContext(TopMenuContext);

  return (
    <View style={styles.container}>
      {/* <Text>{sharedData.data}</Text> */}
      <CandlestickChart symbol={'BTCUSDT'} interval={'30m'}/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#282828',
  },
});


export default MainSection;
