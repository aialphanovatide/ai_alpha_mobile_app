import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {
  getHTMLTestService,
  getTestService,
} from '../../../../../../../services/aiAlphaApi';

const ChartWidget = () => {
  const [widgetData, setWidgetData] = useState([]);

  const fetchChartWidgetData = async () => {
    try {
      const data = await getHTMLTestService(
        'chart/widget?symbol=ETHUSDT&interval=1w',
      );
      //   console.log('Data fetched from widget charts endpoint: ', data);
      setWidgetData(data);
    } catch (error) {
      console.error('Error trying to fetch the chart widget data: ', error);
    }
  };

  useEffect(() => {
    fetchChartWidgetData();
  }, []);

  return (
    <View style={styles.container}>
      {widgetData.length === 0 ? null : (
        <WebView
          originWhitelist={['*']}
          source={{html: widgetData}}
          style={{flex: 1}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 400,
  },
});

export default ChartWidget;
