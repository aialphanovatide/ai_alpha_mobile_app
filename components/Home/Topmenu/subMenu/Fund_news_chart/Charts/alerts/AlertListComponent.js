import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import AlertDetails from './alertDetails';
import {getService} from '../../../../../../../services/aiAlphaApi';
import Loader from '../../../../../../Loader/Loader';
import SkeletonLoader from '../../../../../../Loader/SkeletonLoader';

const AlertListComponent = ({botName, timeframe, styles}) => {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter the alerts by the alert date, finding the alert names that includes the selected time interval
  const filterAlertsByDate = (alerts, timeInterval) => {
    return alerts.filter(alert =>
      alert.alert_name.includes(timeInterval.toUpperCase()),
    );
  };

  // Fetches the alerts
  useEffect(() => {
    setIsLoading(true);

    const fetchAlerts = async () => {
      setAlerts([]);
      setIsLoading(true);

      try {
        // Fetch alerts based on coin, date, and limit
        const response = await getService(
          `/api/filter/alerts?coin=${botName}&date=24h&limit=${25}`,
        );

        // Check if response is empty or contains no alerts
        if (
          response.message ||
          response.length === 0 ||
          response.alerts.length === 0
        ) {
          setAlerts([]);
        } else {
          const filtered_alerts = filterAlertsByDate(
            response.alerts,
            timeframe,
          );
          setAlerts(filtered_alerts);
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
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
      style={styles.alertListContainer}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <SkeletonLoader type="alerts" quantity={3} />
        </View>
      ) : alerts.length === 0 ? (
        <Text style={styles.alertsTextMessage}>
          There aren't any alerts to show
        </Text>
      ) : (
        alerts.map(alert => (
          <AlertDetails
            key={alert.alert_id}
            date={alert.created_at}
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
