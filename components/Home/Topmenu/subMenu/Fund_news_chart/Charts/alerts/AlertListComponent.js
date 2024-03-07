import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import AlertDetails from './alertDetails';
import {
  getService,
} from '../../../../../../../services/aiAlphaApi';
import Loader from '../../../../../../Loader/Loader';

const AlertListComponent = ({botName, timeframe, styles}) => {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchAlerts = async () => {
      try {
        const response = await getService(
          `/api/filter/alerts?coin=${botName}&date=${timeframe}`,
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
          setAlerts(response.alerts.slice(0, 30));
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
    <View style={styles.alertListContainer}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <Loader />
        </View>
      ) : alerts.length === 0 ? (
        <Text style={styles.alertsTextMessage}>
          No alerts yet. Stay tuned for important updates!
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
    </View>
  );
};

export default AlertListComponent;
