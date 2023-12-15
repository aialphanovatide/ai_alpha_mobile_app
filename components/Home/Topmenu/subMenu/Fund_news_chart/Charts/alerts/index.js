import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AlertDetails from './alertDetails';
import { postService } from '../../../../../../../services/aiAlphaApi';
import Loader from '../../../../../../Loader/Loader';

const AlertListComponent = ({ botName, timeframe }) => {
    const [alerts, setAlerts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    const requestBody = {
      botName: botName,
      dateOption: timeframe,
    };


  
    useEffect(() => {
      const fetchAlerts = async () => {
        try {
          const response = await postService('/api/get/alerts', requestBody);
          
          if (response.message && response.message.startsWith("No alerts found")) {
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
          alerts.map((alert) => (
            <AlertDetails
              key={alert.alert_id}
              message={alert.alert_message}
              timeframe={alert.alert_name}
              price={alert.price}
            />
          ))
        )}
      </View>
    );
  };
  
  export default AlertListComponent;


const styles = StyleSheet.create({
    container: {
     justifyContent: 'center',
     alignItems: 'center',
     width: '100%',
     marginVertical: 20
    },
    textMessage: {
      minHeight: 100
    }
  }
)