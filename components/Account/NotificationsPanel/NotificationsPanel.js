import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useNotificationsStyles from './NotificationsStyles';
import BackButton from '../../Analysis/BackButton/BackButton';
import {AppThemeContext} from '../../../context/themeContext';
import {RevenueCatContext} from '../../../context/RevenueCatContext';
import messaging from '@react-native-firebase/messaging';

const founders_static_identifiers = [
  'baseblock_4999_m1',
  'bitcoin_4999_m1',
  'boostlayer_4999_m1',
  'corechain_4999_m1',
  'cycleswap_4999_m1',
  'diversefi_4999_m1',
  'ethereum_4999_m1',
  'intellichain_4999_m1',
  'lsds_4999_m1',
  'nextrade_4999_m1',
  'rootlink_4999_m1',
  'truthnodes_4999_m1',
  'xpayments_4999_m1',
];

const NotificationItem = ({
  item,
  styles,
  isActive,
  isAnalysisActive,
  theme,
  isDarkMode,
  hasImage,
  onToggle,
  onAnalysisToggle,
  hasSubscription,
}) => (
  <View style={styles.itemContainer}>
    {hasImage && (
      <Image
        style={styles.iconImage}
        resizeMode="contain"
        source={
          isDarkMode
            ? isActive
              ? item.iconImage.dark.active
              : item.iconImage.dark.inactive
            : isActive
            ? item.iconImage.light.active
            : item.iconImage.light.inactive
        }
      />
    )}
    <Text style={styles.itemName}>{item.name}</Text>
    <View style={styles.rightContent}>
      <View
        style={styles.switchContainer}
        key={`${item.name}_analysis_toggler`}>
        <Switch
          style={styles.switch}
          trackColor={{true: '#52DD8D', false: '#D9D9D9'}}
          ios_backgroundColor={theme.notificationsSwitchColor}
          thumbColor={'#F6F7FB'}
          value={isAnalysisActive}
          onValueChange={onAnalysisToggle}
          disabled={!hasSubscription}
        />
      </View>
      <View style={styles.switchContainer} key={`${item.name}_alerts_toggler`}>
        <Switch
          style={styles.switch}
          trackColor={{true: '#52DD8D', false: '#D9D9D9'}}
          ios_backgroundColor={theme.notificationsSwitchColor}
          thumbColor={'#F6F7FB'}
          value={isActive}
          onValueChange={onToggle}
          disabled={!hasSubscription}
        />
      </View>
    </View>
  </View>
);

