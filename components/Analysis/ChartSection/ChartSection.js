import React from 'react';
import {Text, View} from 'react-native';
import BackButton from '../BackButton/BackButton';
import styles from './ChartSectionStyles';
import NewTvChart from '../Charts/NewTvChart';

const ChartSection = ({title, symbol, widgetId, handleReturn}) => {


  return (
    <View style={styles.mainSection}>
      <BackButton handleReturn={handleReturn} />
      <Text style={styles.title}>{title}</Text>
      {/* <TradingViewChart
        symbol={symbol}
        widgetId={widgetId}
        width={400}
        height={500}
      /> */}
      <NewTvChart symbol={symbol} widgetId={widgetId} width={350} height={500}/>
    </View>
  );
};

export default ChartSection;
