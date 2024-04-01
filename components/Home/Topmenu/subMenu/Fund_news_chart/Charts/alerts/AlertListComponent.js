import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import AlertDetails from './alertDetails';
import {getService} from '../../../../../../../services/aiAlphaApi';
import Loader from '../../../../../../Loader/Loader';

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

    let alerts_date_filter;
    switch (timeframe) {
      case '1h':
        alerts_date_filter = '1h';
        break;
      case '4h':
        alerts_date_filter = '4h';
        break;
      case '1d':
        alerts_date_filter = 'today';
        break;
      case '1w':
        alerts_date_filter = 'last week';
        break;
      default:
        alerts_date_filter = 'today';
        break;
    }

    const fetchAlerts = async () => {
      setAlerts([]);
      setIsLoading(true);

      try {
        // Fetch alerts based on coin, date, and limit
        const response = await getService(
          `/api/filter/alerts?coin=${botName}&date=${alerts_date_filter}&limit=${
            alerts_date_filter === 'last week' ? 40 : 20
          }`,
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
