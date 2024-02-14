import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import BackButton from '../BackButton/BackButton';
import AdvancedTvChart from '../Charts/AdvancedTvChart';
import useChartSectionStyles from './ChartSectionStyles';

const ChartSection = ({route, navigation}) => {
  const {title, widgetId, symbol, description} = route.params;
  const styles = useChartSectionStyles();
  return (
    <SafeAreaView style={styles.mainSection}>
      <BackButton />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.sectionDescription}>
        {description}
      </Text>
      <AdvancedTvChart
        symbol={symbol}
        widgetId={widgetId}
        width={350}
        height={500}
      />
    </SafeAreaView>
  );
};

export default ChartSection;
