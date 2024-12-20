import React, {useContext, useEffect, useMemo, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  UIManager,
  View,
} from 'react-native';
import BackButton from '../../BackButton/BackButton';
import {AppThemeContext} from '../../../context/themeContext';
import useNewNotificationsStyles from './NewNotificationsStyles';
import {NOTIFICATIONS_MOCK} from '../../../assets/static_data/notificationsMock';
import {useDispatch, useSelector} from 'react-redux';
import {
  loadSubscriptions,
  selectNotifications,
  toggleAllSubscriptions,
  toggleSubscription,
} from '../../../actions/notificationActions';
import NotificationItem from './NotificationItem/NotificationItem.js';

// Configure the animations for the layout
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const INITIAL_NOTIFICATION_OPTIONS = [
  {
    name: 'Alerts',
    topic_tag: 'alerts',
    isActive: true,
  },
  {
    name: 'S&R Lines',
    topic_tag: 's_and_r',
    isActive: true,
  },
  // {
  //   name: 'News',
  //   topic_tag: 'analysis',
  //   isActive: true,
  // },
  // {
  //   name: 'Narrative Tradings',
  //   topic_tag: 'narratives',
  //   isActive: true,
  // },
];

const INTERVALS = ['1D', '1W'];

// Notifications panel component, it is used to display the notifications settings for the user.

const NewNotificationsPanel = ({route}) => {
  const {theme} = useContext(AppThemeContext);
  const styles = useNewNotificationsStyles();
  const [allToggled, setAllToggled] = useState(false);
  const notificationsSubscriptions = useSelector(selectNotifications);
  const dispatch = useDispatch();

  useEffect(() => {
    // Load the state of the notifications, for the usage in the Notifications panel of the Account section
    dispatch(loadSubscriptions());
  }, [dispatch]);

  useEffect(() => {
    // Load the state of the notifications, for the usage in the Notifications panel of the Account section
    const loadedAllToggled = Object.values(notificationsSubscriptions).every(
      value => value === true,
    );
    setAllToggled(loadedAllToggled);
  }, [notificationsSubscriptions]);

  const handleToggleAll = () => {
    dispatch(toggleAllSubscriptions(!allToggled));
    setAllToggled(!allToggled);
  };

  // Function to handle the activation or deactivation the notifications subscription when the time interval is . It finds the topic to deactivate by matching the category and the interval that changed his state, and then if it is found, it deactivates it, otherwise, it subscribes to the topic by generating it.

  const handleToggleByIntervalsChange = (interval, category) => {
    const notificationsStateKeys = Object.entries(notificationsSubscriptions);
    const topicToDeactivate = notificationsStateKeys.find(
      key =>
        key[0].includes(interval) &&
        key[0].includes(category) &&
        key[1] === true,
    );
    console.log('Topic found to toggle:', topicToDeactivate);
    if (
      topicToDeactivate !== undefined &&
      topicToDeactivate !== null &&
      topicToDeactivate.length > 0
    ) {
      dispatch(toggleSubscription({topic: topicToDeactivate[0]}));
    } else {
      console.log('Created topic: ', `${category}_alerts_${interval}`);
      dispatch(toggleSubscription({topic: `${category}_alerts_${interval}`}));
      return;
    }
  };

  const options = NOTIFICATIONS_MOCK;

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Notifications</Text>
      <ScrollView style={styles.mainContainer}>
        <View
          style={[
            styles.row,
            {
              justifyContent: 'space-between',
              padding: 8,
              paddingHorizontal: 24,
            },
          ]}>
          {/* All Notifications switch */}
          <View style={styles.allNotificationsRow}>
            <Text style={styles.subtitle}>All Notifications</Text>
            <View style={styles.allNotificationsSwitchContainer}>
              <Switch
                key={'toggle_all'}
                style={styles.switch}
                trackColor={{true: '#52DD8D', false: '#D9D9D9'}}
                ios_backgroundColor={theme.notificationsSwitchColor}
                thumbColor={'#F6F7FB'}
                value={allToggled}
                onValueChange={() => handleToggleAll()}
              />
            </View>
          </View>
        </View>
        <ScrollView
          style={styles.itemsContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          {options.map(item => (
            <NotificationItem
              styles={styles}
              item={item}
              key={item.identifier}
              hasImage={true}
              isActive={true}
              notificationsSubscriptions={notificationsSubscriptions}
              timeframes={INTERVALS}
              handleToggleByIntervalsChange={handleToggleByIntervalsChange}
              allToggled={allToggled}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewNotificationsPanel;
