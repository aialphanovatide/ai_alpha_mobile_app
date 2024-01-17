import React, {useContext, useEffect, useState} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import useAlertsStyles from './styles';
import {TopMenuContext} from '../../context/topMenuContext';
import {postService} from '../../services/aiAlphaApi';
import AlertDetails from './AlertsDetails';
import Loader from '../Loader/Loader';
import TopMenu from '../Home/Topmenu/mainMenu/topmenu';
import SubMenu from '../Home/Topmenu/subMenu/SubMenu';
// This component render general alerts from each selected category
const NoAlertsView = ({styles}) => (
  <View style={styles.noAlertsContainer}>
    <Text style={styles.noAlerts}>
      No alerts yet. Stay tuned for important updates!
    </Text>
  </View>
);
const Alerts = ({route, navigation}) => {
  const [botName, setBotName] = useState(null);
  const {updateActiveSubCoin, activeCoin, activeSubCoin} =
    useContext(TopMenuContext);

  useEffect(() => {
    if (route.params) {
      const paramsBotName = route.params.botName;
      setBotName(paramsBotName);
    } else if (
      activeSubCoin &&
      activeSubCoin !== undefined &&
      activeCoin &&
      activeCoin !== undefined
    ) {
      const context_bot_name = activeSubCoin
        ? activeSubCoin
        : activeCoin.coin_bots[0].botName;
      setBotName(context_bot_name);
    }
    console.log(botName);
  }, [activeCoin, activeSubCoin]);

  const styles = useAlertsStyles();
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const requestBody = {
    botName: botName,
    dateOption: 'today',
  };
  useEffect(() => {
    requestBody.botName = botName;
    console.log(requestBody);
    const fetchGeneralAlerts = async () => {
      try {
        const response = await postService('/api/get/alerts', requestBody);
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
    fetchGeneralAlerts();
  }, [botName]);
  console.log('alerts: ', alerts);

  const handleCoinPress = coin => {
    updateActiveSubCoin(coin);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TopMenu isAlertsMenu={true} />
      <SubMenu isAlertsMenu={true} />
      <Text style={styles.title}>Alerts</Text>
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={alerts}
          renderItem={({item}) => (
            <AlertDetails
              key={item.alert_id}
              message={item.alert_message}
              timeframe={item.alert_name}
              price={item.price}
              styles={styles}
            />
          )}
          keyExtractor={item => item.alert_id.toString()}
          ListEmptyComponent={<NoAlertsView styles={styles} />}
        />
      )}
    </SafeAreaView>
  );
};
export default Alerts;
