import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import useAlertsStyles from './styles';
import {getService, postService} from '../../services/aiAlphaApi';
import AlertDetails from './AlertItem';
import TopMenu from '../Home/Topmenu/mainMenu/topmenu';
import SubMenu from '../Home/Topmenu/subMenu/SubMenu';
import UpgradeOverlay from '../UpgradeOverlay/UpgradeOverlay';
import {RevenueCatContext} from '../../context/RevenueCatContext';
import {useScrollToTop} from '@react-navigation/native';
import SkeletonLoader from '../Loader/SkeletonLoader';
import BackgroundGradient from '../BackgroundGradient/BackgroundGradient';
import NoContentDisclaimer from '../NoContentDisclaimer/NoContentDisclaimer';
import {HeaderVisibilityContext} from '../../context/HeadersVisibilityContext';
import {throttle} from 'lodash';
import {useSelector} from 'react-redux';
import {
  selectActiveCoin,
  selectActiveSubCoin,
  selectCategories,
} from '../../actions/categoriesActions';

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

// Component to display all the content, with the menu and the alerts fetched for each coin or for all the categories that the user has subscribed. It receives the route and navigation props. It returns a view with the alerts and the menu to switch between the time intervals. It also displays a loader while the data is being fetched. If there are no alerts, it displays a Disclaimer component to the user.

const Alerts = ({route, navigation}) => {
  const options = ['1H', '4H', '1D', '1W'];
  const activeCoin = useSelector(selectActiveCoin);
  const activeSubCoin = useSelector(selectActiveSubCoin);
  const [activeAlertOption, setActiveAlertOption] = useState(options[1]);
  const [botName, setBotName] = useState(null);
  const [hasSubscription, setHasSubscription] = useState(null);
  const [subscribedCategories, setSubscribedCategories] = useState([]);
  const {findCategoryInIdentifiers, userInfo, subscribed} =
    useContext(RevenueCatContext);
  // const {activeCoin, activeSubCoin} = useContext(TopMenuContext);
  const styles = useAlertsStyles();
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const categories = useSelector(selectCategories);
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
      let hasCoinSubscription = findCategoryInIdentifiers(
        activeCoin.category_name,
        userInfo.entitlements,
      );
      if (subscribed) {
        hasCoinSubscription = true;
      }
      setHasSubscription(hasCoinSubscription);
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
      setSubscribedCategories(found_subscribed_categories);
      setHasSubscription(subscribed);
    }
  }, [activeCoin, userInfo]);

  // Use Effect to load the alerts, making different requests to the server depending on if there is an active coin or if its not, in which case, the request fetch alerts for all the categories that the user has subscribed
  useEffect(() => {
    setAlerts([]);
    setIsLoading(true);
    // Function to fetch alerts filtering by the active coin of the top menu
    const fetchAlertsByCoin = async () => {
      try {
        const response = await getService(
          `/api/filter/alerts?coin=${botName}&date=${activeAlertOption.toLowerCase()}&limit=${25}`,
        );

        if (
          response.length === 0 ||
          response.message ||
          response.alerts.length === 0
        ) {
          setAlerts([]);
        } else {
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
        const response = await postService(
          `/api/tv/multiple_alert?date=${activeAlertOption.toLowerCase()}&limit=${25}`,
          {
            categories: body,
          },
        );
        if (!response.message || response.message === undefined) {
          const mapped_alerts = [];
          for (const key in response) {
            response[key].slice(0, 10).map(alert => mapped_alerts.push(alert));
          }
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

  // Functions to handle the scrolling interaction that hides the menu

  const {showHeader, hideHeader} = useContext(HeaderVisibilityContext);
  const scrollOffset = useRef(0);
  const scrollViewRef = useRef(null);

  const handleScroll = throttle(event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const diff = currentOffset - scrollOffset.current;

    if (diff > 20 && currentOffset > 20) {
      hideHeader('TopMenu');
      hideHeader('SubMenu');
    } else if (diff < -40) {
      showHeader('TopMenu');
      showHeader('SubMenu');
    }

    scrollOffset.current = currentOffset;
  }, 350);

  const onScroll = event => {
    event.persist();
    handleScroll(event);
  };

  return (
    <SafeAreaView style={styles.mainContainer} ref={ref}>
      <BackgroundGradient />
      <TopMenu isAlertsMenu={true} />
      <SubMenu isAlertsMenu={true} />
      <Text style={styles.title}>Alerts</Text>
      <ScrollView
        style={styles.background}
        nestedScrollEnabled={true}
        ref={scrollViewRef}
        onScroll={onScroll}
        scrollEventThrottle={16}>
        <AlertMenu
          options={options}
          setActiveOption={handleOptionChange}
          styles={styles}
          activeOption={activeAlertOption}
        />
        {isLoading ? (
          // Display the loader if the data requests didn't finish
          <SkeletonLoader quantity={5} type="alerts" />
        ) : !isLoading && alerts.length === 0 ? (
          <NoContentDisclaimer
            title={'Whoops, no matches.'}
            description={
              "We couldn't find any search results.\nGive it another go."
            }
          />
        ) : (
          <View>
            {alerts.map(item => {
              return (
                <AlertDetails
                  key={item.alert_id}
                  message={item.alert_message}
                  timeframe={item.alert_name}
                  price={item.price}
                  styles={styles}
                  created_at={item.created_at}
                />
              );
            })}
          </View>
          // <FlatList
          //   ref={ref}
          //   data={alerts}
          //   renderItem={({item}) => (
          //     <AlertDetails
          //       key={item.alert_id}
          //       message={item.alert_message}
          //       timeframe={item.alert_name}
          //       price={item.price}
          //       styles={styles}
          //       created_at={item.created_at}
          //     />
          //   )}
          //   keyExtractor={item => item.alert_id.toString()}
          //   ListEmptyComponent={
          //     <NoContentDisclaimer
          //       title={'Whoops, no matches.'}
          //       description={
          //         "We couldn't find any search results.\nGive it another go."
          //       }
          //     />
          //   }
          // />
        )}
      </ScrollView>
      {hasSubscription ? (
        <></>
      ) : (
        <UpgradeOverlay subscribed={subscribedCategories || hasSubscription} />
      )}
    </SafeAreaView>
  );
};
export default Alerts;
