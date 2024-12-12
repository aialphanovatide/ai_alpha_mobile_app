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
import {useDispatch, useSelector} from 'react-redux';
import {
  selectActiveCoin,
  selectActiveSubCoin,
  selectCategories,
} from '../../actions/categoriesActions';
import {
  fetchAlertsByAllCategories,
  fetchAlertsByCoin,
  selectAlerts,
  selectAlertsLoading,
} from '../../actions/alertsActions';

// Component that renders the menu to switch between 'today' and 'this week' alert intervals.
const AlertMenu = ({options, activeOption, setActiveOption, styles, loading}) => {
  const button_width = 100 / options.length;
  return (
    <View style={styles.buttonContainer}>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          onPress={() => setActiveOption(option)}
          disabled={loading === 'idle' ? true : false}
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
  const styles = useAlertsStyles();
  const categories = useSelector(selectCategories);
  const alerts = useSelector(selectAlerts);
  const loading = useSelector(selectAlertsLoading);
  const dispatch = useDispatch();
  const ref = useRef(null);

  useScrollToTop(ref);

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
    Object.keys(activeCoin).length > 0
      ? dispatch(
          fetchAlertsByCoin({coins: botName, timeInterval: activeAlertOption}),
        )
      : dispatch(fetchAlertsByAllCategories({timeInterval: activeAlertOption}));
  }, [botName, activeAlertOption, activeCoin, dispatch]);

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

    if (currentOffset > 100) {
      hideHeader('TopMenu');
      hideHeader('SubMenu');
    } else if (currentOffset < 100) {
      showHeader('TopMenu');
      showHeader('SubMenu');
    }

    scrollOffset.current = currentOffset;
  }, 175);

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
          loading={loading}
        />
        {loading === 'idle' ? (
          // Display the loader if the data requests didn't finish
          <SkeletonLoader quantity={5} type="alerts" />
        ) : !loading !== 'idle' && alerts.length === 0 ? (
          // Display the disclaimer if there are no alerts
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
