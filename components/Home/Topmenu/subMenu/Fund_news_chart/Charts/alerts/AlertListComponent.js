import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import AlertDetails from './alertDetails';
import {getService} from '../../../../../../../services/aiAlphaApi';
import Loader from '../../../../../../Loader/Loader';

const AlertListComponent = ({botName, timeframe, styles}) => {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await getService(
          `/api/filter/alerts?coin=${botName}&date=${timeframe}`,
        );

        if (
          response.message &&
          response.message.startsWith('No alerts found')
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
    <View style={styles.container}>
      {isLoading ? (
        <Loader />
      ) : alerts.length === 0 ? (
        <Text style={styles.textMessage}>No alerts</Text>
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
