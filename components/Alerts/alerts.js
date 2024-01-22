import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import useAlertsStyles from './styles';
import {TopMenuContext} from '../../context/topMenuContext';
import {postService} from '../../services/aiAlphaApi';
import AlertDetails from './AlertsDetails';
import Loader from '../Loader/Loader';
import TopMenu from '../Home/Topmenu/mainMenu/topmenu';
import SubMenu from '../Home/Topmenu/subMenu/SubMenu';
import UpgradeOverlay from '../UpgradeOverlay/UpgradeOverlay';
import {RevenueCatContext} from '../../context/RevenueCatContext';
// This component render general alerts from each selected category
const NoAlertsView = ({styles}) => (
  <View style={styles.noAlertsContainer}>
    <Text style={styles.noAlerts}>
      No alerts yet. Stay tuned for important updates!
    </Text>
  </View>
);

const AlertMenu = ({options, activeOption, setActiveOption, styles}) => {
  return (
    <View style={styles.buttonContainer}>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          onPress={() => setActiveOption(option)}
          style={[
            styles.button,
            activeOption === option ? styles.activeButton : null,
          ]}>
          <Text
            style={
              activeOption === option ? styles.activeText : styles.inactiveText
            }>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Alerts = ({route, navigation}) => {
  const options = ['today', 'this week', 'last week'];
  const [activeAlertOption, setActiveAlertOption] = useState(options[0]);
  const [botName, setBotName] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const {findCategoryInIdentifiers, userInfo} = useContext(RevenueCatContext);
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
  }, [activeCoin, activeSubCoin]);

  // This useEffect handles the content regulation
  useEffect(() => {
    const hasCoinSubscription = findCategoryInIdentifiers(
      activeCoin.category,
      userInfo.entitlements,
    );
    setSubscribed(hasCoinSubscription);
  }, [activeCoin, userInfo]);

  const styles = useAlertsStyles();
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const requestBody = {
    botName: botName,
    dateOption: activeAlertOption,
  };
  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
    }
    requestBody.botName = botName;
    requestBody.dateOption = activeAlertOption;
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
  }, [botName, activeAlertOption]);

  const handleOptionChange = option => {
    setActiveAlertOption(option);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TopMenu isAlertsMenu={true} />
      <SubMenu isAlertsMenu={true} />
      <Text style={styles.title}>Alerts</Text>
      {isLoading ? (
        <Loader />
      ) : subscribed ? (
        <View style={styles.background}>
          <AlertMenu
            options={options}
            setActiveOption={handleOptionChange}
            styles={styles}
            activeOption={activeAlertOption}
          />
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
        </View>
      ) : (
        <View style={styles.background}>
          <UpgradeOverlay isBlockingByCoin={true} screen={'Alerts'} />
        </View>
      )}
    </SafeAreaView>
  );
};
export default Alerts;
