import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import useAlertsStyles from './styles';
import {TopMenuContext} from '../../context/topMenuContext';
import {getService, postService} from '../../services/aiAlphaApi';
import AlertDetails from './AlertsDetails';
import Loader from '../Loader/Loader';
import TopMenu from '../Home/Topmenu/mainMenu/topmenu';
import SubMenu from '../Home/Topmenu/subMenu/SubMenu';
import UpgradeOverlay from '../UpgradeOverlay/UpgradeOverlay';
import {RevenueCatContext} from '../../context/RevenueCatContext';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../context/themeContext';
import {CategoriesContext} from '../../context/categoriesContext';
import {useScrollToTop} from '@react-navigation/native';

// Component that renders when there are no alerts on the server's response
const NoAlertsView = ({styles}) => (
  <View style={styles.noAlertsContainer}>
    <Text style={styles.noAlerts}>
      No alerts yet. Stay tuned for important updates!
    </Text>
  </View>
);

// Component that renders the menu to switch between 'today' and 'this week' alert intervals.
const AlertMenu = ({options, activeOption, setActiveOption, styles}) => {
  const button_width = 100 / options.length;
  return (
    <View style={styles.buttonContainer}>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          onPress={() => setActiveOption(option)}
          style={[
            styles.button,
            {width: `${button_width}%`},
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

// Component to display all the content, with the menu and the alerts fetched for each coin or for all the categories that the user has subscribed

const Alerts = ({route, navigation}) => {
  const options = ['1H', '4H', '1D', '1W'];
  const [activeAlertOption, setActiveAlertOption] = useState(options[0]);
  const [botName, setBotName] = useState(null);
  const [subscribed, setSubscribed] = useState(null);
  const [subscribedCategories, setSubscribedCategories] = useState([]);
  const {findCategoryInIdentifiers, userInfo} = useContext(RevenueCatContext);
  const {activeCoin, activeSubCoin} = useContext(TopMenuContext);
  const styles = useAlertsStyles();
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {isDarkMode} = useContext(AppThemeContext);
  const {categories} = useContext(CategoriesContext);
  const ref = useRef(null);

  useScrollToTop(ref);

  // Function to filter the alerts by the time interval date, for the case that the sections shows the subscriptions alerts, since it doesn't have a filter from the server side

  const filterAlertsByDate = (alerts, timeInterval) => {
    return alerts.filter(alert =>
      alert.alert_name.includes(timeInterval.toUpperCase()),
    );
  };

  // Use effect to load the current active coin from the route (when navigating from Home with an active coin) or from the bottom menu, in which case, there is not active coin. Also for the case where the coin switches from the alerts section
  useEffect(() => {
    setActiveAlertOption(options[0]);
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
  }, [activeCoin, activeSubCoin, route.params]);

  // This useEffect handles the content regulation with the user's subscriptions
  useEffect(() => {
    if (Object.keys(activeCoin).length !== 0) {
      const hasCoinSubscription = findCategoryInIdentifiers(
        activeCoin.category_name,
        userInfo.entitlements,
      );
      setSubscribed(hasCoinSubscription);
    } else {
      const found_subscribed_categories = [];
      categories?.forEach(category => {
        if (
          findCategoryInIdentifiers(
            category.category_name,
            userInfo.entitlements,
          )
        ) {
          found_subscribed_categories.push(category);
        }
      });
      // console.log('Found subscribed categories: ', found_subscribed_categories);
      setSubscribedCategories(found_subscribed_categories);
    }
  }, [activeCoin, userInfo]);

  // Use Effect to load the alerts, making different requests to the server depending on if there is an active coin or if its not, in which case, the request fetch alerts for all the categories that the user has subscribed
  useEffect(() => {
    setAlerts([]);
    setIsLoading(true);
    let alerts_date_filter;
    switch (activeAlertOption) {
      case '1H':
        alerts_date_filter = '1h';
        break;
      case '4H':
        alerts_date_filter = '4h';
        break;
      case '1D':
        alerts_date_filter = 'today';
        break;
      case '1W':
        alerts_date_filter = 'last week';
        break;
      default:
        alerts_date_filter = 'today';
        break;
    }
    // Function to fetch alerts filtering by the active coin of the top menu
    const fetchAlertsByCoin = async () => {
      try {
        const response = await getService(
          `/api/filter/alerts?coin=${botName}&date=${alerts_date_filter}&limit=${
            alerts_date_filter === 'last week' ? 40 : 20
          }`,
        );

        if (
          response.length === 0 ||
          response.message ||
          response.alerts.length === 0
        ) {
          setAlerts([]);
        } else {
          //console.log('Alerts: ', response.alerts);
          setAlerts(filterAlertsByDate(response.alerts, activeAlertOption));
        }
      } catch (error) {
        console.error('Error fetching alerts:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    // Function to fetch alerts for all the user's subscribed categories

    const fetchAlertsBySubscriptions = async () => {
      try {
        const body = subscribedCategories.map(category => category.category);
        const response = await postService(`/api/tv/multiple_alerts`, {
          categories: body,
        });
        if (!response.message || response.message === undefined) {
          const mapped_alerts = [];
          for (const key in response) {
            response[key].slice(0, 10).map(alert => mapped_alerts.push(alert));
          }
          // console.log(mapped_alerts);
          const filtered_alerts = filterAlertsByDate(
            mapped_alerts,
            activeAlertOption,
          );
          setAlerts(filtered_alerts);
        } else {
          setAlerts([]);
        }
      } catch (error) {
        console.error('Error fetching multiple alerts: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    Object.keys(activeCoin).length > 0
      ? fetchAlertsByCoin()
      : fetchAlertsBySubscriptions();
  }, [botName, activeAlertOption, activeCoin]);

  // Function to handle the alerts menu option switching
  const handleOptionChange = option => {
    setActiveAlertOption(option);
  };

  return (
    <SafeAreaView style={styles.mainContainer} ref={ref}>
      <LinearGradient
        useAngle={true}
        angle={45}
        colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
        style={{flex: 1}}>
        <TopMenu isAlertsMenu={true} />
        <SubMenu isAlertsMenu={true} />
        <Text style={styles.title}>Alerts</Text>
        <View style={styles.background}>
          <AlertMenu
            options={options}
            setActiveOption={handleOptionChange}
            styles={styles}
            activeOption={activeAlertOption}
          />
          {isLoading ? (
            // Display the loader if the data requests didn't finish
            <Loader />
          ) : subscribed || subscribedCategories.length > 0 ? (
            // If the user has at least one subscription, it will render alerts for all the coins from the categories that has subscribed
            <FlatList
              ref={ref}
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
          ) : (
            // If the user isn't subscribed to any package, it will display the overlay
            <UpgradeOverlay isBlockingByCoin={true} screen={'Alerts'} />
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};
export default Alerts;
