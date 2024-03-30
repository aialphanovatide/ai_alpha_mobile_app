import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import AlertDetails from './alertDetails';
import {getService} from '../../../../../../../services/aiAlphaApi';
import Loader from '../../../../../../Loader/Loader';

const AlertListComponent = ({botName, timeframe, styles}) => {

  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  // Fetches the alerts
  useEffect(() => {
  setIsLoading(true);

    // Determine the limit based on the selected timeframe
    let limit;
    if (timeframe === '4h') {
      limit = 5;
    } else if (timeframe === 'today') {
      limit = 5;
    } else if (timeframe === 'this week') {
      limit = 20;
    } else {
      limit = 30; // Default limit
    }

    const fetchAlerts = async () => {
      try {
        // Fetch alerts based on coin, date, and limit
        const response = await getService(
          `/api/filter/alerts?coin=${botName}&date=${timeframe}&limit=${limit}`
        );

        // Check if response is empty or contains no alerts
        if (
          response.length === 0 ||
          (response.message && response.message.startsWith('No alerts found')) ||
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

    // Call fetchAlerts function
    fetchAlerts();
  }, [timeframe, botName]);


  return (
    <ScrollView
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
      style={styles.alertListContainer}
    >
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <Loader />
        </View>
      ) : alerts.length === 0 ? (
        <Text style={styles.alertsTextMessage}>
          There aren't any alerts to show
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
