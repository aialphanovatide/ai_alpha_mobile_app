import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import AlertDetails from './alertDetails';
import {getService} from '../../../../../../../services/aiAlphaApi';
import Loader from '../../../../../../Loader/Loader';

const AlertListComponent = ({botName, timeframe, styles}) => {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const limit =
      timeframe === '4h'
        ? 5
        : timeframe === 'today'
        ? 10
        : timeframe === 'this week'
        ? 20
        : 30;
    const fetchAlerts = async () => {
      try {
        const response = await getService(
          `/api/filter/alerts?coin=${botName}&date=${timeframe}&limit=${limit}`,
        );
        // console.log('Alerts response: ', response);
        if (
          response.length === 0 ||
          (response.message &&
            response.message.startsWith('No alerts found')) ||
          response.alerts.length === 0
        ) {
          setAlerts([]);
        } else {
          setAlerts(response.alerts);
        }
      } catch (error) {
        console.error('Error fetching alerts:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlerts();
  }, [timeframe, botName]);

  return (
    <ScrollView style={styles.alertListContainer}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <Loader />
        </View>
      ) : alerts.length === 0 ? (
        <Text style={styles.alertsTextMessage}>
          There aren't alerts to show
        </Text>
      ) : (
        alerts.map(alert => (
          <AlertDetails
            key={alert.alert_id}
            message={alert.alert_message}
            timeframe={alert.alert_name}
            price={alert.price}
            styles={styles}
          />
        ))
      )}
    </ScrollView>
  );
};

export default AlertListComponent;
