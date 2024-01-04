import React from 'react';
import {Text, View} from 'react-native';
import BackButton from '../BackButton/BackButton';
import AdvancedTvChart from '../Charts/AdvancedTvChart';
import useChartSectionStyles from './ChartSectionStyles';

const ChartSection = ({route, navigation}) => {
  const {title, widgetId, symbol} = route.params;
  const styles = useChartSectionStyles();
  return (
    <View style={styles.mainSection}>
      <BackButton />
      <Text style={styles.title}>{title}</Text>
      {/* <TradingViewChart
        symbol={symbol}
        widgetId={widgetId}
        width={400}
        height={500}
      /> */}
      {/* <NewTvChart
        symbol={symbol}
        widgetId={widgetId}
        width={350}
        height={500}
      /> */}
      <AdvancedTvChart
        symbol={symbol}
        widgetId={widgetId}
        width={350}
        height={500}
      />
    </View>
  );
};

export default ChartSection;
