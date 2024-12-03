import {createAsyncThunk} from '@reduxjs/toolkit';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NOTIFICATIONS_MOCK} from '../assets/static_data/notificationsMock';
import {INITIAL_NOTIFICATION_OPTIONS} from '../components/Account/NotificationsPanel/NewNotificationsPanel';

// Action for toggling an individual subscription
export const toggleSubscription = createAsyncThunk(
  'user/toggleSubscription',
  async ({topic}, thunkApi) => {
    try {
      const subscriptions = thunkApi.getState().user.notifications;
      const isSubscribed =
        subscriptions[topic] && subscriptions[topic] !== undefined
          ? subscriptions[topic]
          : false;
      const newStatus = !isSubscribed;

      if (isSubscribed) {
        await messaging().unsubscribeFromTopic(topic);
        console.log('Successfully unsubscribed from topic: ', topic);
      } else {
        await messaging().subscribeToTopic(topic);
        console.log('Successfully subscribed to topic: ', topic);
      }

      await AsyncStorage.setItem(`subscription_${topic}`, newStatus.toString());
      return {topic, newStatus};
    } catch (error) {
      console.error('Failed to toggle subscription:', error);
    }
  },
);

// Action for toggling all the notifications for a specific option
export const toggleAllSubscriptions = createAsyncThunk(
  'user/toggleAllSubscriptions',
  async (newStatus, thunkApi) => {
    try {
      const subscriptions = thunkApi.getState().user.notifications;
      const topicsToSubscribe = [];
      const updatedSubscriptions = {...subscriptions};
      for (const item of NOTIFICATIONS_MOCK) {
        for (const option of INITIAL_NOTIFICATION_OPTIONS) {
          let topic = `${item.identifier}_${option.topic_tag}`;
          if (option.topic_tag === 'alerts') {
            ['1H', '4H'].forEach(interval => {
              topic = `${item.identifier}_${option.topic_tag}_${interval}`;
              topicsToSubscribe.push(topic);
            });
          } else {
            topicsToSubscribe.push(topic);
          }
        }
      }
      // console.log('Topics to subscribe:', topicsToSubscribe);
      for (const topic of topicsToSubscribe) {
        if (newStatus) {
          await messaging().subscribeToTopic(topic);
          console.log('Subscribed to topic:', topic);
        } else {
          await messaging().unsubscribeFromTopic(topic);
          console.log('Unsubscribed from topic:', topic);
        }
        updatedSubscriptions[topic] = newStatus;
        await AsyncStorage.setItem(
          `subscription_${topic}`,
          newStatus.toString(),
        );
      }
      // console.log('Updated subscriptions: ', updatedSubscriptions);
      return updatedSubscriptions;
    } catch (error) {
      console.error('Failed to toggle all subscriptions:', error);
    }
  },
);

// Action for loading the state of the notifications subscriptions from AsyncStorage and save it in the userSlice of the Redux store

export const loadSubscriptions = createAsyncThunk(
  'user/loadSubscriptions',
  async (_, {}) => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const subscriptionKeys = keys.filter(key =>
        key.startsWith('subscription_'),
      );
      const subscriptions = {};
      // console.log('Subscription keys:', subscriptionKeys);
      for (const key of subscriptionKeys) {
        const topic = key.replace('subscription_', '');
        const value = await AsyncStorage.getItem(key);
        // console.log('Retrieving subscription:', topic, ' with value:', value);
        subscriptions[topic] = value === 'true';
      }

      return subscriptions;
    } catch (error) {
      console.error('Failed to load subscriptions:', error);
    }
  },
);

export const selectNotifications = state => state.user.notifications;

export const selectNotificationStatusByTopic = (state, topic) => {
  if (topic.includes('alerts')) {
    const alertsStatusActive = Object.entries(state.user.notifications).find(
      item => item[0].includes(topic) && item[1] === true,
    );
    return alertsStatusActive?.length > 1 ? true : false;
  } else {
    return state.user.notifications[topic] || false;
  }
};
