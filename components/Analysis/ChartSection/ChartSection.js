import React, { useContext } from 'react';
import {SafeAreaView, Text} from 'react-native';
import BackButton from '../BackButton/BackButton';
import AdvancedTvChart from '../Charts/AdvancedTvChart';
import useChartSectionStyles from './ChartSectionStyles';
import LinearGradient from 'react-native-linear-gradient';
import { AppThemeContext } from '../../../context/themeContext';

const ChartSection = ({route, navigation}) => {
  const {title, widgetId, symbol, description} = route.params;
  const styles = useChartSectionStyles();
  const {isDarkMode} = useContext(AppThemeContext);
  return (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
      style={{flex: 1}}>
      <SafeAreaView style={styles.mainSection}>
        <BackButton />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.sectionDescription}>{description}</Text>
        <AdvancedTvChart
          symbol={symbol}
          widgetId={widgetId}
          width={350}
          height={500}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ChartSection;
