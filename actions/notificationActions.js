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
// export const toggleAllSubscriptions = createAsyncThunk(
//   'user/toggleAllSubscriptions',
//   async (newStatus, thunkApi) => {
//     try {
//       const subscriptions = thunkApi.getState().user.notifications;
//       const topicsToSubscribe = [];
//       const updatedSubscriptions = {...subscriptions};

//       for (const item of NOTIFICATIONS_MOCK) {
//         for (const option of INITIAL_NOTIFICATION_OPTIONS) {
//           let topic = `${item.identifier}_${option.topic_tag}`;
//           if (option.topic_tag === 'alerts') {
//             ['1D', '1W'].forEach(interval => {
//               topic = `${item.identifier}_${option.topic_tag}_${interval}`;
//               topicsToSubscribe.push(topic);
//             });
//           } else {
//             topicsToSubscribe.push(topic);
//           }
//         }
//       }

//       // Execute subscriptions in parallel using Promise.all
//       const subscriptionPromises = topicsToSubscribe.map(async topic => {
//         if (newStatus) {
//           await messaging().subscribeToTopic(topic);
//           console.log('Subscribed to topic:', topic);
//         } else {
//           await messaging().unsubscribeFromTopic(topic);
//           console.log('Unsubscribed from topic:', topic);
//         }
//         updatedSubscriptions[topic] = newStatus;
//       });

//       await Promise.allSettled(subscriptionPromises);

//       // Batch AsyncStorage operations
//       const storagePromises = topicsToSubscribe.map(topic =>
//         AsyncStorage.setItem(`subscription_${topic}`, newStatus.toString()),
//       );
//       await Promise.all(storagePromises);

//       return updatedSubscriptions;
//     } catch (error) {
//       console.error('Failed to toggle all subscriptions:', error);
//       throw error;
//     }
//   },
// );
export const toggleAllSubscriptions = createAsyncThunk(
  'user/toggleAllSubscriptions',
  async (newStatus, thunkApi) => {
    try {
      const subscriptions = thunkApi.getState().user.notifications;
      const updatedSubscriptions = {...subscriptions};

      const subscriptionPromises = [];

      for (const item of NOTIFICATIONS_MOCK) {
        for (const option of INITIAL_NOTIFICATION_OPTIONS) {
          if (option.topic_tag === 'alerts') {
            ['1d', '1w'].forEach(interval => {
              const topic = `${item.identifier}_${option.topic_tag}_${interval}`;
              subscriptionPromises.push(
                handleSubscription(topic, newStatus, updatedSubscriptions),
              );
            });
          } else {
            const topic = `${item.identifier}_${option.topic_tag}`;
            subscriptionPromises.push(
              handleSubscription(topic, newStatus, updatedSubscriptions),
            );
          }
        }
      }

      await Promise.allSettled(subscriptionPromises);

      return updatedSubscriptions;
    } catch (error) {
      console.error('Failed to toggle all subscriptions:', error);
      throw error;
    }
  },
);

// Auxiliar function to handle the subscription status of a topic
const handleSubscription = async (topic, newStatus, updatedSubscriptions) => {
  try {
    if (newStatus) {
      await messaging().subscribeToTopic(topic);
      console.log('Subscribed to topic:', topic);
    } else {
      await messaging().unsubscribeFromTopic(topic);
      console.log('Unsubscribed from topic:', topic);
    }

    // Update the Redux store and AsyncStorage states
    await AsyncStorage.setItem(`subscription_${topic}`, newStatus.toString());
    updatedSubscriptions[topic] = newStatus;
  } catch (error) {
    console.error(`Error handling topic ${topic}:`, error);
  }
};
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

// Load notifications data from the notifications async storage

export const loadNotificationItems = createAsyncThunk(
  'user/loadNotificationItems',
  async (_, {}) => {
    try {
      const storedNotifications = await AsyncStorage.getItem('notifications');
      const currentNotifications = storedNotifications
        ? JSON.parse(storedNotifications)
        : [];
      return currentNotifications;
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  },
);

// Save notifications data to the notifications async storage

export const saveNotificationItems = createAsyncThunk(
  'user/saveNotificationItems',
  async (notifications, {}) => {
    try {
      // Remove duplicates
      const filteredNotifications = notifications.filter(
        (item, index, self) =>
          index ===
          self.findIndex(t => t.title === item.title && t.date === item.date),
      );
      await AsyncStorage.setItem(
        'notifications',
        JSON.stringify(filteredNotifications),
      );
    } catch (error) {
      console.error('Failed to save notifications:', error);
    }
  },
);

// Function to filter the old (more than 15 days) notifications

const filterOldNotifications = items => {
  const fifteenDaysAgo = new Date();
  fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

  return items.filter(notification => {
    const [day, month, year] = notification.date.split('/').map(Number);
    const notificationDate = new Date(year, month - 1, day);
    return notificationDate >= fifteenDaysAgo;
  });
};

// Function to handle the sorting of the notifications items by the date. It groups the items by date and returns them sorted in descending order.

const groupAndSortByDate = items => {
  const groupedByDate = {};

  items.forEach(item => {
    if (!groupedByDate[item.date]) {
      groupedByDate[item.date] = [];
    }
    groupedByDate[item.date].push(item);
  });
  const groupedArray = Object.keys(groupedByDate).map(date => ({
    date,
    items: groupedByDate[date].reverse(),
  }));

  return groupedArray.sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split('/').map(Number);
    const [dayB, monthB, yearB] = b.date.split('/').map(Number);
    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);
    return dateB - dateA;
  });
};

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

export const selectNotificationsItemsLoading = state =>
  state.user.notificationItems.loading;

export const selectFilteredNotificationsByType = state => {
  const notifications = state.user.notificationItems.data;
  if (!notifications) {
    return [];
  } else {
    const filteredOldItems = filterOldNotifications(notifications);
    return groupAndSortByDate(filteredOldItems);
  }
};