const NotificationsPanel = ({route, options = null}) => {
  const {isDarkMode, theme} = useContext(AppThemeContext);
  const styles = useNotificationsStyles();
  const {packages, userInfo} = useContext(RevenueCatContext);
  const [subscriptions, setSubscriptions] = useState({});
  const [userSubscriptions, setUserSubscriptions] = useState({});
  const [hasFoundersSubscription, setHasFoundersSubscription] = useState(false);
  const [analysisNotifications, setAnalysisNotifications] = useState({});

  useEffect(() => {
    const loadSubscriptionStates = async () => {
      try {
        const initialSubscriptions = {};
        const initialAnalysisNotifications = {};
        for (const option of options || route.params.options) {
          const storedStatus = await AsyncStorage.getItem(
            `@subscription_${option.identifier}`,
          );
          const analysisStoredStatus = await AsyncStorage.getItem(
            `@subscription_analysis_${option.identifier}`,
          );
          initialSubscriptions[option.identifier] = storedStatus === 'true';
          initialAnalysisNotifications[option.identifier] =
            analysisStoredStatus === 'true';
        }
        console.log('* Loaded initial subscriptions:', initialSubscriptions);
        setSubscriptions(initialSubscriptions);
        setAnalysisNotifications(initialAnalysisNotifications);
      } catch (error) {
        console.error('Failed to load subscription states:', error);
      }
    };

    loadSubscriptionStates();
  }, [options]);

  useEffect(() => {
    const updateUserSubscriptions = async () => {

      try {
        console.log('userInfo:', userInfo);
        console.log('Packages:', packages);

        const hasFounders =
          userInfo?.entitlements.find(subscription =>
            subscription.toLowerCase().includes('founders'),
          ) !== undefined;

        const purchasedPackages = packages.filter(item =>
          userInfo?.entitlements.includes(item.product.identifier),
        );

        const productIdentifiers = purchasedPackages.map(
          item => item.product.identifier,
        );
        console.log('Purchased product identifiers:', productIdentifiers);

        const userSubscriptionsStatus = {...userSubscriptions};

        console.log('* Purchased product identifiers:', productIdentifiers);

        const newSubscriptions = {...subscriptions};
        const newAnalysisNotifications = {...analysisNotifications};

        if (hasFounders) {
          for (const id of founders_static_identifiers) {
            const storedStatus = await AsyncStorage.getItem(
              `@subscription_${id}`,
            );
            const analysisStoredStatus = await AsyncStorage.getItem(
              `@subscription_analysis_${id}`,
            );
            console.log(
              '[FOUNDERS] storedStatus->',
              storedStatus,
              'for->',
              `@subscription_${id}`,
            );
            console.log(
              '[FOUNDERS] storedStatus type->',
              typeof storedStatus,
              'for->',
              `@subscription_${id}`,
            );

            // Conditional to activate a new suscription for the alerts notifications

            if (storedStatus === 'null') {
              console.log(
                '[FOUNDERS] Activating the alerts notifications for the first time',
              );
              await AsyncStorage.setItem(`@subscription_${id}`, 'true');
              newSubscriptions[id] = true;
              console.log('Subscribing to new topic:', id);
              await messaging().subscribeToTopic(id);
            } else {
              newSubscriptions[id] = storedStatus === 'true';
            }

            // Conditional to activate a new suscription for the analysis notifications

            if (analysisStoredStatus === 'null') {
              console.log(
                '[FOUNDERS] Activating the analysis notifications for the first time',
              );
              await AsyncStorage.setItem(
                `@subscription_analysis_${id}`,
                'true',
              );
              newAnalysisNotifications[id] = true;
              console.log('Subscribing to new analysis topic:', id);
              await messaging().subscribeToTopic(`${id}_analysis`);
            } else {
              newAnalysisNotifications[id] = analysisStoredStatus === 'true';
            }

            userSubscriptionsStatus[id] = true;
          }
        } else {
          for (const id of productIdentifiers) {
            const storedStatus = await AsyncStorage.getItem(
              `@subscription_${id}`,
            );
            const analysisStoredStatus = await AsyncStorage.getItem(
              `@subscription_analysis_${id}`,
            );
            console.log(
              'storedStatus->',
              storedStatus,
              'for->',
              `@subscription_${id}`,
            );
            console.log(
              'storedStatus type->',
              typeof storedStatus,
              'for->',
              `@subscription_${id}`,
            );

            // Conditional to activate a new suscription for the alerts notifications

            if (storedStatus === 'null') {
              console.log(
                'Activating the alerts notifications for the first time',
              );
              await AsyncStorage.setItem(`@subscription_${id}`, 'true');
              newSubscriptions[id] = true;
              console.log('Subscribing to new topic:', id);
              await messaging().subscribeToTopic(id);
            } else {
              newSubscriptions[id] = storedStatus === 'true';
            }

            // Conditional to activate a new suscription for the analysis notifications

            if (analysisStoredStatus === 'null') {
              console.log(
                'Activating the analysis notifications for the first time',
              );
              await AsyncStorage.setItem(
                `@subscription_analysis_${id}`,
                'true',
              );
              newAnalysisNotifications[id] = true;
              console.log('Subscribing to new analysis topic:', id);
              await messaging().subscribeToTopic(`${id}_analysis`);
            } else {
              newAnalysisNotifications[id] = analysisStoredStatus === 'true';
            }

            userSubscriptionsStatus[id] = true;
          }
        }

        const expiredSubscriptions = Object.keys(subscriptions).filter(
          id => !productIdentifiers.includes(id),
        );
        for (const id of expiredSubscriptions) {
          userSubscriptionsStatus[id] = false;
          await AsyncStorage.setItem(`@subscription_${id}`, 'null');
          await AsyncStorage.setItem(`@subscription_analysis_${id}`, 'null');
          newSubscriptions[id] = false;
          newAnalysisNotifications[id] = false;
          // handleToggleSubscription(id, false);
          // handleToggleAnalysisNotifications(id, false);
        }

        setAnalysisNotifications(newAnalysisNotifications);
        setUserSubscriptions(userSubscriptionsStatus);
        setSubscriptions(newSubscriptions);
        setHasFoundersSubscription(
          userInfo?.entitlements.find(subscription =>
            subscription.includes('Founders'),
          ) !== undefined,
        );
        console.log('* Updated user subscriptions:', userSubscriptionsStatus);
        console.log('* Current alerts notifications state:', newSubscriptions);
        console.log(
          '* Current analysis notifications state:',
          newAnalysisNotifications,
        );
      } catch (error) {
        console.error('Failed to update user subscriptions:', error);
      }
    };

    updateUserSubscriptions();
  }, [packages, userInfo]);

  // Handler function to toggle the state of the alerts notifications, switching the stored state to true or false, and subscribing or unsubscribing the user from the alerts topic.

  const handleToggleSubscription = async (topic, initial = false) => {
    try {
      const isSubscribed = subscriptions[topic];
      if (isSubscribed && !initial) {
        console.log('* Unsubscribing from:', topic);
        await messaging().unsubscribeFromTopic(topic);
      } else {
        console.log('* Subscribing to:', topic);
        await messaging().subscribeToTopic(topic);
      }
      const newSubscriptions = {
        ...subscriptions,
        [topic]: initial ? true : !isSubscribed,
      };
      setSubscriptions(newSubscriptions);
      await AsyncStorage.setItem(
        `@subscription_${topic}`,
        (initial ? true : !isSubscribed).toString(),
      );
      console.log(
        '* Toggled subscription for:',
        topic,
        'to',
        initial ? true : !isSubscribed,
      );
      console.log('* New subscriptions state:', newSubscriptions);
    } catch (error) {
      console.error('Failed to toggle subscription:', error);
    }
  };

  // Handler function for setting all the alerts notifications to a different state, switching all the alerts subscriptions to topics to the opposite state.

  const handleToggleAllNotifications = async () => {
    try {
      const anyActive = Object.values(subscriptions).some(value => value);
      const newStatus = !anyActive; // If any switch is active, we turn everything off, otherwise turn everything on
      console.log('* Toggling all notifications to:', newStatus);
      const newSubscriptions = {...subscriptions};
      for (const [topic, hasSubscription] of Object.entries(
        userSubscriptions,
      )) {
        if (hasSubscription) {
          console.log(`* Toggling ${topic} to ${newStatus}`);
          if (newStatus) {
            console.log(`* Subscribing to ${topic}`);
            await messaging().subscribeToTopic(topic);
          } else {
            console.log(`* Unsubscribing from ${topic}`);
            await messaging().unsubscribeFromTopic(topic);
          }
          newSubscriptions[topic] = newStatus;
          await AsyncStorage.setItem(
            `@subscription_${topic}`,
            newStatus.toString(),
          );
        }
      }
      setSubscriptions(newSubscriptions);
      console.log(
        '* New subscriptions state after toggling all:',
        newSubscriptions,
      );
    } catch (error) {
      console.error('Failed to toggle all subscriptions:', error);
    }
  };

  // Handler function to toggle the state of the analysis notifications, switching the stored state to true or false, and subscribing or unsubscribing the user from the analysis topic.

  const handleToggleAnalysisNotifications = async (topic, initial = false) => {
    try {
      const isSubscribed = analysisNotifications[topic];
      if (isSubscribed && !initial) {
        console.log('* Unsubscribing from:', `${topic}_analysis`);
        await messaging().unsubscribeFromTopic(`${topic}_analysis`);
      } else {
        console.log('* Subscribing to:', `${topic}_analysis`);
        await messaging().subscribeToTopic(`${topic}_analysis`);
      }
      const newAnalysisNotifications = {
        ...analysisNotifications,
        [topic]: initial ? true : !isSubscribed,
      };
      setAnalysisNotifications(newAnalysisNotifications);
      await AsyncStorage.setItem(
        `@subscription_analysis_${topic}`,
        (initial ? true : !isSubscribed).toString(),
      );
    } catch (error) {
      console.error('Failed to toggle analysis notifications:', error);
    }
  };

  // Handler function for setting all the analysis notifications to a different state, switching all the subscriptions to topics to the opposite state.

  const handleToggleAllAnalysisNotifications = async () => {
    try {
      const anyActive = Object.values(analysisNotifications).some(
        value => value,
      );
      const newStatus = !anyActive; // If any switch is active, we turn everything off, otherwise turn everything on
      const newAnalysisNotifications = {...analysisNotifications};
      for (const [topic, hasSubscription] of Object.entries(
        userSubscriptions,
      )) {
        if (hasSubscription) {
          if (newStatus) {
            await messaging().subscribeToTopic(topic);
          } else {
            await messaging().unsubscribeFromTopic(topic);
          }
          newAnalysisNotifications[topic] = newStatus;
          await AsyncStorage.setItem(
            `@subscription_analysis_${topic}`,
            newStatus.toString(),
          );
        }
      }
      setAnalysisNotifications(newAnalysisNotifications);
      console.log(
        '* New analysis notifications state after toggling all:',
        newAnalysisNotifications,
      );
    } catch (error) {
      console.error('Failed to toggle all analysis notifications:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButtonContainer}>
        <BackButton />
      </View>
      <Text style={styles.title}>Notifications</Text>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.row}>
          <Text style={[styles.subtitle, {marginRight: 0}]}>Analysis</Text>
          <Text style={styles.subtitle}>Alerts</Text>
        </View>
        <View style={styles.allNotificationsItem}>
          <Text style={styles.allNotificationsItemName}>All Notifications</Text>
          <View style={[styles.rightContent, {right: 26}]}>
            <View
              style={[
                styles.allNotificationsSwitchContainer,
                {marginRight: 20},
              ]}>
              <Switch
                key={'analysis_toggle_all'}
                style={styles.switch}
                trackColor={{true: '#52DD8D', false: '#D9D9D9'}}
                ios_backgroundColor={theme.notificationsSwitchColor}
                thumbColor={'#F6F7FB'}
                value={Object.values(analysisNotifications).some(Boolean)}
                onValueChange={handleToggleAllAnalysisNotifications}
                disabled={
                  !hasFoundersSubscription ||
                  Object.values(userSubscriptions).every(val => !val)
                }
              />
            </View>
            <View style={[styles.allNotificationsSwitchContainer]}>
              <Switch
                key={'alerts_toggle_all'}
                style={styles.switch}
                trackColor={{true: '#52DD8D', false: '#D9D9D9'}}
                ios_backgroundColor={theme.notificationsSwitchColor}
                thumbColor={'#F6F7FB'}
                value={Object.values(subscriptions).some(Boolean)}
                onValueChange={handleToggleAllNotifications}
                disabled={
                  !hasFoundersSubscription ||
                  Object.values(userSubscriptions).every(val => !val)
                }
              />
            </View>
          </View>
        </View>
        <ScrollView
          style={styles.itemsContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          {(options || route.params.options).map(item => (
            <React.Fragment key={item.identifier}>
              <NotificationItem
                item={item}
                styles={styles}
                isActive={subscriptions[item.identifier]}
                isAnalysisActive={analysisNotifications[item.identifier]}
                theme={theme}
                isDarkMode={isDarkMode}
                hasImage={true}
                onToggle={() => handleToggleSubscription(item.identifier)}
                onAnalysisToggle={() =>
                  handleToggleAnalysisNotifications(item.identifier)
                }
                hasSubscription={
                  hasFoundersSubscription ||
                  !!userSubscriptions[item.identifier]
                }
              />
              <View style={styles.horizontalLine} />
            </React.Fragment>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsPanel;
