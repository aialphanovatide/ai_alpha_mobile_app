import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import styles from './alertStyles';
import { TopMenuContext } from '../../context/topMenuContext';
import { postService } from '../../services/aiAlphaApi';
import AlertDetails from './alertItem';
import Loader from '../Loader/Loader';

// This component render general alerts from each selected category

const NoAlertsView = () => (
  <View style={styles.noAlertsContainer}>
    <Text style={styles.noAlerts}>No alerts yet. Stay tuned for important updates!</Text>
  </View>
);


const GeneralAlertsView = ({ botName = 'eth' }) => {

  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { activeCoin } = useContext(TopMenuContext);

  const requestBody = {
    botName: botName,
    dateOption: 'today',
  };

  useEffect(() => {
    const fetchGeneralAlerts = async () => {
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

    fetchGeneralAlerts();
  }, [botName]);

  console.log('alerts: ', alerts)


  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.title}>Alerts</Text>
      {
        isLoading ? <Loader /> :
          <FlatList
            data={alerts}
            renderItem={({item}) =>
              <AlertDetails
                key={item.alert_id}
                message={item.alert_message}
                timeframe={item.alert_name}
                price={item.price}
              />}
              keyExtractor={(item) => item.alert_id.toString()}            ListEmptyComponent={<NoAlertsView />}
        />
      }
    </SafeAreaView>
  );
};

export default GeneralAlertsView;