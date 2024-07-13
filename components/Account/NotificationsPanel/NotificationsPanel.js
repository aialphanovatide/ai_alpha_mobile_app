import React, { useContext, useEffect, useState } from 'react';
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
import { AppThemeContext } from '../../../context/themeContext';
import { RevenueCatContext } from '../../../context/RevenueCatContext';
import messaging from '@react-native-firebase/messaging';

const NotificationItem = ({
  item,
  styles,
  isActive,
  theme,
  isDarkMode,
  hasImage,
  onToggle,
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
      <View style={styles.switchContainer}>
        <Switch
          style={styles.switch}
          trackColor={{ true: '#52DD8D', false: '#D9D9D9' }}
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

const NotificationsPanel = ({ route, options = null }) => {
  const { isDarkMode, theme } = useContext(AppThemeContext);
  const styles = useNotificationsStyles();
  const { packages, userInfo } = useContext(RevenueCatContext);
  const [subscriptions, setSubscriptions] = useState({});
  const [userSubscriptions, setUserSubscriptions] = useState({});
  const [hasFoundersSubscription, setHasFoundersSubscription] = useState(false);

  useEffect(() => {
    const loadSubscriptionStates = async () => {
      try {
        const initialSubscriptions = {};
        for (const option of options || route.params.options) {
          const storedStatus = await AsyncStorage.getItem(`@subscription_${option.identifier}`);
          initialSubscriptions[option.identifier] = storedStatus === 'true';
        }
        console.log("* Loaded initial subscriptions:", initialSubscriptions);
        setSubscriptions(initialSubscriptions);
      } catch (error) {
        console.error('Failed to load subscription states:', error);
      }
    };

    loadSubscriptionStates();
  }, [options]);

  useEffect(() => {
    const updateUserSubscriptions = async () => {
      try {
        console.log("userInfo:", userInfo);
        console.log("Packages:", packages);
        
        // Verify the structure of packages array
        if (packages && Array.isArray(packages)) {
          packages.forEach(pkg => {
            console.log("Package:", pkg);
          });
        } else {
          console.log("Packages array is not valid");
        }

        const purchasedPackages = packages.filter(item =>
          userInfo?.entitlements.includes(item.product.identifier) || 
          (userInfo?.entitlements.includes('rc_promo_Founders_14999_m1_yearly') && item.product.identifier === 'founders_14999_m1')
        );
        const productIdentifiers = purchasedPackages.map(item => item.product.identifier);
        console.log("Purchased product identifiers:", productIdentifiers);

        const userSubscriptionsStatus = { ...userSubscriptions };

        const newSubscriptions = { ...subscriptions };

        for (const id of productIdentifiers) {
          const storedStatus = await AsyncStorage.getItem(`@subscription_${id}`);
          if (storedStatus === null) {
            await AsyncStorage.setItem(`@subscription_${id}`, 'true');
            newSubscriptions[id] = true;
            await messaging().subscribeToTopic(id);
          } else {
            newSubscriptions[id] = storedStatus === 'true';
          }
          userSubscriptionsStatus[id] = true;
        }

        const expiredSubscriptions = Object.keys(subscriptions).filter(id => !productIdentifiers.includes(id));
        for (const id of expiredSubscriptions) {
          userSubscriptionsStatus[id] = false;
          await AsyncStorage.setItem(`@subscription_${id}`, 'null');
          newSubscriptions[id] = false;
        }

        setUserSubscriptions(userSubscriptionsStatus);
        setSubscriptions(newSubscriptions);
        setHasFoundersSubscription(userInfo?.entitlements.includes('rc_promo_Founders_14999_m1_yearly'));
        console.log("* Updated user subscriptions:", userSubscriptionsStatus);
        console.log("* Current subscriptions state:", newSubscriptions);
      } catch (error) {
        console.error('Failed to update user subscriptions:', error);
      }
    };

    updateUserSubscriptions();
  }, [packages, userInfo]);

  const handleToggleSubscription = async (topic, initial = false) => {
    try {
      const isSubscribed = subscriptions[topic];
      if (isSubscribed && !initial) {
        console.log("* Unsubscribing from:", topic);
        await messaging().unsubscribeFromTopic(topic);
      } else {
        console.log("* Subscribing to:", topic);
        await messaging().subscribeToTopic(topic);
      }
      const newSubscriptions = { ...subscriptions, [topic]: initial ? true : !isSubscribed };
      setSubscriptions(newSubscriptions);
      await AsyncStorage.setItem(`@subscription_${topic}`, (initial ? true : !isSubscribed).toString());
      console.log("* Toggled subscription for:", topic, "to", initial ? true : !isSubscribed);
      console.log("* New subscriptions state:", newSubscriptions);
    } catch (error) {
      console.error('Failed to toggle subscription:', error);
    }
  };

  const handleToggleAllNotifications = async () => {
    try {
      const anyActive = Object.values(subscriptions).some(value => value);
      const newStatus = !anyActive; // If any switch is active, we turn everything off, otherwise turn everything on
      console.log("* Toggling all notifications to:", newStatus);
      const newSubscriptions = { ...subscriptions };
      for (const [topic, hasSubscription] of Object.entries(userSubscriptions)) {
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
          await AsyncStorage.setItem(`@subscription_${topic}`, newStatus.toString());
        }
      }
      setSubscriptions(newSubscriptions);

      console.log("* New subscriptions state after toggling all:", newSubscriptions);
    } catch (error) {
      console.error('Failed to toggle all subscriptions:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <ScrollView style={styles.mainContainer}>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.row}>
          <Text style={styles.subtitle}>Alerts</Text>
        </View>
        <View style={styles.allNotificationsItem}>
          <Text style={styles.allNotificationsItemName}>All Notifications</Text>
          <View style={styles.rightContent}>
            <View style={styles.allNotificationsSwitchContainer}>
              <Switch
                style={styles.switch}
                trackColor={{ true: '#52DD8D', false: '#D9D9D9' }}
                ios_backgroundColor={theme.notificationsSwitchColor}
                thumbColor={'#F6F7FB'}
                value={Object.values(subscriptions).some(Boolean)}
                onValueChange={handleToggleAllNotifications}
                disabled={!hasFoundersSubscription && Object.values(userSubscriptions).every(val => !val)}
              />
            </View>
          </View>
        </View>
        <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator={false} bounces={false}>
          {(options || route.params.options).map(item => (
            <React.Fragment key={item.identifier}>
              <NotificationItem
                item={item}
                styles={styles}
                isActive={subscriptions[item.identifier]}
                theme={theme}
                isDarkMode={isDarkMode}
                hasImage={true}
                onToggle={() => handleToggleSubscription(item.identifier)}
                hasSubscription={hasFoundersSubscription || !!userSubscriptions[item.identifier]}
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
